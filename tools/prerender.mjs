#!/usr/bin/env node
// Pre-render every public route to static HTML.
//
// Vite ships a ~1 KB shell that only fills in after React boots, so crawlers,
// link unfurlers and no-JS readers saw an empty page. This runs after
// `vite build`, renders each route with the same components the client then
// hydrates, and writes dist/<route>/index.html — GitHub Pages serves real
// content for every URL. It also emits the sitemap, per-page titles/canonical
// tags, static redirect pages for legacy paths, and a branded 404.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')

const DEFAULT_TITLE = 'BACR - Bodija Advanced Centre for Rehabilitation'

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Every marker below must appear exactly where the template puts it. Failing
// loudly beats silently shipping an empty #root again.
function replaceOnce(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: template marker not found: ${pattern}`)
  return html.replace(pattern, replacement)
}

const vite = await createServer({
  root: ROOT,
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'warn',
})

try {
  const [{ render }, { PAGE_ROUTES, REDIRECTS }, { SITE_BASE_PATH, canonicalUrl }] = await Promise.all([
    vite.ssrLoadModule('/src/ssr.jsx'),
    vite.ssrLoadModule('/src/lib/pages.js'),
    vite.ssrLoadModule('/src/lib/site.config.js'),
  ])

  let template = await readFile(path.join(DIST, 'index.html'), 'utf8')

  // The fonts are self-hosted and hashed by Vite, so the build is the only
  // place that knows their final names. Preload the display/body faces the
  // first paint needs; the footer logo stays lazily discovered.
  const assetFiles = await readdir(path.join(DIST, 'assets'))
  const fontPreloads = ['plus-jakarta-latin-', 'inter-latin-']
    .map((prefix) => assetFiles.find((file) => file.startsWith(prefix) && file.endsWith('.woff2')))
    .filter(Boolean)
    .map(
      (file) =>
        `    <link rel="preload" as="font" type="font/woff2" href="${SITE_BASE_PATH}/assets/${file}" crossorigin />\n`,
    )
    .join('')
  template = template.replace('</head>', `${fontPreloads}  </head>`)

  // SSR through the Vite dev server resolves image imports to `/src/assets/x`
  // (a URL that only exists while the dev server runs). Rewrite them to the
  // hashed files the client build emitted, using Vite's manifest.
  const manifest = JSON.parse(
    await readFile(path.join(DIST, '.vite/manifest.json'), 'utf8'),
  )
  const rewriteAssets = (html) =>
    html.replace(/src\/assets\/([^"'\s>]+)/g, (match, file) => {
      const entry = manifest[`src/assets/${file}`]
      return entry ? entry.file : match
    })

  function buildPage({ markup, title, canonical, headExtra = '' }) {
    let html = template
    markup = rewriteAssets(markup)
    html = replaceOnce(html, /<title>[^<]*<\/title>/, () => `<title>${esc(title)}</title>`)
    html = replaceOnce(
      html,
      /(<meta property="og:title" content=")[^"]*(")/,
      (_match, open, close) => `${open}${esc(title)}${close}`,
    )
    html = replaceOnce(
      html,
      /(<meta name="twitter:title" content=")[^"]*(")/,
      (_match, open, close) => `${open}${esc(title)}${close}`,
    )
    html = replaceOnce(
      html,
      /<\/head>/,
      () =>
        `${headExtra}    <link rel="canonical" href="${esc(canonical)}" />\n` +
        `    <meta property="og:url" content="${esc(canonical)}" />\n  </head>`,
    )
    html = replaceOnce(html, /<div id="root"><\/div>/, () => `<div id="root">${markup}</div>`)
    return html
  }

  const written = []
  async function write(relativePath, contents) {
    const target = path.join(DIST, relativePath)
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, contents)
    written.push(relativePath)
  }

  // 1. One static file per route.
  for (const { path: routePath } of PAGE_ROUTES) {
    const { html, title } = render(routePath)
    await write(
      routePath === '/' ? 'index.html' : `${routePath.slice(1)}/index.html`,
      buildPage({
        markup: html,
        title: title ?? DEFAULT_TITLE,
        canonical: canonicalUrl(routePath),
      }),
    )
  }

  // 2. Legacy paths: an HTML-level redirect that needs neither JS nor the
  //    server, plus canonical/target tags so crawlers treat it as a move. The
  //    refresh target is base-path-absolute (not origin-absolute) so it lands
  //    right on any host — localhost previews included.
  for (const { path: from, to } of REDIRECTS) {
    const canonical = canonicalUrl(to)
    const { html } = render(from)
    await write(
      `${from.slice(1)}/index.html`,
      buildPage({
        markup: html,
        title: DEFAULT_TITLE,
        canonical,
        headExtra: `<meta http-equiv="refresh" content="0; url=${esc(`${SITE_BASE_PATH}${to}/`)}" />\n    `,
      }),
    )
  }

  // 3. 404: branded and noindexed, but without the app bundle — this page must
  //    stay a 404 rather than hydrate into the home page (a soft 404).
  let notFound = template
  notFound = replaceOnce(
    notFound,
    /<meta charset="UTF-8" \/>/,
    () => `<meta charset="UTF-8" />\n    <meta name="robots" content="noindex" />`,
  )
  notFound = replaceOnce(notFound, /<title>[^<]*<\/title>/, () => `<title>Page not found | ${DEFAULT_TITLE}</title>`)
  notFound = replaceOnce(
    notFound,
    /<div id="root"><\/div>/,
    // Same structure Header and PageHero emit, so the static page keeps the
    // site's rhythm without needing the bundle to hydrate it. Every class is
    // in the current stylesheet.
    () => `<div id="root">
      <div class="app">
        <header class="header">
          <div class="container header-inner">
            <a class="brand" href="${SITE_BASE_PATH}/" aria-label="BACR - home">
              <svg class="brand-mark" viewBox="0 0 320 320" width="40" height="40" aria-hidden="true">
                <path fill="#534cea" d="M82 0L144 0L144 144L0 144L0 82C0 39 39 0 82 0Z" />
                <path fill="#534cea" d="M176 176L320 176L320 238C320 281 281 320 238 320L176 320L176 176Z" />
                <path fill="#00e24b" d="M82 176L144 176L144 238C144 283 107 320 62 320L0 320L0 258C0 213 37 176 82 176Z" />
                <path fill="#00e24b" d="M258 0L320 0L320 62C320 107 283 144 238 144L176 144L176 82C176 37 213 0 258 0Z" />
              </svg>
              <span class="brand-text">
                <strong class="brand-name">Bodija Advanced Centre</strong>
                <span class="brand-sub">for Rehabilitation</span>
              </span>
            </a>
          </div>
        </header>
        <main id="main" class="page">
          <section class="page-hero light">
            <div class="container page-hero-inner">
              <h1>Page not found</h1>
              <p class="lead">The page you are looking for does not exist.</p>
              <div class="hero-actions">
                <a class="btn btn-primary" href="${SITE_BASE_PATH}/">Back to home</a>
                <a class="btn btn-outline" href="${SITE_BASE_PATH}/contact/">Contact BACR</a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>`,
  )
  notFound = notFound
    .replace(/<script\b[^>]*\bsrc="[^"]+"[^>]*><\/script>\n?/g, '')
    .replace(/<link rel="modulepreload"[^>]*>\n?/g, '')
  await write('404.html', notFound)

  // 4. Sitemap — the canonical (slash) forms, legacy redirect excluded.
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    PAGE_ROUTES.map(({ path: routePath }) => `  <url><loc>${esc(canonicalUrl(routePath))}</loc></url>`).join('\n') +
    '\n</urlset>\n'
  await write('sitemap.xml', sitemap)

  // The manifest is build-time only; don't ship it.
  await rm(path.join(DIST, '.vite'), { recursive: true, force: true })

  console.log(`prerender: ${PAGE_ROUTES.length} routes, ${REDIRECTS.length} redirect, 404, sitemap`)
  for (const file of written) console.log(`  dist/${file}`)
} finally {
  await vite.close()
}

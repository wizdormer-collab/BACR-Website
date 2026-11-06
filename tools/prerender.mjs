#!/usr/bin/env node
// Pre-render every public route to static HTML.
//
// Vite ships a ~1 KB shell that only fills in after React boots, so crawlers,
// link unfurlers and no-JS readers saw an empty page. This runs after
// `vite build`, renders each route with the same components the client then
// hydrates, and writes dist/<route>/index.html — GitHub Pages serves real
// content for every URL. It also emits the sitemap, per-page titles/canonical
// tags, static redirect pages for legacy paths, and a branded 404.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
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

  const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

  function buildPage({ markup, title, canonical, headExtra = '' }) {
    let html = template
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
    // Same structure PageHero emits, so the static page keeps the site's
    // opening rhythm without needing the bundle to hydrate it.
    () => `<div id="root">
      <div class="app">
        <main id="main" class="page">
          <section class="page-hero">
            <div class="container">
              <div class="page-hero__inner">
                <h1>Page not found</h1>
                <p class="lead">The page you are looking for does not exist.</p>
                <div class="btn-row">
                  <a class="btn btn--primary" href="${SITE_BASE_PATH}/">Back to home</a>
                </div>
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

  console.log(`prerender: ${PAGE_ROUTES.length} routes, ${REDIRECTS.length} redirect, 404, sitemap`)
  for (const file of written) console.log(`  dist/${file}`)
} finally {
  await vite.close()
}

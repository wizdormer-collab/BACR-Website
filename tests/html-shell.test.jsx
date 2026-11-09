import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import viteConfig from '../vite.config.js'
import { SITE_BASE_PATH, SITE_URL, canonicalUrl } from '../src/lib/site.config.js'
import { PAGE_PATHS } from '../src/lib/pages.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexHtml = readFileSync(path.join(ROOT, 'index.html'), 'utf8')
const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
const prerender = readFileSync(path.join(ROOT, 'tools/prerender.mjs'), 'utf8')

// The shell is the only thing non-JS readers (crawlers, link unfurlers,
// ChatGPT's fetcher) ever see before the prerendered markup arrives, and the
// only thing they see at all on a build that skipped prerendering.
describe('index.html shell', () => {
  it('carries the brand theme colour', () => {
    expect(indexHtml).toContain('<meta name="theme-color" content="#534cea" />')
  })

  it('has the description link previews and search results need', () => {
    expect(indexHtml).toMatch(/<meta\s+name="description"\s+content="[^"]+"/)
    expect(indexHtml).toMatch(/<meta\s+property="og:description"\s+content="[^"]+"/)
  })

  it('forwards legacy #/hash URLs before the bundle boots', () => {
    // Links shared from the first v2 release look like /BACR-Website/#/about.
    expect(indexHtml).toMatch(/location\.hash\.match\(/)
    expect(indexHtml).toMatch(/location\.replace\(/)
  })

  it('exposes an empty #root for the prerender step to fill', () => {
    expect(indexHtml).toContain('<div id="root"></div>')
  })
})

describe('build wiring', () => {
  it('the build script runs the prerender step', () => {
    expect(pkg.scripts.build).toBe('vite build && node tools/prerender.mjs')
  })

  it('router basename and vite base stay in step', () => {
    // ssr.jsx (server render) and main.jsx (client router) would disagree the
    // moment these two drift, breaking hydration on every page.
    expect(viteConfig.base).toBe(`${SITE_BASE_PATH}/`)
  })

  it('builds well-formed canonical URLs for every route', () => {
    // Regressions here used to silently produce ...BACR-Websiteservices/ —
    // wrong canonicals in every prerendered file and the sitemap.
    expect(canonicalUrl('/')).toBe(`${SITE_URL}/`)
    expect(canonicalUrl('/services')).toBe(`${SITE_URL}/services/`)
    for (const routePath of PAGE_PATHS) {
      const url = canonicalUrl(routePath)
      expect(new URL(url).pathname.endsWith('/')).toBe(true)
      expect(new URL(url).pathname.startsWith(`${SITE_BASE_PATH}/`)).toBe(true)
    }
  })
})

describe('build output stays on the current design system', () => {
  it('the static 404 uses classes that still exist in the stylesheet', () => {
    // These three were retired with the old stylesheet; keeping them here made
    // the 404's "Back to home" indigo-on-indigo and effectively invisible.
    expect(prerender).not.toContain('btn--primary')
    expect(prerender).not.toContain('page-hero__inner')
    expect(prerender).not.toContain('btn-row')
    expect(prerender).toContain('hero-actions')
    expect(prerender).toContain('btn-light')
    expect(prerender).toContain('btn-ghost-light')
  })

  it('preloads the hashed self-hosted fonts on every prerendered page', () => {
    expect(prerender).toContain('type="font/woff2"')
    expect(prerender).toContain('plus-jakarta-latin-')
    expect(prerender).toContain('inter-latin-')
  })

  it('imports the optimised WebP logos, not the large PNGs', () => {
    const sources = [
      'src/features/home/Home.jsx',
      'src/features/about/About.jsx',
      'src/components/Footer.jsx',
    ].map((file) => readFileSync(path.join(ROOT, file), 'utf8'))
    for (const source of sources) {
      expect(source).not.toMatch(/bacr-logo(?:-white)?\.png/)
      expect(source).toMatch(/bacr-logo(?:-white)?\.webp/)
    }
  })
})

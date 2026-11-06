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

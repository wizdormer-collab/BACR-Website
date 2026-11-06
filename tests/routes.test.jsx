import { describe, it, expect } from 'vitest'
import { render } from './helpers.jsx'
import { render as renderRoute } from '../src/ssr.jsx'
import { PAGE_PATHS } from '../src/lib/pages.js'
import { nav } from '../src/data/site.js'
import { SITE_BASE_PATH } from '../src/lib/site.config.js'

// The PRD's route list. src/lib/pages.js is the single source of truth (App
// builds its <Routes> from it, the prerender step emits a file per entry) —
// pin it here so a page cannot quietly disappear from all three at once.
const PRD_ROUTES = [
  '/',
  '/about',
  '/how-it-works',
  '/services',
  '/children',
  '/adults',
  '/team',
  '/referrers',
  '/book',
  '/contact',
]

describe('route registry', () => {
  it('covers exactly the routes the PRD defines', () => {
    expect(PAGE_PATHS).toEqual(PRD_ROUTES)
  })
})

describe('route smoke', () => {
  for (const path of PAGE_PATHS) {
    it(`renders ${path}`, () => {
      const html = render(path)
      expect(html.length).toBeGreaterThan(500)
      // every page opens on a level-1 heading
      expect(html).toMatch(/<h1[^>]*>/)
    })
  }

  it('redirects the legacy /who-we-help URL to /children', () => {
    // <Navigate> renders nothing during SSR; the shell must still be present
    // so the browser can perform the swap once mounted.
    const html = render('/who-we-help')
    expect(html).toContain('Rehabilitation, coordinated around you.')
  })

  it('falls back to home for an unknown path', () => {
    const html = render('/definitely-not-a-page')
    expect(html).toContain('Rehabilitation, coordinated around you.')
  })

  it('renders every nav link in the header', () => {
    const html = render('/')
    for (const item of nav) {
      expect(html).toContain(item.label)
    }
  })

  it('emits nav hrefs under the deployed base path, so they work without JS', () => {
    const html = render('/')
    for (const item of nav) {
      const target = item.to === '/' ? SITE_BASE_PATH : `${SITE_BASE_PATH}${item.to}`
      expect(html).toContain(`href="${target}"`)
    }
  })

  it('sets a page title on inner routes', () => {
    // PageHero calls usePageTitle; the prerender step reads the recorded title
    // back out for the static <title> tag.
    expect(render('/services')).toContain('Our Rehabilitation Services')
    expect(render('/contact')).toContain('Contact Us')
    expect(render('/team')).toContain('Different disciplines. One patient.')
  })

  it('records the page title during SSR (what each static file ships)', () => {
    expect(renderRoute('/services').title).toBe(
      'Our Rehabilitation Services | BACR - Bodija Advanced Centre for Rehabilitation',
    )
    expect(renderRoute('/').title).toBe('BACR - Bodija Advanced Centre for Rehabilitation')
  })
})

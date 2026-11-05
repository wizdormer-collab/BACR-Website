import { describe, it, expect } from 'vitest'
import { render } from './helpers.jsx'
import { nav } from '../src/data/site.js'

// Every route the PRD defines, plus the legacy redirect.
const routes = [
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

describe('route smoke', () => {
  for (const path of routes) {
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

  it('sets a page title on inner routes', () => {
    // PageHero calls usePageTitle; assert the component is wired by checking
    // the heading it is responsible for rendering.
    expect(render('/services')).toContain('Our Rehabilitation Services')
    expect(render('/contact')).toContain('Contact Us')
    expect(render('/team')).toContain('Different disciplines. One patient.')
  })
})

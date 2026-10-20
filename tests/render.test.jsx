import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App.jsx'

const routes = [
  { path: '/', text: 'Rehabilitation, coordinated around you.' },
  { path: '/about', text: ['Advancing rehabilitation through coordinated care.', 'Care that connects.'] },
  { path: '/how-it-works', text: 'We guide you through the process.' },
  { path: '/services', text: ['Our Rehabilitation Services', 'physical-mobility'] },
  { path: '/children', text: 'Helping children develop, participate and thrive.' },
  { path: '/adults', text: 'Supporting recovery, independence and participation.' },
  { path: '/team', text: 'Different disciplines. One patient.' },
  { path: '/referrers', text: 'A rehabilitation partner you can trust.' },
  { path: '/book', text: 'Book an Assessment' },
  { path: '/contact', text: 'Visit Us in Bodija, Ibadan' },
]

describe('page rendering', () => {
  for (const route of routes) {
    it(`renders ${route.path}`, () => {
      const html = renderToString(
        <MemoryRouter initialEntries={[route.path]}>
          <App />
        </MemoryRouter>
      )
      const texts = Array.isArray(route.text) ? route.text : [route.text]
      for (const text of texts) {
        expect(html).toContain(text)
      }
    })
  }

  it('keeps the legacy /who-we-help URL alive for a client-side redirect', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/who-we-help']}>
        <App />
      </MemoryRouter>
    )
    // the shell renders; <Navigate> swaps in /children once mounted in the browser
    expect(html).toContain('Rehabilitation, coordinated around you.')
    expect(html).not.toContain('Care for Every Journey. Support at Every Stage.')
  })

  it('renders every nav link in the header', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    for (const label of [
      'Home',
      'About BACR',
      'How It Works',
      'Rehabilitation',
      'Children',
      'Adults',
      'Our Team',
      'Referrers',
      'Book an Assessment',
      'Contact',
    ]) {
      expect(html).toContain(label)
    }
  })

  it('hides placeholder contact details until real ones are configured', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/book']}>
        <App />
      </MemoryRouter>
    )
    expect(html).not.toContain('XXX')
    expect(html).not.toContain('hello@example.com')
    expect(html).not.toContain('referrals@example.com')
    expect(html).toContain('coming soon')
    expect(html).toContain('Dev: set real details')
  })

  it('renders the homepage hero and process timeline', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(html).toContain('Multidisciplinary Team')
    expect(html).toContain('Measure')
    expect(html).toContain('timeline-5')
    expect(html).toContain('One patient. One coordinated journey.')
  })

  it('renders hero cards as expandable buttons with hidden detail copy', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(html).toMatch(/<button[^>]*type="button"[^>]*aria-expanded="false"/)
    expect((html.match(/aria-controls="fc-detail-\d"/g) || []).length).toBe(4)
    expect(html).toContain('current clinical research')
    expect(html).not.toContain('is-active')
    expect((html.match(/<button/g) || []).length).toBeGreaterThanOrEqual(4)
  })

  it('keeps the BHH ecosystem mention alive', () => {
    const home = renderToString(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(home).toContain('BHH Ecosystem')

    const about = renderToString(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    )
    expect(about).toContain('Part of the BHH Ecosystem')
  })

  it('drops the retired Who We Help content from the homepage', () => {
    const home = renderToString(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(home).not.toContain('Why Choose BACR')
    expect(home).not.toContain('Care for Every Journey. Support at Every Stage.')
  })

  it('renders the FAQ on the contact page', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    )
    expect(html).toContain('Do I need a referral to come to BACR?')
    expect(html).toContain('faq-item')
  })

  it('does not render dead footer links', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(html).not.toContain('Instagram')
    expect(html).not.toContain('Privacy Policy')
    expect(html).toContain('Quick Links')
  })
})

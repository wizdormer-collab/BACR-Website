import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App.jsx'

const routes = [
  { path: '/', text: 'Restoring Function. Rebuilding Lives.' },
  { path: '/about', text: 'More Than Recovery. A Return to Life.' },
  { path: '/services', text: 'Specialist Therapy. Measurable Progress.' },
  { path: '/who-we-help', text: 'Care for Every Journey. Support at Every Stage.' },
  { path: '/team', text: 'Specialists Who Care. Professionals You Can Trust.' },
  { path: '/book', text: 'Your Recovery Starts With One Step.' },
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
      expect(html).toContain(route.text)
    })
  }

  it('renders every nav link in the header', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    for (const label of ['Home', 'About BACR', 'Our Services', 'Who We Help', 'Our Team', 'Book Appointment', 'Contact']) {
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

  it('renders the homepage hero and trust strip', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(html).toContain('Specialist-Led Care')
    expect(html).toContain('4 Core Disciplines')
    expect(html).toContain('tl-num')
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

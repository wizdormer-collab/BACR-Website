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

  it('shows placeholders until real contact details are configured', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/book']}>
        <App />
      </MemoryRouter>
    )
    expect(html).toContain('+234 XXX XXX XXXX')
    expect(html).toContain('number not set')
  })
})

import { describe, it, expect } from 'vitest'
import { render } from './helpers.jsx'

const allPages = ['/', '/about', '/how-it-works', '/services', '/children', '/adults', '/team', '/referrers', '/book', '/contact']

describe('PRD fidelity — content that must be present', () => {
  it('opens the home page on the PRD headline', () => {
    const home = render('/')
    expect(home).toContain('Rehabilitation, coordinated around you.')
    expect(home).toContain("You don't have to know which specialist you need.")
  })

  it('lists the five PRD rehabilitation services', () => {
    const html = render('/services')
    for (const title of [
      'Physical & Mobility Rehabilitation',
      'Occupational & Functional Rehabilitation',
      'Communication & Hearing Rehabilitation',
      'Developmental & Behavioural Rehabilitation',
      'Psychological Support',
    ]) {
      expect(html).toContain(title)
    }
  })

  it('uses PRD-grounded labels in the hero trust strip', () => {
    const home = render('/')
    for (const label of [
      'Multidisciplinary Care',
      'Coordinated Rehabilitation',
      'Measuring Progress',
    ]) {
      expect(home).toContain(label)
    }
    // These were paraphrases, not PRD wording.
    for (const paraphrase of [
      'Multidisciplinary Team',
      'Coordinated Care',
      'Measurable Progress',
    ]) {
      expect(home).not.toContain(paraphrase)
    }
  })

  it('renders the FAQ on the contact page', () => {
    const html = render('/contact')
    expect(html).toContain('Frequently Asked Questions')
    expect(html).toContain('Do I need a referral to come to BACR?')
    expect(html).toContain('faq__item')
  })

  it('puts the About link directly under the home pull quote', () => {
    const home = render('/')
    const about = home.slice(home.indexOf('id="about"'))
    const quote = about.indexOf('One patient. One coordinated journey.')
    const link = about.indexOf('Learn more about BACR')
    expect(quote).toBeGreaterThan(-1)
    expect(link).toBeGreaterThan(quote)
    // Nothing from the right-hand principles column should sit between them.
    expect(about.slice(quote, link)).not.toContain('class="principles"')
    expect(about.slice(quote, link + 'Learn more about BACR'.length)).toMatch(/href="[^"]*\/about"/)
  })

  it('shows the holding state when no contact details are configured', () => {
    const html = render('/contact')
    expect(html).toContain('Contact details coming soon')
    // the address is the one thing that IS known
    expect(html).toContain('Bodija, Ibadan, Oyo State, Nigeria')
  })

  it('renders the booking form with its PRD fields', () => {
    const html = render('/book')
    for (const label of [
      'Full name',
      'Phone number',
      'Email address',
      'Service required',
      'Patient age group',
      'Preferred contact method',
      'What is happening?',
    ]) {
      expect(html).toContain(label)
    }
    expect(html).toContain('Submit Enquiry')
  })

  it('keeps every inner page opener on the light clinical surface', () => {
    for (const path of allPages.slice(1)) {
      expect(render(path)).toMatch(/class="page-hero light"/)
    }
  })

  it('closes most pages on the Start Your Journey band', () => {
    for (const path of ['/about', '/services', '/children', '/adults', '/team', '/referrers']) {
      expect(render(path)).toContain('Start Your Journey')
    }
  })
})

describe('PRD fidelity — content that must NOT be present', () => {
  it('carries no fabricated service-level promise', () => {
    for (const path of allPages) {
      expect(render(path)).not.toContain('48 hours')
    }
  })

  it('carries no BHH ecosystem block (not in the PRD)', () => {
    for (const path of allPages) {
      const html = render(path)
      expect(html).not.toContain('BHH')
      expect(html).not.toContain('Bodija Health Hub')
    }
  })

  it('ships no dead placeholder links', () => {
    for (const path of allPages) {
      const html = render(path)
      expect(html).not.toContain('href="#"')
      expect(html).not.toContain('Instagram')
      expect(html).not.toContain('Privacy Policy')
    }
  })

  it('ships no dev notes or template placeholders', () => {
    for (const path of allPages) {
      const html = render(path)
      expect(html).not.toContain('placeholderNote')
      expect(html).not.toContain('Team profiles to be added')
      expect(html).not.toContain('Dev: set real details')
      expect(html).not.toContain('[Insert')
      expect(html).not.toContain('XXX')
    }
  })

  it('ships no invented contact details', () => {
    for (const path of allPages) {
      const html = render(path)
      expect(html).not.toContain('hello@example.com')
      expect(html).not.toContain('referrals@example.com')
      expect(html).not.toMatch(/tel:\+?\d{7,}/)
      expect(html).not.toMatch(/mailto:[^"]+@/)
    }
  })

  it('hides the WhatsApp button until a number is configured', () => {
    for (const path of allPages) {
      expect(render(path)).not.toContain('wa.me/')
    }
  })

  it('omits the /team "Meet Our Team" CTA — no profiles exist to meet', () => {
    const html = render('/team')
    expect(html).not.toContain('Meet Our Team')
    expect(html).not.toContain('Meet the team')
  })
})

describe('home art direction — Calm Clinic structure', () => {
  it('renders the five services as a numbered editorial list', () => {
    const home = render('/')
    expect(home).toContain('service-list')
    expect(home.match(/class="service-row"/g) || []).toHaveLength(5)
    expect(home.match(/class="service-num"/g) || []).toHaveLength(5)
    // The old side-scroller is gone for good.
    expect(home).not.toContain('service-track')
    expect(home).not.toContain('Show previous service')
  })

  it('keeps the four approach principles in the About column', () => {
    const home = render('/')
    expect(home).toContain('class="principles"')
    expect(home.match(/class="principle"/g) || []).toHaveLength(4)
    for (const title of ['Safety', 'Coordination', 'Individualisation', 'Measurement']) {
      expect(home).toContain(title)
    }
    expect(home).not.toContain('hero-panel')
    expect(home).not.toContain('04 principles')
  })

  it('uses labelled, honestly-attributed placeholder photography', () => {
    const home = render('/')
    for (const photo of [
      'hero-consultation',
      'children-family',
      'adults-session',
      'care-coordinator',
    ]) {
      expect(home).toContain(photo)
    }
    expect(home.match(/class="photo-tag"/g) || []).toHaveLength(3)
    expect(home).toMatch(/alt="A clinician in conversation with a client/)
    expect(home).toContain('Preview photography: Pexels. Not BACR staff or patients.')
  })

  it('renders the process as a five-step numbered grid', () => {
    const home = render('/')
    expect(home).toContain('process-grid')
    expect(home.match(/class="process-step"/g) || []).toHaveLength(5)
    expect(home.match(/class="process-num"/g) || []).toHaveLength(5)
  })

  it('keeps the audience headings and photos as PRD copy', () => {
    const home = render('/')
    expect(home).toContain('Helping children develop, participate and thrive.')
    expect(home).toContain('Supporting recovery, independence and participation.')
    expect(home.match(/class="audience-photo"/g) || []).toHaveLength(2)
  })
})

describe('care coordinator closing block', () => {
  it('puts the clinicians note and pull quote under the coordinator list', () => {
    const home = render('/')
    const list = home.indexOf('Understand your initial concerns')
    const note = home.indexOf('Your clinicians remain responsible')
    const quote = home.indexOf('The clinicians own the clinical care')
    expect(list).toBeGreaterThan(-1)
    expect(note).toBeGreaterThan(list)
    expect(quote).toBeGreaterThan(note)
  })
})

describe('footer brand block', () => {
  it('puts the address directly under the centre name, above the tagline', () => {
    const home = render('/')
    const footer = home.slice(home.indexOf('footer-brand-text'))
    const name = footer.indexOf('Bodija Advanced Centre for Rehabilitation')
    const address = footer.indexOf('Bodija, Ibadan, Oyo State, Nigeria')
    const tagline = footer.indexOf('Rehabilitation, coordinated around you.')
    expect(name).toBeGreaterThan(-1)
    expect(address).toBeGreaterThan(name)
    expect(tagline).toBeGreaterThan(address)
  })
})

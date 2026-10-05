import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import logo from '../../assets/bacr-logo.png'
import mark from '../../assets/bacr-mark.png'
import {
  hero,
  about,
  services,
  audiences,
  howItWorks,
  whyChoose,
  referrals,
} from '../../data/site.js'

const SERVICE_ICONS = {
  physiotherapy: 'activity',
  'speech-therapy': 'chat',
  'occupational-therapy': 'hand',
  'behavioral-therapy': 'brain',
}

const AUDIENCE_ICONS = ['smile', 'user', 'heart', 'waves']

const TRUST = [
  { icon: 'layers', title: '4 Core Disciplines', text: 'Physio, speech, OT & behavioral' },
  { icon: 'users', title: 'Every Age', text: 'Children, adults & the elderly' },
  { icon: 'shield', title: 'Specialist-Led', text: 'Evidence-based, goal-driven care' },
  { icon: 'star', title: 'Part of BHH', text: 'Connected to the wider health hub' },
]

const FLOAT_CARDS = [
  { icon: 'shield', title: 'Specialist-Led Care', text: 'Multidisciplinary team' },
  { icon: 'book', title: 'Evidence-Based', text: 'Research-grounded methods' },
  { icon: 'clipboard', title: 'Personalised Plans', text: 'Built around the person' },
  { icon: 'layers', title: 'BHH Ecosystem', text: 'Coordinated wider care' },
]

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>{hero.headline}</h1>
          <p className="lead">{hero.subtext}</p>
          <div className="hero-actions">
            <Link to={hero.primaryCta.to} className="btn btn-light">
              {hero.primaryCta.label}
            </Link>
            <Link to={hero.secondaryCta.to} className="btn btn-ghost-light">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <img src={mark} alt="" className="hero-mark" />
          <div className="hero-stack">
            {FLOAT_CARDS.map((card) => (
              <div key={card.title} className="float-card">
                <span className="fc-icon">
                  <Icon name={card.icon} size={20} />
                </span>
                <div>
                  <strong>{card.title}</strong>
                  <span>{card.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-grid">
          {TRUST.map((item) => (
            <div key={item.title} className="trust-item">
              <span className="ti-icon">
                <Icon name={item.icon} size={20} />
              </span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPreview() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="split">
          <Reveal>
            <img src={logo} alt="BACR logo" className="about-logo" />
            <div className="section-head">
              <span className="kicker">About BACR</span>
              <h2>{about.headline}</h2>
            </div>
            {about.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="text-muted">
                {text}
              </p>
            ))}
            <blockquote className="quote mb-0">{about.pullQuote}</blockquote>
          </Reveal>

          <Reveal delay={120} className="feature-list">
            {about.principles.map((item) => (
              <div key={item.title} className="feature">
                <span className="feature-dot" />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
            <Link to="/about" className="btn btn-outline" style={{ justifySelf: 'start' }}>
              Learn more about BACR
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="kicker">Our Services</span>
          <h2>{services.headline}</h2>
          <p>{services.intro}</p>
        </Reveal>

        <div className="grid grid-4">
          {services.items.map((service, i) => (
            <Reveal key={service.slug} delay={i * 70} className="card">
              <div className="icon-tile">
                <Icon name={SERVICE_ICONS[service.slug]} size={24} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <Link to="/book" className="card-link">
                Book this service &rarr;
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section className="section section-alt">
      <div className="container">
        <Reveal className="section-head center">
          <span className="kicker">How It Works</span>
          <h2>{howItWorks.headline}</h2>
        </Reveal>

        <Reveal className="timeline">
          {howItWorks.steps.map((step) => (
            <div key={step.title} className="tl-item">
              <span className="tl-num" aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function WhoWeHelpSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="kicker">Who We Help</span>
          <h2>{audiences.headline}</h2>
        </Reveal>

        <div className="split-rows">
          {audiences.items.map((item, i) => (
            <Reveal key={item.title} className="split-row">
              <div className={`sr-art tone-${i + 1}`}>
                <span className="sr-icon">
                  <Icon name={AUDIENCE_ICONS[i]} size={64} strokeWidth={1.4} />
                </span>
                <img src={mark} alt="" className="sr-watermark" />
              </div>
              <div className="sr-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="center" style={{ marginTop: 40 }}>
          <Link to="/who-we-help" className="btn btn-outline">
            See who we help
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhyChooseSection() {
  const half = Math.ceil(whyChoose.points.length / 2)

  return (
    <section className="section band-dark">
      <div className="container">
        <Reveal className="section-head center">
          <span className="kicker">Why Choose BACR</span>
          <h2>{whyChoose.headline}</h2>
        </Reveal>

        <Reveal className="grid grid-2" delay={100}>
          <ul className="list-check">
            {whyChoose.points.slice(0, half).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <ul className="list-check">
            {whyChoose.points.slice(half).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  usePageTitle(null)

  return (
    <>
      <Hero />
      <TrustStrip />
      <AboutPreview />
      <ServicesSection />
      <HowItWorksSection />
      <WhoWeHelpSection />
      <WhyChooseSection />
      <CtaBand
        title="Ready to take the first step?"
        text="Book a consultation for yourself or a loved one — or, as a referring clinician, contact our clinical team."
        note={referrals.acknowledgement}
        primary={{ label: 'Book Appointment', to: '/book' }}
        secondary={{ label: 'Refer a patient', to: '/services' }}
      />
    </>
  )
}

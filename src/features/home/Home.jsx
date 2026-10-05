import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import logo from '../../assets/bacr-logo.png'
import mark from '../../assets/bacr-mark.png'
import {
  brand,
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

const SLIDES = [
  {
    title: hero.headline,
    detail: brand.tagline,
  },
  {
    title: 'Specialist-Led Care',
    detail: 'Physio, speech, occupational and behavioral specialists working as one team.',
  },
  {
    title: 'Evidence-Based',
    detail: 'Methods grounded in current clinical research and measurable outcomes.',
  },
  {
    title: 'Personalised Plans',
    detail: 'Goals set with you, reviewed and adjusted as you progress.',
  },
  {
    title: 'BHH Ecosystem',
    detail: 'Connected referrals across the wider Bodija health hub.',
  },
]

const ROTATE_MS = 5000

function useActive() {
  const [active, setActive] = useState(-1)
  const toggle = (i) => setActive((cur) => (cur === i ? -1 : i))
  const clear = (i) => setActive((cur) => (cur === i ? -1 : cur))
  return {
    active,
    toggle,
    bind: (i) => ({
      className: active === i ? 'is-active' : '',
      onClick: () => toggle(i),
      onMouseEnter: () => setActive(i),
      onMouseLeave: () => clear(i),
      onBlur: () => clear(i),
    }),
  }
}

function HeroRotator() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined
    }
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      ROTATE_MS
    )
    return () => window.clearInterval(id)
  }, [paused])

  return (
    <div
      className={`hero-rotator${paused ? ' is-paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h1 className="hr-titles">
        {SLIDES.map((slide, i) => (
          <span
            key={slide.title}
            className={`hr-title${i === index ? ' is-on' : ''}`}
            aria-hidden={i !== index}
          >
            {slide.title}
          </span>
        ))}
      </h1>

      <div className="hr-details">
        {SLIDES.map((slide, i) => (
          <span
            key={slide.title}
            className={`hr-detail${i === index ? ' is-on' : ''}`}
            aria-hidden={i !== index}
          >
            {slide.detail}
          </span>
        ))}
      </div>

      <div className="hr-dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            className={`hr-dot${i === index ? ' is-on' : ''}`}
            aria-label={`Show ${slide.title}`}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <HeroRotator />
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

        <div className="hero-visual">
          <img src={mark} alt="" aria-hidden="true" className="hero-mark" />
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const { bind } = useActive()

  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-grid">
          {TRUST.map((item, i) => (
            <div
              key={item.title}
              className={`trust-item ${bind(i).className}`.trim()}
              onClick={bind(i).onClick}
              onMouseEnter={bind(i).onMouseEnter}
              onMouseLeave={bind(i).onMouseLeave}
            >
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
  const { bind } = useActive()

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
            <Reveal
              key={service.slug}
              delay={i * 70}
              className={`card ${bind(i).className}`.trim()}
              onClick={bind(i).onClick}
              onMouseEnter={bind(i).onMouseEnter}
              onMouseLeave={bind(i).onMouseLeave}
            >
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
  const { bind } = useActive()

  return (
    <section className="section section-alt">
      <div className="container">
        <Reveal className="section-head center">
          <span className="kicker">How It Works</span>
          <h2>{howItWorks.headline}</h2>
        </Reveal>

        <Reveal className="timeline">
          {howItWorks.steps.map((step, i) => (
            <div
              key={step.title}
              className={`tl-item ${bind(i).className}`.trim()}
              onClick={bind(i).onClick}
              onMouseEnter={bind(i).onMouseEnter}
              onMouseLeave={bind(i).onMouseLeave}
            >
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
  const { bind } = useActive()

  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="kicker">Who We Help</span>
          <h2>{audiences.headline}</h2>
        </Reveal>

        <div className="split-rows">
          {audiences.items.map((item, i) => (
            <Reveal
              key={item.title}
              className={`split-row ${bind(i).className}`.trim()}
              onClick={bind(i).onClick}
              onMouseEnter={bind(i).onMouseEnter}
              onMouseLeave={bind(i).onMouseLeave}
            >
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

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import logo from '../../assets/bacr-logo.png'
import mark from '../../assets/bacr-mark.png'
import {
  hero,
  doneDifferently,
  approach,
  services,
  howItWorks,
  children,
  adults,
  journey,
} from '../../data/site.js'

const AUDIENCE_ICONS = ['smile', 'user']

const TRUST = [
  { icon: 'users', title: 'Multidisciplinary Team', text: 'Many disciplines, one patient' },
  { icon: 'clipboard', title: 'Coordinated Care', text: 'One Clinical Case Coordinator' },
  { icon: 'activity', title: 'Measurable Progress', text: 'Function and participation tracked' },
  { icon: 'star', title: 'Part of BHH', text: 'Connected to the wider health hub' },
]

const FLOAT_CARDS = [
  {
    icon: 'shield',
    title: 'Specialist-Led Care',
    text: 'Multidisciplinary team',
    detail: 'Physiotherapists, speech therapists, occupational therapists and behavioral specialists working as one team.',
  },
  {
    icon: 'book',
    title: 'Evidence-Based',
    text: 'Grounded in research',
    detail: 'Every plan is built on current clinical research and tracked against measurable outcomes.',
  },
  {
    icon: 'clipboard',
    title: 'Personalised Plans',
    text: 'Built around the person',
    detail: 'Goals are set together, reviewed regularly, and adjusted as progress is made.',
  },
  {
    icon: 'layers',
    title: 'BHH Ecosystem',
    text: 'Coordinated wider care',
    detail: 'Connected referrals across the wider Bodija health hub when wider care is needed.',
  },
]

const AUDIENCES = [
  { data: children, icon: AUDIENCE_ICONS[0] },
  { data: adults, icon: AUDIENCE_ICONS[1] },
]

// Touch devices fire hover events on tap and have no hover-out, so they get
// a plain toggle plus an automatic collapse instead.
const HOVER_NONE =
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(hover: none)')
    : null

const COLLAPSE_AFTER_MS = 5000

function useActive() {
  const [active, setActive] = useState(-1)
  const timerRef = useRef(null)

  const stopCollapse = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const scheduleCollapse = () => {
    // Always collapse an opened card on its own; hover-capable devices can
    // still re-open it by hovering.
    timerRef.current = window.setTimeout(() => setActive(-1), COLLAPSE_AFTER_MS)
  }

  useEffect(() => stopCollapse, [])

  const toggle = (i) => {
    stopCollapse()
    if (active === i) {
      setActive(-1)
      return
    }
    setActive(i)
    scheduleCollapse()
  }

  const clear = (i) => {
    stopCollapse()
    setActive((cur) => (cur === i ? -1 : cur))
  }

  return {
    active,
    toggle,
    bind: (i) => ({
      className: active === i ? 'is-active' : '',
      onClick: () => toggle(i),
      onMouseEnter: () => {
        if (HOVER_NONE && HOVER_NONE.matches) return
        stopCollapse()
        setActive(i)
      },
      onMouseLeave: () => {
        if (HOVER_NONE && HOVER_NONE.matches) return
        clear(i)
      },
      onBlur: () => clear(i),
    }),
  }
}

function Hero() {
  const { bind } = useActive()

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>{hero.headline}</h1>
          {hero.paragraphs.map((text) => (
            <p className="lead" key={text.slice(0, 24)}>
              {text}
            </p>
          ))}
          <p className="hero-note">{hero.note}</p>
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
          <div className="hero-stack">
            {FLOAT_CARDS.map((card, i) => {
              const state = bind(i)
              return (
                <button
                  key={card.title}
                  type="button"
                  className={`float-card ${state.className}`.trim()}
                  aria-expanded={state.className.includes('is-active')}
                  aria-controls={`fc-detail-${i}`}
                  onClick={state.onClick}
                  onMouseEnter={state.onMouseEnter}
                  onMouseLeave={state.onMouseLeave}
                  onBlur={state.onBlur}
                >
                  <span className="fc-icon">
                    <Icon name={card.icon} size={20} />
                  </span>
                  <span className="fc-body">
                    <strong>{card.title}</strong>
                    <span className="fc-sub">{card.text}</span>
                    <span className="fc-detail" id={`fc-detail-${i}`}>
                      {card.detail}
                    </span>
                  </span>
                  <span className="fc-hint" aria-hidden="true">
                    +
                  </span>
                </button>
              )
            })}
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

function DoneDifferently() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="split">
          <Reveal>
            <img src={logo} alt="BACR logo" className="about-logo" />
            <div className="section-head">
              <span className="kicker">{doneDifferently.kicker}</span>
              <h2>{doneDifferently.headline}</h2>
            </div>
            {doneDifferently.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="text-muted">
                {text}
              </p>
            ))}
            <blockquote className="quote mb-0">{doneDifferently.pullQuote}</blockquote>
          </Reveal>

          <Reveal delay={120} className="feature-list">
            <div className="section-head">
              <span className="kicker">{approach.kicker}</span>
              <h2>{approach.headline}</h2>
            </div>
            {approach.principles.map((item) => (
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
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const update = () => {
      setCanPrev(track.scrollLeft > 4)
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
    }

    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const slide = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild
    const step = card ? card.getBoundingClientRect().width + 22 : track.clientWidth * 0.8
    track.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="kicker">{services.kicker}</span>
          <h2>{services.headline}</h2>
        </Reveal>

        <div
          className={`carousel ${canPrev ? 'has-prev' : ''} ${canNext ? 'has-next' : ''}`.trim()}
        >
          <div className="carousel-track" ref={trackRef}>
            {services.items.map((service) => (
              <article className="card carousel-card" key={service.slug}>
                <div className="icon-tile">
                  <Icon name={service.icon} size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to={`/services#${service.slug}`} className="card-link">
                  Learn More &rarr;
                </Link>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="carousel-btn prev"
            onClick={() => slide(-1)}
            disabled={!canPrev}
            aria-label="Show previous services"
          >
            <Icon name="chevronLeft" size={20} />
          </button>
          <button
            type="button"
            className="carousel-btn next"
            onClick={() => slide(1)}
            disabled={!canNext}
            aria-label="Show next services"
          >
            <Icon name="chevronRight" size={20} />
          </button>
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
          <span className="kicker">{howItWorks.kicker}</span>
          <h2>{howItWorks.headline}</h2>
          <p>{howItWorks.intro}</p>
        </Reveal>

        <Reveal className="timeline timeline-5">
          {howItWorks.steps.map((step) => (
            <div key={step.title} className="tl-item">
              <span className="tl-num" aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </Reveal>

        <div className="center" style={{ marginTop: 40 }}>
          <Link to="/how-it-works" className="btn btn-outline">
            See how BACR works
          </Link>
        </div>
      </div>
    </section>
  )
}

function AudiencesSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="split-rows">
          {AUDIENCES.map(({ data, icon }, i) => (
            <Reveal key={data.kicker} className="split-row">
              <div className={`sr-art tone-${i + 1}`}>
                <span className="sr-icon">
                  <Icon name={icon} size={64} strokeWidth={1.4} />
                </span>
                <img src={mark} alt="" className="sr-watermark" />
              </div>
              <div className="sr-body">
                <span className="kicker">{data.kicker}</span>
                <h3>{data.headline}</h3>
                <p>{data.paragraphs[0]}</p>
                <Link to={data.exploreCta.to} className="btn btn-outline">
                  {data.exploreCta.label}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
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
      <DoneDifferently />
      <ServicesSection />
      <HowItWorksSection />
      <AudiencesSection />
      <CtaBand
        title={journey.headline}
        text={journey.text}
        primary={journey.primary}
        secondary={journey.secondary}
        tertiary={journey.tertiary}
      />
    </>
  )
}

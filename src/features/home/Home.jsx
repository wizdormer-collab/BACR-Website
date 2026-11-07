import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import logo from '../../assets/bacr-logo.png'
import mark from '../../assets/bacr-mark.svg'
import {
  hero,
  doneDifferently,
  approach,
  services,
  howItWorks,
  children,
  adults,
  careCoordinator,
} from '../../data/site.js'

const TRUST_ICONS = ['users', 'clipboard', 'activity']

// The old hero's floating cards carried invented marketing copy. Same card
// design, filled with the PRD's four approach principles instead.
const FLOAT_ICONS = ['shield', 'layers', 'user', 'activity']

const AUDIENCE_ICONS = ['smile', 'user']

const AUDIENCES = [
  { data: children, icon: AUDIENCE_ICONS[0] },
  { data: adults, icon: AUDIENCE_ICONS[1] },
]

const COLLAPSE_AFTER_MS = 5000

function useActive() {
  const [active, setActive] = useState(-1)

  // Whatever opens a card — tap, click or keyboard — it collapses itself.
  useEffect(() => {
    if (active === -1) return undefined
    const timer = window.setTimeout(() => setActive(-1), COLLAPSE_AFTER_MS)
    return () => window.clearTimeout(timer)
  }, [active])

  return {
    active,
    bind: (i) => ({
      className: active === i ? 'is-active' : '',
      onClick: () => setActive((cur) => (cur === i ? -1 : i)),
      onBlur: () => setActive((cur) => (cur === i ? -1 : cur)),
      // Touch taps also emit compatibility mouse events; ignore those so a tap
      // is a clean open/close toggle.
      onPointerEnter: (event) => {
        if (event.pointerType === 'touch') return
        setActive(i)
      },
      onPointerLeave: (event) => {
        if (event.pointerType === 'touch') return
        setActive((cur) => (cur === i ? -1 : cur))
      },
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
            {approach.principles.map((card, i) => {
              const state = bind(i)
              return (
                <button
                  key={card.title}
                  type="button"
                  className={`float-card ${state.className}`.trim()}
                  aria-expanded={state.className.includes('is-active')}
                  aria-controls={`fc-detail-${i}`}
                  onClick={state.onClick}
                  onPointerEnter={state.onPointerEnter}
                  onPointerLeave={state.onPointerLeave}
                  onBlur={state.onBlur}
                >
                  <span className="fc-icon">
                    <Icon name={FLOAT_ICONS[i]} size={20} />
                  </span>
                  <span className="fc-body">
                    <strong>{card.title}</strong>
                    <span className="fc-detail" id={`fc-detail-${i}`}>
                      {card.text}
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
        <div className="trust-grid trust-grid--3">
          {hero.trust.map((title, i) => (
            <div key={title} className="trust-item">
              <span className="ti-icon">
                <Icon name={TRUST_ICONS[i]} size={20} />
              </span>
              <div>
                <strong>{title}</strong>
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
          <div>
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
          </div>

          <div className="feature-list">
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
            <Link to="/about" className="btn btn-outline">
              Learn more about BACR
            </Link>
          </div>
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
        <div className="section-head center">
          <span className="kicker">{services.kicker}</span>
          <h2>{services.headline}</h2>
        </div>

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
        <div className="section-head center">
          <span className="kicker">{howItWorks.kicker}</span>
          <h2>{howItWorks.headline}</h2>
          <p>{howItWorks.intro}</p>
        </div>

        <div className="timeline timeline-5">
          {howItWorks.steps.map((step) => (
            <div key={step.title} className="tl-item">
              <span className="tl-num" aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

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
            <div key={data.kicker} className="split-row">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CareCoordinator() {
  return (
    <section className="section section-alt">
      <div className="container split">
        <div>
          <div className="section-head">
            <span className="kicker">{careCoordinator.kicker}</span>
            <h2>{careCoordinator.headline}</h2>
            {careCoordinator.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
          <p className="text-muted mb-0">{careCoordinator.note}</p>
        </div>

        <div>
          <span className="kicker">{careCoordinator.listLabel}</span>
          <ul className="list-check">
            {careCoordinator.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <blockquote className="quote">{careCoordinator.quote}</blockquote>
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
      <CareCoordinator />
      <CtaBand />
    </>
  )
}

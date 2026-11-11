import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import { AudienceArt } from '../../components/BrandArt.jsx'
import logo from '../../assets/bacr-logo.webp'
import mark from '../../assets/bacr-mark.svg'
import {
  brand,
  hero,
  doneDifferently,
  approach,
  services,
  supportedConditions,
  howItWorks,
  children,
  adults,
  careCoordinator,
} from '../../data/site.js'

const TRUST_ICONS = ['users', 'clipboard', 'activity']

// The hero's glass panel carries the PRD's four approach principles.
const FLOAT_ICONS = ['shield', 'layers', 'user', 'activity']

const AUDIENCES = [
  { data: children, art: 'children' },
  { data: adults, art: 'adults' },
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
          <p className="hero-eyebrow">{hero.eyebrow}</p>
          <p className="hero-location">
            <Icon name="pin" size={15} />
            {brand.location}
          </p>
          <h1>{hero.headline}</h1>
          {hero.paragraphs.map((text) => (
            <p className="lead" key={text.slice(0, 24)}>
              {text}
            </p>
          ))}
          <p className="hero-note">{hero.note}</p>
          <div className="hero-actions">
            <Link to={hero.primaryCta.to} className="btn btn-primary">
              {hero.primaryCta.label}
            </Link>
            <Link to={hero.secondaryCta.to} className="btn btn-outline">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <img src={mark} alt="" aria-hidden="true" className="hero-mark-light" />
          <div className="hero-panel">
            <div className="hero-panel-head">
              <span className="hero-panel-label">Our approach</span>
            </div>
            <div className="hero-stack">
              {approach.principles.map((card, i) => {
                const state = bind(i)
                return (
                  <button
                    key={card.title}
                    type="button"
                    className={`approach-row ${state.className}`.trim()}
                    aria-expanded={state.className.includes('is-active')}
                    aria-controls={`fc-detail-${i}`}
                    onClick={state.onClick}
                    onPointerEnter={state.onPointerEnter}
                    onPointerLeave={state.onPointerLeave}
                    onBlur={state.onBlur}
                  >
                    <span className="approach-icon">
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
        <div className="split split--top">
          <div>
            <img src={logo} alt="BACR logo" className="about-logo" width={480} height={382} />
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
            <Link to="/about" className="btn btn-outline quote-link">
              Learn more about BACR
            </Link>
          </div>

          <div className="feature-list">
            <div className="section-head">
              <span className="kicker">{approach.kicker}</span>
              <h2 className="approach-title">{approach.headline}</h2>
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
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

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
    <section className="section services-section">
      <div className="container">
        <div className="section-head center">
          <span className="kicker">{services.kicker}</span>
          <h2>{services.headline}</h2>
        </div>

        <div className="service-carousel">
          <div
            className="service-track"
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label="Rehabilitation services"
          >
            {services.items.map((service, i) => (
              <article className="service-card" key={service.slug}>
                <div className="service-card-top">
                  <span className="service-icon">
                    <Icon name={service.icon} size={26} />
                  </span>
                  <span className="service-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to={`/services#${service.slug}`} className="service-link">
                  Explore service
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            ))}
          </div>

          <div className="service-nav-row">
            <button
              type="button"
              className="service-nav"
              onClick={() => slide(-1)}
              disabled={!canPrev}
              aria-label="Show previous service"
            >
              <Icon name="chevronLeft" size={20} />
            </button>
            <button
              type="button"
              className="service-nav"
              onClick={() => slide(1)}
              disabled={!canNext}
              aria-label="Show next service"
            >
              <Icon name="chevronRight" size={20} />
            </button>
          </div>
        </div>

        <div className="conditions">
          <span className="conditions-label">Areas of support</span>
          <ul className="conditions-list">
            {supportedConditions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// The rail fills with the scroll: the reading line at 55% of the viewport
// decides how much of the numbered path is lit, and which step is current.
// Without JS (or with reduced motion) the CSS fallback shows the whole path.
const READING_LINE = 0.55
const RAIL_OFFSET = 30

function useProcessMotion(listRef) {
  useEffect(() => {
    const list = listRef.current
    if (!list) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const steps = Array.from(list.querySelectorAll('.process-step'))
    let frame = 0

    const update = () => {
      frame = 0
      const rect = list.getBoundingClientRect()
      const line = window.innerHeight * READING_LINE
      const max = Math.max(0, rect.height - RAIL_OFFSET * 2)
      const filled = Math.min(max, Math.max(0, line - rect.top - RAIL_OFFSET))
      list.style.setProperty('--process-fill', `${Math.round(filled)}px`)

      for (const step of steps) {
        const box = step.getBoundingClientRect()
        const active = box.top <= line && box.bottom > line
        step.classList.toggle('is-active', active)
        step.classList.toggle('is-done', !active && box.bottom <= line)
      }
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
}

function HowItWorksSection() {
  const listRef = useRef(null)
  useProcessMotion(listRef)

  return (
    <section className="section section-alt process-section">
      <div className="container process">
        <div className="process-intro">
          <span className="kicker">{howItWorks.kicker}</span>
          <h2>{howItWorks.headline}</h2>
          <p>{howItWorks.intro}</p>
          <Link to="/how-it-works" className="btn btn-outline">
            See how BACR works
          </Link>
        </div>

        <ol className="process-list" ref={listRef}>
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="process-step">
              <span className="process-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function AudiencesSection() {
  return (
    <section className="section audiences-section">
      <div className="container">
        <div className="audience-rows">
          {AUDIENCES.map(({ data, art }, i) => (
            <div key={data.kicker} className="audience-row">
              <div className={`audience-art tone-${i + 1}`}>
                <AudienceArt variant={art} />
                <span className="audience-tag">{data.kicker}</span>
              </div>
              <div className="audience-body">
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
      <div className="container split split--top">
        <div>
          <div className="section-head">
            <span className="kicker">{careCoordinator.kicker}</span>
            <h2>{careCoordinator.headline}</h2>
            {careCoordinator.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
          <p className="text-muted mb-0">{careCoordinator.note}</p>
          <blockquote className="quote">{careCoordinator.quote}</blockquote>
        </div>

        <div>
          <span className="kicker">{careCoordinator.listLabel}</span>
          <ul className="list-check">
            {careCoordinator.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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

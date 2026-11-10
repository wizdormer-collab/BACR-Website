import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import { HeroBloom, AudienceArt } from '../../components/BrandArt.jsx'
import logo from '../../assets/bacr-logo.webp'
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
          <HeroBloom />
          <div className="hero-panel">
            <div className="hero-panel-head">
              <span className="hero-panel-label">Our approach</span>
              <span className="hero-panel-count">04 principles</span>
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
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="section services-section">
      <div className="container">
        <div className="section-head center">
          <span className="kicker">{services.kicker}</span>
          <h2>{services.headline}</h2>
        </div>

        <div className="service-grid">
          {services.items.map((service, i) => (
            <article
              className={`service-card ${i > 2 ? 'service-card--wide' : ''}`}
              key={service.slug}
            >
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
      </div>
    </section>
  )
}

function HowItWorksSection() {
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

        <ol className="process-list">
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

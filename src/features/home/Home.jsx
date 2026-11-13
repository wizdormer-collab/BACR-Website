import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
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
  team,
  referrers,
} from '../../data/site.js'
import heroPhoto from '../../assets/home/hero-consultation.webp'
import childrenPhoto from '../../assets/home/children-family.webp'
import adultsPhoto from '../../assets/home/adults-session.webp'
import coordinatorPhoto from '../../assets/home/care-coordinator.webp'

const TRUST_ICONS = ['users', 'clipboard', 'activity']

function Headline() {
  // The green bar sits on "around you" — the promise the headline lands on.
  const [before, after] = hero.headline.split('around you')
  if (after === undefined) return <h1>{hero.headline}</h1>
  return (
    <h1>
      {before}
      <span className="hl">around you</span>
      {after}
    </h1>
  )
}

function Hero() {
  // The PRD note is two sentences; the second gets its own line so it reads
  // as the payoff rather than a wrapped continuation. The break derives from
  // the copy — the data stays the single source of truth.
  const noteBreak = hero.note.indexOf('. ')
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-location">
            <Icon name="pin" size={15} />
            {brand.location}
          </p>
          <Headline />
          {hero.paragraphs.map((text) => (
            <p className="lead" key={text.slice(0, 24)}>
              {text}
            </p>
          ))}
          <p className="hero-note">
            {noteBreak === -1 ? (
              hero.note
            ) : (
              <>
                {hero.note.slice(0, noteBreak + 2)}
                <br />
                {hero.note.slice(noteBreak + 2)}
              </>
            )}
          </p>
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
          <figure className="hero-photo">
            <img
              src={heroPhoto}
              alt="A clinician in conversation with a client in a bright consulting room"
              width="1200"
              height="1500"
              fetchPriority="high"
            />
            <span className="photo-tag">Consultation</span>
          </figure>
          <div className="hero-quote">
            <span>{approach.kicker}</span>
            <strong>{doneDifferently.pullQuote}</strong>
          </div>
          <p className="hero-index">Bodija · Ibadan</p>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="trust" aria-label="What defines our care">
      <div className="container trust-grid">
        {hero.trust.map((title, i) => (
          <div key={title} className="trust-item">
            <span className="trust-icon" aria-hidden="true">
              <Icon name={TRUST_ICONS[i]} size={18} />
            </span>
            <strong>{title}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function DoneDifferently() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-copy">
          <span className="kicker">{doneDifferently.kicker}</span>
          <h2>{doneDifferently.headline}</h2>
          {doneDifferently.paragraphs.map((text) => (
            <p key={text.slice(0, 24)}>{text}</p>
          ))}
          <blockquote className="pull">{doneDifferently.pullQuote}</blockquote>
          <Link to="/about" className="text-link">
            Learn more about BACR <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="about-principles">
          <div className="principles">
            {approach.principles.map((item, i) => (
              <div key={item.title} className="principle">
                <span className="principle-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamBand() {
  return (
    <section className="team-band" id="team">
      <div className="container team-inner">
        <div>
          <span className="kicker">{team.kicker}</span>
          <h2>{team.headline}</h2>
          <p>{team.intro}</p>
        </div>
        <ul className="disciplines">
          {team.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <div className="services-head">
          <div className="section-head">
            <span className="kicker">{services.kicker}</span>
            <h2>{services.headline}</h2>
          </div>
          <a className="text-link" href="#conditions">
            Areas of support <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="service-list">
          {services.items.map((service, i) => (
            <article className="service-row" key={service.slug}>
              <span className="service-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="conditions" id="conditions">
          <span className="conditions-label">Areas of support</span>
          <ul className="conditions-list">
            {supportedConditions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="service-cta">
          <Link to="/contact" className="text-link">
            Not sure which service you need? Talk to our team{' '}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="process-intro">
          <div>
            <span className="kicker">{howItWorks.kicker}</span>
            <h2>{howItWorks.headline}</h2>
          </div>
          <p>{howItWorks.intro}</p>
        </div>

        <ol className="process-grid">
          {howItWorks.steps.map((step, i) => (
            <li className="process-step" key={step.title}>
              <span className="process-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const AUDIENCES = [
  {
    data: children,
    photo: childrenPhoto,
    alt: 'A smiling child held close by a parent',
  },
  {
    data: adults,
    photo: adultsPhoto,
    alt: 'A clinician treating an adult client during a rehabilitation session',
  },
]

function AudiencesSection() {
  return (
    <section className="section section-alt">
      <div className="container">
        {AUDIENCES.map(({ data, photo, alt }, i) => (
          <div key={data.kicker} className={`audience ${i === 1 ? 'flip' : ''}`.trim()}>
            <figure className="audience-photo">
              <img
                src={photo}
                alt={alt}
                width="1200"
                height="1500"
                loading="lazy"
                decoding="async"
              />
              <span className="photo-tag">{data.kicker}</span>
            </figure>
            <div className="audience-body">
              <span className="kicker">{data.kicker}</span>
              <h3>{data.headline}</h3>
              <p>{data.paragraphs[0]}</p>
              <ul className="mini-list">
                {data.items.slice(0, 6).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to={data.exploreCta.to} className="btn btn-outline">
                {data.exploreCta.label}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CareCoordinator() {
  return (
    <section className="section" id="coordinator">
      <div className="container coord-grid">
        <div className="coord-visual">
          <figure className="coord-photo">
            <img
              src={coordinatorPhoto}
              alt="A member of the clinical team holding a tablet"
              width="854"
              height="1067"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="coord-card">
            <span>Clinical Case Coordination</span>
            <strong>The coordinator keeps the journey connected.</strong>
          </div>
        </div>

        <div className="coord-body">
          <span className="kicker">{careCoordinator.kicker}</span>
          <h2>{careCoordinator.headline}</h2>
          {careCoordinator.paragraphs.map((text) => (
            <p key={text.slice(0, 24)}>{text}</p>
          ))}
          <ul className="check">
            {careCoordinator.items.slice(0, 6).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="coord-note">{careCoordinator.note}</p>
          <blockquote className="coord-quote">{careCoordinator.quote}</blockquote>
        </div>
      </div>
    </section>
  )
}

function ReferrersStrip() {
  return (
    <section className="referrers" id="referrers">
      <div className="container referrers-inner">
        <div>
          <span className="kicker">{referrers.kicker}</span>
          <h2>{referrers.headline}</h2>
          <p>{referrers.paragraphs.join(' ')}</p>
        </div>
        {/* The PRD's referral pitch (headline2/text), previously unused on the
            home page: it fills the right column so the band isn't one paragraph
            with a button adrift in whitespace. */}
        <div className="card referrers-aside">
          <h3>{referrers.headline2}</h3>
          <p>{referrers.text}</p>
          <Link to="/referrers" className="btn btn-outline">
            Make a Referral
          </Link>
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
      <TeamBand />
      <ServicesSection />
      <HowItWorksSection />
      <AudiencesSection />
      <CareCoordinator />
      <ReferrersStrip />
      <CtaBand />
    </>
  )
}

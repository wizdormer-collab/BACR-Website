import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import CtaBand from '../../components/CtaBand.jsx'
import logo from '../../assets/bacr-logo.png'
import {
  hero,
  about,
  services,
  audiences,
  howItWorks,
  whyChoose,
  referrals,
} from '../../data/site.js'

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
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
        <div className="trust-bar">
          {hero.trust.map((item) => (
            <span key={item} className="trust-chip">
              {item}
            </span>
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
          <div>
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
          </div>
          <div className="feature-list">
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
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const icons = {
    physiotherapy: '\u{1FA7C}',
    'speech-therapy': '\u{1F5E3}\u{FE0F}',
    'occupational-therapy': '\u{1F91D}',
    'behavioral-therapy': '\u{1F9E0}',
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head center">
          <span className="kicker">Our Services</span>
          <h2>{services.headline}</h2>
          <p>{services.intro}</p>
        </div>
        <div className="grid grid-4">
          {services.items.map((service) => (
            <article key={service.slug} className="card">
              <div className="card-icon">{icons[service.slug] || '\u{2795}'}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <Link to="/book" className="card-link">
                Book this service &rarr;
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
    <section className="section section-alt">
      <div className="container">
        <div className="section-head center">
          <span className="kicker">How It Works</span>
          <h2>{howItWorks.headline}</h2>
        </div>
        <div className="steps grid grid-2">
          {howItWorks.steps.map((step) => (
            <div key={step.title} className="step">
              <span className="step-num" aria-hidden="true" />
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhoWeHelpSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center">
          <span className="kicker">Who We Help</span>
          <h2>{audiences.headline}</h2>
        </div>
        <div className="grid grid-4">
          {audiences.items.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="center" style={{ marginTop: 32 }}>
          <Link to="/who-we-help" className="btn btn-outline">
            See who we help
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhyChooseSection() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head center">
          <span className="kicker">Why Choose BACR</span>
          <h2>{whyChoose.headline}</h2>
        </div>
        <div className="grid grid-2">
          <ul className="list-check">
            {whyChoose.points
              .slice(0, Math.ceil(whyChoose.points.length / 2))
              .map((point) => (
                <li key={point}>{point}</li>
              ))}
          </ul>
          <ul className="list-check">
            {whyChoose.points.slice(Math.ceil(whyChoose.points.length / 2)).map((point) => (
              <li key={point}>{point}</li>
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
      <AboutPreview />
      <ServicesSection />
      <HowItWorksSection />
      <WhoWeHelpSection />
      <WhyChooseSection />
      <CtaBand
        title={referrals.headline}
        text={referrals.text}
        note={referrals.acknowledgement}
        primary={{ label: 'Contact clinical team', to: '/contact' }}
        secondary={{ label: 'Our services', to: '/services' }}
      />
      <CtaBand
        title={hero.headline}
        text="Book your consultation today - for yourself, a loved one, or as a referring clinician."
        primary={{ label: 'Book Appointment', to: '/book' }}
        secondary={{ label: 'Call us', to: '/contact' }}
      />
    </>
  )
}

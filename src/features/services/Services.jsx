import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import { services, referrals } from '../../data/site.js'
import { contactConfig, isPlaceholder } from '../../lib/site.config.js'

const ICONS = {
  physiotherapy: 'activity',
  'speech-therapy': 'chat',
  'occupational-therapy': 'hand',
  'behavioral-therapy': 'brain',
}

export default function Services() {
  usePageTitle('Our Services')

  const referralLinkReady = Boolean(contactConfig.referralFormUrl)
  const emailReady = !isPlaceholder(contactConfig.referralEmail)
  const phoneReady = !isPlaceholder(contactConfig.referralPhone)

  return (
    <>
      <PageHero
        variant="light"
        kicker="Our Services"
        title={services.headline}
        subtitle={services.intro}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {services.items.map((service, i) => (
              <Reveal
                key={service.slug}
                delay={i * 70}
                className="card"
                id={service.slug}
              >
                <div className="icon-tile">
                  <Icon name={ICONS[service.slug]} size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to="/book" className="card-link">
                  Book an appointment &rarr;
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="referrals">
        <div className="container">
          <Reveal className="section-head center">
            <span className="kicker">Clinician Referrals</span>
            <h2>{referrals.headline}</h2>
            <p>{referrals.text}</p>
          </Reveal>

          <div className="grid grid-3">
            <Reveal className="card center">
              <h3>Referral Form</h3>
              {referralLinkReady ? (
                <a className="card-link" href={contactConfig.referralFormUrl}>
                  Download the form &rarr;
                </a>
              ) : (
                <p className="text-muted">
                  Available on request — contact our clinical team and we will send it across.
                </p>
              )}
            </Reveal>

            <Reveal delay={70} className="card center">
              <h3>Email</h3>
              {emailReady ? (
                <p className="text-muted">{contactConfig.referralEmail}</p>
              ) : (
                <Link to="/contact" className="card-link">
                  Contact our team &rarr;
                </Link>
              )}
            </Reveal>

            <Reveal delay={140} className="card center">
              <h3>Phone</h3>
              {phoneReady ? (
                <p className="text-muted">{contactConfig.referralPhone}</p>
              ) : (
                <Link to="/contact" className="card-link">
                  Contact our team &rarr;
                </Link>
              )}
            </Reveal>
          </div>

          <p className="center" style={{ marginTop: 26 }}>
            <span className="pill-note">{referrals.acknowledgement}</span>
          </p>

          {import.meta.env.DEV && (emailReady || phoneReady) ? (
            <p className="center text-muted" style={{ fontSize: '0.875rem' }}>
              Dev note: referral contacts configured in <code>src/lib/site.config.js</code>.
            </p>
          ) : null}
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        text="Tell us about the condition or goal and our team will point you to the right specialist."
        primary={{ label: 'Book Appointment', to: '/book' }}
        secondary={{ label: 'Contact us', to: '/contact' }}
      />
    </>
  )
}

import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import { services, referrals } from '../../data/site.js'
import { contactConfig, isPlaceholder } from '../../lib/site.config.js'

const ICONS = {
  physiotherapy: '\u{1FA7C}',
  'speech-therapy': '\u{1F5E3}\u{FE0F}',
  'occupational-therapy': '\u{1F91D}',
  'behavioral-therapy': '\u{1F9E0}',
}

export default function Services() {
  usePageTitle('Our Services')

  const referralLinkReady = Boolean(contactConfig.referralFormUrl)

  return (
    <>
      <PageHero
        kicker="Our Services"
        title={services.headline}
        subtitle={services.intro}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {services.items.map((service) => (
              <article key={service.slug} id={service.slug} className="card">
                <div className="card-icon">{ICONS[service.slug] || '\u{2795}'}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to="/book" className="card-link">
                  Book an appointment &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="referrals">
        <div className="container">
          <div className="section-head center">
            <span className="kicker">Clinician Referrals</span>
            <h2>{referrals.headline}</h2>
            <p>{referrals.text}</p>
          </div>

          <div className="grid grid-3">
            <div className="card center">
              <h3>Referral Form</h3>
              {referralLinkReady ? (
                <a className="card-link" href={contactConfig.referralFormUrl}>
                  Download the form &rarr;
                </a>
              ) : (
                <p className="text-muted">
                  Referral form link to be inserted. Please contact our clinical team directly
                  in the meantime.
                </p>
              )}
            </div>

            <div className="card center">
              <h3>Email</h3>
              <p className="text-muted">{contactConfig.referralEmail}</p>
            </div>

            <div className="card center">
              <h3>Phone</h3>
              <p className="text-muted">{contactConfig.referralPhone}</p>
            </div>
          </div>

          <p className="center" style={{ marginTop: 26 }}>
            <span className="pill-note">{referrals.acknowledgement}</span>
          </p>

          {isPlaceholder(contactConfig.referralPhone) ? (
            <p className="center text-muted" style={{ fontSize: 14 }}>
              Placeholder contact details - update them in{' '}
              <code>src/lib/site.config.js</code>.
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

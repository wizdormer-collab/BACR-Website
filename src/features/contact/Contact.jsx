import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import ContactList from '../../components/ContactList.jsx'
import Reveal from '../../components/Reveal.jsx'
import { brand, faq, contact, journey } from '../../data/site.js'
import { contactConfig } from '../../lib/site.config.js'

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  contactConfig.mapQuery
)}&t=&z=14&ie=UTF8&iwloc=&output=embed`

const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contactConfig.mapQuery
)}`

export default function Contact() {
  usePageTitle('Contact')

  return (
    <>
      <PageHero
        kicker="Contact Us"
        title="Visit Us in Bodija, Ibadan"
        subtitle={`${brand.name} - ${brand.location}`}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <Reveal>
              <div className="section-head">
                <span className="kicker">{contact.headline}</span>
                <h2>We'd love to hear from you</h2>
                <p>Tell us what is happening and we will help you understand the next step.</p>
              </div>

              <ContactList />

              <div className="hero-actions" style={{ marginTop: 22, marginBottom: 0 }}>
                <Link to={journey.primary.to} className="btn btn-primary">
                  {journey.primary.label}
                </Link>
                <a
                  className="btn btn-outline"
                  href={directionsHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contact.directionsLabel}
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="map-frame">
              <iframe
                title={`Map of ${contactConfig.mapQuery}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="kicker">{faq.kicker}</span>
            <h2>{faq.headline}</h2>
          </Reveal>

          <div className="faq">
            {faq.items.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={journey.headline}
        text={journey.text}
        primary={journey.primary}
        secondary={journey.secondary}
      />
    </>
  )
}

import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import Faq from '../../components/Faq.jsx'
import { brand, contact, faq, journey } from '../../data/site.js'
import { contactConfig } from '../../lib/site.config.js'

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contactConfig.mapQuery || brand.location
)}`
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  contactConfig.mapQuery || brand.location
)}&output=embed`

export default function Contact() {
  // Rows render only when a real value exists — the old site's behaviour,
  // which keeps [Insert Phone Number]-style placeholders out of the DOM.
  const rows = [
    { label: 'Phone', value: contactConfig.phone, href: `tel:${contactConfig.phone}` },
    { label: 'WhatsApp', value: contactConfig.whatsapp, href: null },
    { label: 'Email', value: contactConfig.email, href: `mailto:${contactConfig.email}` },
    { label: contact.hoursLabel, value: contactConfig.workingHours, href: null },
  ].filter((r) => r.value)

  const hasDirectContact = rows.length > 0
  const address = contactConfig.address || brand.location

  return (
    <>
      <PageHero title={contact.headline} />

      <section className="section">
        <div className="container split">
          <div>
            <p className="contact__place">{brand.name}</p>
            <p className="contact__short">{brand.short}</p>

            <dl className="contact__list">
              <div className="contact__row">
                <dt>{contact.locationLabel}</dt>
                <dd>{address}</dd>
              </div>

              {rows.map((r) => (
                <div className="contact__row" key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>
                    {r.href ? (
                      <a href={r.href}>{r.value}</a>
                    ) : (
                      <span>{r.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {!hasDirectContact && (
              <div className="holding" role="note">
                <p className="holding__title">Contact details coming soon</p>
                <p className="holding__text">{contact.holdingNote}</p>
                <div className="btn-row">
                  <Link className="btn btn--primary" to={journey.primary.to}>
                    {journey.primary.label}
                  </Link>
                  <Link className="btn btn--secondary" to={journey.secondary.to}>
                    {journey.secondary.label}
                  </Link>
                </div>
              </div>
            )}

            <p style={{ marginTop: 'var(--s-5)' }}>
              <a
                className="link-arrow"
                href={directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {contact.directionsLabel}
              </a>
            </p>
          </div>

          <div className="contact__map">
            <iframe
              title={`Map showing ${brand.short} — ${address}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section section--ruled">
        <div className="container container--narrow">
          <h2 className="section-title">{faq.headline}</h2>
          <Faq items={faq.items} />
        </div>
      </section>
    </>
  )
}

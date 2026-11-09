import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import Faq from '../../components/Faq.jsx'
import Icon from '../../components/Icon.jsx'
import { brand, contact, faq, journey } from '../../data/site.js'
import { contactConfig } from '../../lib/site.config.js'

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  contactConfig.mapQuery || brand.location
)}&t=&z=14&ie=UTF8&iwloc=&output=embed`

const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contactConfig.mapQuery || brand.location
)}`

export default function Contact() {
  const address = contactConfig.address || brand.location
  const [showMap, setShowMap] = useState(false)

  // Rows only exist when a real value is configured — no placeholders.
  const rows = [
    { icon: 'phone', label: 'Phone', value: contactConfig.phone, href: `tel:${contactConfig.phone}` },
    { icon: 'mail', label: 'Email', value: contactConfig.email, href: `mailto:${contactConfig.email}` },
    { icon: 'chat', label: 'WhatsApp', value: contactConfig.whatsapp, href: null },
    { icon: 'clock', label: contact.hoursLabel, value: contactConfig.workingHours, href: null },
  ].filter((row) => row.value)

  return (
    <>
      <PageHero
        title={contact.headline}
        subtitle={`${brand.name} - ${brand.location}`}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="section-head">
                <span className="kicker">{brand.short}</span>
                <h2>{brand.name}</h2>
                <p>{brand.tagline}</p>
              </div>

              <div className="contact-list">
                <div className="contact-item">
                  <span className="ci-icon" aria-hidden="true">
                    <Icon name="pin" size={18} />
                  </span>
                  <div>
                    <div className="ci-label">{contact.locationLabel}</div>
                    <div className="ci-value">{address}</div>
                  </div>
                </div>

                {rows.map((row) =>
                  row.href ? (
                    <a key={row.label} className="contact-item" href={row.href}>
                      <span className="ci-icon" aria-hidden="true">
                        <Icon name={row.icon} size={18} />
                      </span>
                      <div>
                        <div className="ci-label">{row.label}</div>
                        <div className="ci-value">{row.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div key={row.label} className="contact-item">
                      <span className="ci-icon" aria-hidden="true">
                        <Icon name={row.icon} size={18} />
                      </span>
                      <div>
                        <div className="ci-label">{row.label}</div>
                        <div className="ci-value">{row.value}</div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {rows.length === 0 ? (
                <div className="notice notice-info" role="note" style={{ marginTop: 18 }}>
                  <strong>Contact details coming soon</strong>
                  <br />
                  {contact.holdingNote}
                </div>
              ) : null}

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
            </div>

            <div className="map-frame">
              {showMap ? (
                <div className="map-live">
                  <iframe
                    title={`Map of ${contactConfig.mapQuery || brand.location}`}
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <div className="map-live-tools">
                    <a
                      className="btn btn-outline btn-sm"
                      href={directionsHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Maps
                    </a>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setShowMap(false)}
                    >
                      Hide map
                    </button>
                  </div>
                </div>
              ) : (
                <div className="map-fallback">
                  <span className="map-fallback-icon" aria-hidden="true">
                    <Icon name="pin" size={26} />
                  </span>
                  <strong>Our location</strong>
                  <span className="map-fallback-address">{address}</span>
                  <span className="map-fallback-note">
                    The interactive map is loaded from Google Maps only when you ask.
                  </span>
                  <div className="map-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setShowMap(true)}
                    >
                      Load interactive map
                    </button>
                    <a
                      className="btn btn-outline"
                      href={directionsHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.directionsLabel}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="kicker">Frequently Asked Questions</span>
            <h2>{faq.headline}</h2>
          </div>
          <Faq items={faq.items} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}

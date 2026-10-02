import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import { contact, brand } from '../../data/site.js'
import { contactConfig } from '../../lib/site.config.js'

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  contactConfig.mapQuery
)}&t=&z=14&ie=UTF8&iwloc=&output=embed`

export default function Contact() {
  usePageTitle('Contact')

  const items = [
    { icon: '\u{1F4CD}', label: contact.locationLabel, value: contactConfig.address },
    { icon: '☎', label: 'Phone', value: contactConfig.phone },
    { icon: '✉', label: 'Email', value: contactConfig.email },
    { icon: '◎', label: 'WhatsApp', value: contactConfig.whatsapp },
    { icon: '⏱', label: contact.hoursLabel, value: contactConfig.workingHours },
  ]

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Visit Us in Bodija, Ibadan"
        subtitle={`${brand.name} - ${brand.location}`}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="section-head">
                <span className="kicker">Get in Touch</span>
                <h2>{contact.headline}</h2>
                <p>Walk in, call us, or send a message - we will get back to you.</p>
              </div>

              <div className="contact-list">
                {items.map((item) => (
                  <div key={item.label} className="contact-item">
                    <span className="ci-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div>
                      <div className="ci-label">{item.label}</div>
                      <div className="ci-value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="map-frame">
              <iframe
                title={`Map of ${contactConfig.mapQuery}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <p className="center text-muted" style={{ fontSize: 14, marginTop: 18 }}>
            Map shows Bodija, Ibadan. Refine the exact clinic address in{' '}
            <code>src/lib/site.config.js</code>.
          </p>
        </div>
      </section>

      <CtaBand
        title="Your Recovery Starts With One Step."
        text="Book your consultation today - for yourself, a loved one, or as a referring clinician."
        primary={{ label: 'Book Appointment', to: '/book' }}
        secondary={{ label: 'Our services', to: '/services' }}
      />
    </>
  )
}

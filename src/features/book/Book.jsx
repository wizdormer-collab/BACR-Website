import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import Icon from '../../components/Icon.jsx'
import { booking, brand, contact, journey } from '../../data/site.js'
import { contactConfig } from '../../lib/site.config.js'
import {
  buildWhatsAppMessage,
  buildWhatsAppLink,
  copyToClipboard,
} from '../../lib/whatsapp.js'

const EMPTY = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  ageGroup: '',
  contactMethod: '',
  description: '',
}

export default function Book() {
  const [details, setDetails] = useState(EMPTY)
  const [status, setStatus] = useState(null)

  const set = (key) => (e) => setDetails((d) => ({ ...d, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    const message = buildWhatsAppMessage(details)
    const link = buildWhatsAppLink(contactConfig.whatsappNumber, message)

    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
      setStatus({ tone: 'success', text: 'Opening WhatsApp with your details ready to send.' })
      return
    }

    const copied = await copyToClipboard(message)
    setStatus(
      copied
        ? {
            tone: 'success',
            text: 'Your details were copied. Send them to BACR once the centre publishes its WhatsApp number.',
          }
        : {
            tone: 'warn',
            text: 'WhatsApp is not configured yet — copy your details above and send them once BACR publishes its contact channels.',
          }
    )
  }

  return (
    <>
      <PageHero
        kicker={journey.kicker}
        title={booking.headline}
        subtitle={booking.subtext}
      />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="section-head">
              <span className="kicker">{contact.headline}</span>
              <h2>{brand.name}</h2>
              <p>{contact.holdingNote}</p>
            </div>

            <div className="contact-list">
              <div className="contact-item">
                <span className="ci-icon" aria-hidden="true">
                  <Icon name="pin" size={18} />
                </span>
                <div>
                  <div className="ci-label">{contact.locationLabel}</div>
                  <div className="ci-value">{contactConfig.address || brand.location}</div>
                </div>
              </div>
            </div>

            <p style={{ marginTop: 24, marginBottom: 0 }}>
              <Link to="/contact" className="btn btn-outline">
                Visit the Contact Page
              </Link>
            </p>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={details.fullName}
                  onChange={set('fullName')}
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={details.phone}
                  onChange={set('phone')}
                />
              </div>

              <div className="field field-full">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={set('email')}
                />
              </div>

              <div className="field">
                <label htmlFor="service">Service required</label>
                <select id="service" name="service" value={details.service} onChange={set('service')}>
                  <option value="">Select…</option>
                  {booking.fields.serviceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="ageGroup">Patient age group</label>
                <select
                  id="ageGroup"
                  name="ageGroup"
                  value={details.ageGroup}
                  onChange={set('ageGroup')}
                >
                  <option value="">Select…</option>
                  {booking.fields.ageGroupOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field field-full">
                <label htmlFor="contactMethod">Preferred contact method</label>
                <select
                  id="contactMethod"
                  name="contactMethod"
                  value={details.contactMethod}
                  onChange={set('contactMethod')}
                >
                  <option value="">Select…</option>
                  {booking.fields.contactMethodOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field field-full">
                <label htmlFor="description">What is happening?</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  required
                  value={details.description}
                  onChange={set('description')}
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit">
                {booking.submitLabel}
              </button>
            </div>

            {status ? (
              <p className={`notice notice-${status.tone}`} role="status" aria-live="polite">
                {status.text}
              </p>
            ) : null}

            {!contactConfig.whatsappNumber ? (
              <p className="text-muted" style={{ fontSize: '0.84375rem', margin: '16px 0 0' }}>
                WhatsApp delivery is off until a number is set. Your details are copied to the
                clipboard instead of sent.
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  )
}

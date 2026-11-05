import { useState } from 'react'
import PageHero from '../../components/PageHero.jsx'
import { booking } from '../../data/site.js'
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
      setStatus({ tone: 'ok', text: 'Opening WhatsApp with your details ready to send.' })
      return
    }

    const copied = await copyToClipboard(message)
    setStatus(
      copied
        ? {
            tone: 'ok',
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
        kicker="Book an Assessment"
        title={booking.headline}
        lead={booking.subtext}
      />

      <section className="section">
        <div className="container container--narrow">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__grid">
              <p className="field">
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
              </p>

              <p className="field">
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
              </p>

              <p className="field field--full">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={set('email')}
                />
              </p>

              <p className="field">
                <label htmlFor="service">Service required</label>
                <select
                  id="service"
                  name="service"
                  value={details.service}
                  onChange={set('service')}
                >
                  <option value="">Select…</option>
                  {booking.fields.serviceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </p>

              <p className="field">
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
              </p>

              <p className="field field--full">
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
              </p>

              <p className="field field--full">
                <label htmlFor="description">
                  What is happening? <span className="field__hint">need</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  required
                  value={details.description}
                  onChange={set('description')}
                />
              </p>
            </div>

            <div className="form__actions">
              <button className="btn btn--primary" type="submit">
                {booking.submitLabel}
              </button>
            </div>

            {!contactConfig.whatsappNumber && (
              <p className="small muted form__note">
                WhatsApp delivery is off until a number is set in{' '}
                <code>site.config.js</code>. Your details are copied to the
                clipboard instead of sent.
              </p>
            )}

            {status && (
              <p
                className={`form__status form__status--${status.tone}`}
                role="status"
                aria-live="polite"
              >
                {status.text}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}

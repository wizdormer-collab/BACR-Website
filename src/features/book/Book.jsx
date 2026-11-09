import { useEffect, useRef, useState } from 'react'
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

const PHONE_PATTERN = /^[+()\d\s.-]{7,}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.fullName.trim()) {
    errors.fullName = 'Enter your full name.'
  }
  if (!values.phone.trim()) {
    errors.phone = 'Enter a phone number we can reach you on.'
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Use digits, spaces, +, - or brackets only.'
  }
  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address, or leave this blank.'
  }
  if (!values.description.trim()) {
    errors.description = 'Tell us briefly what is happening.'
  }
  return errors
}

export default function Book() {
  const [details, setDetails] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [prepared, setPrepared] = useState('')
  const [copied, setCopied] = useState(false)
  const previewRef = useRef(null)
  const formRef = useRef(null)

  const set = (key) => (e) => {
    const value = e.target.value
    setDetails((d) => ({ ...d, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
    // Editing after a submit invalidates the prepared enquiry shown below.
    setPrepared('')
    setCopied(false)
    setStatus(null)
  }

  // Move keyboard focus to the prepared enquiry so screen-reader and keyboard
  // users land on the fallback instead of having to hunt for it.
  useEffect(() => {
    if (prepared) previewRef.current?.focus()
  }, [prepared])

  async function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(details)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ tone: 'error', text: 'Please check the highlighted fields and try again.' })
      const firstKey = ['fullName', 'phone', 'email', 'description'].find((key) => nextErrors[key])
      if (firstKey) formRef.current?.querySelector(`[name="${firstKey}"]`)?.focus()
      return
    }

    const message = buildWhatsAppMessage(details)
    const link = buildWhatsAppLink(contactConfig.whatsappNumber, message)

    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
      setPrepared('')
      setStatus({ tone: 'success', text: 'Opening WhatsApp with your details ready to send.' })
      return
    }

    const ok = await copyToClipboard(message)
    setPrepared(message)
    setCopied(ok)
    setStatus({
      tone: ok ? 'success' : 'warn',
      text: ok
        ? 'Your enquiry is ready below and has been copied. Paste it into a message to BACR once a contact channel is published.'
        : 'Your enquiry is ready below. Use “Copy enquiry” to copy it once a contact channel is published.',
    })
  }

  async function handleCopy() {
    if (!prepared) return
    const ok = await copyToClipboard(prepared)
    setCopied(ok)
    setStatus(
      ok
        ? { tone: 'success', text: 'Enquiry copied to your clipboard.' }
        : { tone: 'warn', text: 'Your browser blocked copying. Select the text below and copy it manually.' },
    )
    if (ok) previewRef.current?.focus()
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

          <form className="form" ref={formRef} onSubmit={handleSubmit} noValidate>
            {!contactConfig.whatsappNumber ? (
              <div className="notice notice-info form-note" role="note">
                <strong>Online sending is not connected yet.</strong> You can still complete the
                form — we will prepare your enquiry so you can copy it and send it to BACR once a
                contact channel is published.
              </div>
            ) : null}

            <div className="form-grid">
              <div className={`field ${errors.fullName ? 'field-invalid' : ''}`.trim()}>
                <label htmlFor="fullName">
                  Full name <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={details.fullName}
                  onChange={set('fullName')}
                  aria-invalid={errors.fullName ? 'true' : undefined}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName ? (
                  <span className="error" id="fullName-error">{errors.fullName}</span>
                ) : null}
              </div>

              <div className={`field ${errors.phone ? 'field-invalid' : ''}`.trim()}>
                <label htmlFor="phone">
                  Phone number <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={details.phone}
                  onChange={set('phone')}
                  aria-invalid={errors.phone ? 'true' : undefined}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone ? (
                  <span className="error" id="phone-error">{errors.phone}</span>
                ) : null}
              </div>

              <div className={`field field-full ${errors.email ? 'field-invalid' : ''}`.trim()}>
                <label htmlFor="email">Email address (optional)</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={set('email')}
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email ? (
                  <span className="error" id="email-error">{errors.email}</span>
                ) : null}
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

              <div className={`field field-full ${errors.description ? 'field-invalid' : ''}`.trim()}>
                <label htmlFor="description">
                  What is happening? <span className="req" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={details.description}
                  onChange={set('description')}
                  aria-invalid={errors.description ? 'true' : undefined}
                  aria-describedby={errors.description ? 'description-error' : undefined}
                />
                {errors.description ? (
                  <span className="error" id="description-error">{errors.description}</span>
                ) : null}
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit">
                {booking.submitLabel}
              </button>
            </div>

            {status ? (
              <p
                className={`notice notice-${status.tone}`}
                role={status.tone === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {status.text}
              </p>
            ) : null}

            {prepared ? (
              <div className="enquiry-preview">
                <div className="enquiry-preview-head">
                  <strong>Your enquiry</strong>
                  <button type="button" className="btn btn-outline btn-sm" onClick={handleCopy}>
                    {copied ? 'Copied' : 'Copy enquiry'}
                  </button>
                </div>
                <pre ref={previewRef} tabIndex={0} aria-label="Your prepared enquiry">
                  {prepared}
                </pre>
              </div>
            ) : null}
          </form>
        </div>
      </section>
    </>
  )
}

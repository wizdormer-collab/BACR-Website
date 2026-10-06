import { useState } from 'react'
import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import ContactList from '../../components/ContactList.jsx'
import { booking, contact } from '../../data/site.js'
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
  description: '',
  contactMethod: '',
}

function validate(values) {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!values.phone.trim()) errors.phone = 'Please enter a phone number.'
  if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.service) errors.service = 'Please choose a service.'
  if (!values.ageGroup) errors.ageGroup = 'Please choose an age group.'
  if (!values.description.trim()) errors.description = 'Please describe the need briefly.'
  if (!values.contactMethod) errors.contactMethod = 'Please choose a contact method.'
  return errors
}

export default function Book() {
  usePageTitle('Book an Appointment')

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [copied, setCopied] = useState(false)

  const update = (key) => (event) => {
    setValues((v) => ({ ...v, [key]: event.target.value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
    setStatus(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus({ type: 'error', text: 'Please fix the highlighted fields and try again.' })
      return
    }
    setStatus({
      type: 'success',
      text: 'Enquiry ready - send it via WhatsApp or copy the message and share it with us.',
    })
  }

  const message = buildWhatsAppMessage(values)
  const whatsappLink = buildWhatsAppLink(contactConfig.whatsappNumber, message)

  const handleCopy = async () => {
    const ok = await copyToClipboard(message)
    setCopied(ok)
    if (!ok) {
      setStatus({
        type: 'error',
        text: 'Could not copy automatically - please select the message and copy it manually.',
      })
    }
  }

  return (
    <>
      <PageHero
        kicker="Book an Appointment"
        title={booking.headline}
        subtitle={booking.subtext}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="section-head">
                <span className="kicker">Direct Contact</span>
                <h2>{contact.headline}</h2>
                <p>Prefer to talk? Reach us directly and we will book you in.</p>
              </div>

              <ContactList />
            </div>

            <form className="form" onSubmit={handleSubmit} noValidate>
              {status ? (
                <div
                  className={`notice ${
                    status.type === 'success' ? 'notice-success' : 'notice-error'
                  }`}
                  role="status"
                >
                  {status.text}
                </div>
              ) : null}

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="fullName">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={values.fullName}
                    onChange={update('fullName')}
                    placeholder="e.g. Adaeze Okafor"
                    autoComplete="name"
                  />
                  {errors.fullName ? <span className="error">{errors.fullName}</span> : null}
                </div>

                <div className="field">
                  <label htmlFor="phone">
                    Phone Number <span className="req">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={update('phone')}
                    placeholder="+234 ..."
                    autoComplete="tel"
                  />
                  {errors.phone ? <span className="error">{errors.phone}</span> : null}
                </div>

                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={update('email')}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email ? <span className="error">{errors.email}</span> : null}
                </div>

                <div className="field">
                  <label htmlFor="service">
                    Service Required <span className="req">*</span>
                  </label>
                  <select id="service" name="service" value={values.service} onChange={update('service')}>
                    <option value="">Select a service</option>
                    {booking.fields.serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.service ? <span className="error">{errors.service}</span> : null}
                </div>

                <div className="field">
                  <label htmlFor="ageGroup">
                    Patient Age Group <span className="req">*</span>
                  </label>
                  <select
                    id="ageGroup"
                    name="ageGroup"
                    value={values.ageGroup}
                    onChange={update('ageGroup')}
                  >
                    <option value="">Select age group</option>
                    {booking.fields.ageGroupOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.ageGroup ? <span className="error">{errors.ageGroup}</span> : null}
                </div>

                <div className="field">
                  <label htmlFor="contactMethod">
                    Preferred Contact Method <span className="req">*</span>
                  </label>
                  <select
                    id="contactMethod"
                    name="contactMethod"
                    value={values.contactMethod}
                    onChange={update('contactMethod')}
                  >
                    <option value="">Select a method</option>
                    {booking.fields.contactMethodOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.contactMethod ? (
                    <span className="error">{errors.contactMethod}</span>
                  ) : null}
                </div>

                <div className="field field-full">
                  <label htmlFor="description">
                    Brief Description of Need <span className="req">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={update('description')}
                    placeholder="Tell us briefly what the patient needs help with..."
                  />
                  {errors.description ? <span className="error">{errors.description}</span> : null}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {booking.submitLabel}
                </button>
                {whatsappLink ? (
                  <a
                    className="btn btn-outline"
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Send via WhatsApp
                  </a>
                ) : null}
                <button type="button" className="btn btn-outline" onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy message'}
                </button>
              </div>

              <details style={{ marginTop: 20 }}>
                <summary style={{ cursor: 'pointer', fontSize: '0.90625rem', color: 'var(--muted)' }}>
                  Preview of the message we will prepare
                </summary>
                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.84375rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    padding: 14,
                    marginTop: 10,
                  }}
                >
                  {message}
                </pre>
              </details>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

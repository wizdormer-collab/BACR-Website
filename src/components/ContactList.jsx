import Icon from './Icon.jsx'
import { contactConfig, isPlaceholder } from '../lib/site.config.js'
import { contact } from '../data/site.js'

export function buildContactItems() {
  const items = [{ icon: 'pin', label: contact.locationLabel, value: contactConfig.address }]

  if (!isPlaceholder(contactConfig.phone)) {
    items.push({ icon: 'phone', label: 'Phone', value: contactConfig.phone, href: `tel:${contactConfig.phone}` })
  }
  if (!isPlaceholder(contactConfig.email)) {
    items.push({ icon: 'mail', label: 'Email', value: contactConfig.email, href: `mailto:${contactConfig.email}` })
  }
  if (!isPlaceholder(contactConfig.whatsapp)) {
    items.push({ icon: 'chat', label: 'WhatsApp', value: contactConfig.whatsapp })
  }
  if (contactConfig.workingHours) {
    items.push({ icon: 'clock', label: contact.hoursLabel, value: contactConfig.workingHours })
  }

  return items
}

export function hasDirectContact() {
  return (
    !isPlaceholder(contactConfig.phone) ||
    !isPlaceholder(contactConfig.email) ||
    !isPlaceholder(contactConfig.whatsapp)
  )
}

export default function ContactList() {
  const items = buildContactItems()

  return (
    <>
      <div className="contact-list">
        {items.map((item) => {
          const body = (
            <>
              <span className="ci-icon" aria-hidden="true">
                <Icon name={item.icon} size={18} />
              </span>
              <div>
                <div className="ci-label">{item.label}</div>
                <div className="ci-value">{item.value}</div>
              </div>
            </>
          )

          return item.href ? (
            <a key={item.label} className="contact-item" href={item.href}>
              {body}
            </a>
          ) : (
            <div key={item.label} className="contact-item">
              {body}
            </div>
          )
        })}
      </div>

      {!hasDirectContact() ? (
        <p className="notice notice-info" style={{ marginTop: 18, marginBottom: 0 }}>
          Phone, WhatsApp and email details are coming soon.
        </p>
      ) : null}

      {import.meta.env.DEV ? (
        <p className="text-muted" style={{ fontSize: '0.8125rem', marginTop: 14, marginBottom: 0 }}>
          Dev: set real details in <code>src/lib/site.config.js</code>.
        </p>
      ) : null}
    </>
  )
}

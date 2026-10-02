export function buildWhatsAppMessage(details) {
  const {
    fullName = '',
    phone = '',
    email = '',
    service = '',
    ageGroup = '',
    description = '',
    contactMethod = '',
  } = details || {}

  const lines = [
    'Hello BACR - I would like to book an appointment.',
    '',
    `Name: ${fullName.trim()}`,
    `Phone: ${phone.trim()}`,
    `Email: ${email.trim()}`,
    `Service required: ${service.trim() || 'Not Sure'}`,
    `Patient age group: ${ageGroup.trim()}`,
    `Preferred contact method: ${contactMethod.trim()}`,
    '',
    'Need:',
    description.trim(),
  ]

  return lines.join('\n')
}

export function buildWhatsAppLink(number, message) {
  const digits = String(number || '').replace(/\D/g, '')
  if (!digits) return ''
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export async function copyToClipboard(text) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }
  return false
}

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
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fall through to the selection-based path (blocked permission, or a
      // non-secure context where the API exists but rejects).
    }
  }

  if (typeof document !== 'undefined' && document.body) {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.top = '-1000px'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    let copied = false
    try {
      copied = document.execCommand('copy')
    } catch {
      copied = false
    }
    document.body.removeChild(area)
    return copied
  }

  return false
}

export const contactConfig = {
  // TODO: replace every placeholder below with the real BACR details.
  phone: '+234 XXX XXX XXXX',
  email: 'hello@example.com',
  whatsapp: '+234 XXX XXX XXXX',
  whatsappNumber: '', // digits only, e.g. '2348012345678' - leave empty until provided
  workingHours: 'Mon - Fri, 8:00 AM - 5:00 PM',
  address: 'Bodija, Ibadan, Oyo State, Nigeria',
  referralEmail: 'referrals@example.com',
  referralPhone: '+234 XXX XXX XXXX',
  referralFormUrl: '', // TODO: link to the downloadable referral form
  mapQuery: 'Bodija, Ibadan, Oyo State, Nigeria',
}

export const PLACEHOLDER_TOKENS = ['XXX', 'example.com']

export function isPlaceholder(value) {
  if (!value) return true
  return PLACEHOLDER_TOKENS.some((token) => String(value).includes(token))
}

export function isContactConfigured() {
  return !isPlaceholder(contactConfig.phone) && Boolean(contactConfig.whatsappNumber)
}

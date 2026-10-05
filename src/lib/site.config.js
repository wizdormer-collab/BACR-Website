export const contactConfig = {
  // Fill these with the real BACR details. Empty string = not yet published,
  // and the UI hides the row instead of showing a placeholder.
  phone: '',
  email: '',
  whatsapp: '',
  whatsappNumber: '', // digits only, e.g. '2348012345678'
  workingHours: '', // e.g. 'Mon - Fri, 8:00 AM - 5:00 PM'
  address: 'Bodija, Ibadan, Oyo State, Nigeria',
  referralEmail: '',
  referralPhone: '',
  referralFormUrl: '', // link to the downloadable referral form
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

// Deployment identity — canonical URLs, the sitemap and every prerendered
// <link rel="canonical"> derive from these two values.
export const SITE_ORIGIN = 'https://wizdormer-collab.github.io'
export const SITE_BASE_PATH = '/BACR-Website'
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`

// Canonical (slash) form of a route. GitHub Pages 301s directory URLs to their
// slash form, so that is the address to advertise in <link rel="canonical">,
// og:url and the sitemap. Used by tools/prerender.mjs and pinned by the tests.
export function canonicalUrl(routePath) {
  return routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}/`
}

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

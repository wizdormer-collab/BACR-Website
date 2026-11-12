// Per-page search metadata: the snippet each page ships in
// <meta name="description">, og:description and twitter:description, plus the
// JSON-LD blocks. Every string here is assembled from PRD copy in
// src/data/site.js — no invented claims, no contact details the PRD has not
// published yet (contact.holdingNote).
//
// Why this file exists: index.html carries one shared description (the home
// page's) and the prerender step used to swap titles only, so all ten pages
// went out with duplicate descriptions. tools/prerender.mjs now reads these
// two maps and fails the build if a route is missing an entry.
import {
  brand,
  about,
  howItWorks,
  children,
  referrers,
  booking,
  faq,
} from '../data/site.js'
import { canonicalUrl } from './site.config.js'

// Search results cut snippets off around 160 characters, so each entry stays
// close to that. Entries reference the PRD field directly where the copy fits
// as written; where it needs a trim, the comment names the fields it was cut
// from — when the PRD copy changes, re-cut the description with it.
export const PAGE_DESCRIPTIONS = {
  // hero.paragraphs[0] + the locality in brand.location
  '/':
    'Bodija Advanced Centre for Rehabilitation (BACR) is a multidisciplinary rehabilitation centre providing specialised, coordinated care for children and adults in Ibadan.',
  // about.paragraphs[2]
  '/about': about.paragraphs[2],
  // howItWorks.intro + howItWorks.headline
  '/how-it-works': `${howItWorks.intro} ${howItWorks.headline}`,
  // the five service categories from services.items + the locality in brand.location
  '/services':
    'BACR provides physical, occupational, communication, developmental and psychological rehabilitation for children and adults in Ibadan.',
  // children.paragraphs[1]
  '/children': children.paragraphs[1],
  // adults.paragraphs[1] + the audience this page exists for
  '/adults':
    'BACR provides coordinated rehabilitation for adults, designed around the individual’s goals and functional needs.',
  // team.intro, trimmed to one line
  '/team':
    'BACR brings together professionals across rehabilitation and related areas, working within their professional scopes while collaborating around the patient’s needs.',
  // referrers.paragraphs[0]
  '/referrers': referrers.paragraphs[0],
  // booking.subtext
  '/book': booking.subtext,
  // contact.holdingNote, trimmed + brand.location
  '/contact':
    'We are publishing direct contact details shortly. In the meantime, send an assessment enquiry. BACR is located in Bodija, Ibadan, Oyo State, Nigeria.',
}

// Structured data. Only what the PRD publishes: no phone, email or opening
// hours (those are not public yet — see contact.holdingNote), no ratings, no
// invented service list.
const clinic = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: brand.name,
  alternateName: brand.short,
  url: canonicalUrl('/'),
  slogan: brand.tagline,
  // brand.location: 'Bodija, Ibadan, Oyo State, Nigeria' — split into the
  // fields schema.org expects, country as its ISO code. No street address is
  // published, so none is invented here.
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ibadan',
    addressRegion: 'Oyo State',
    addressCountry: 'NG',
  },
}

// The contact page renders faq.items as native <details>; this mirrors that
// list item for item so the schema and the visible page can never disagree
// (Google requires FAQ schema to match the page).
const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

// One block per route, injected into <head> by tools/prerender.mjs. Pages
// not listed here ship without structured data — add an entry rather than
// reusing another page's block.
export const PAGE_JSON_LD = {
  '/': clinic,
  '/contact': faqPage,
}

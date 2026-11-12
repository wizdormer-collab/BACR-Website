import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PAGE_DESCRIPTIONS, PAGE_JSON_LD } from '../src/lib/seo.js'
import { PAGE_PATHS } from '../src/lib/pages.js'
import { brand, faq } from '../src/data/site.js'
import { canonicalUrl } from '../src/lib/site.config.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const prerender = readFileSync(path.join(ROOT, 'tools/prerender.mjs'), 'utf8')

// The shell's single shared description went out on all ten pages as
// duplicates; these pin the fix (per-route snippets + JSON-LD) and keep the
// SEO copy as tightly bound to the PRD as the visible copy is.
describe('per-page meta descriptions', () => {
  it('gives every route its own description', () => {
    for (const route of PAGE_PATHS) {
      expect(PAGE_DESCRIPTIONS[route], `missing description for ${route}`).toBeTruthy()
    }
    const values = PAGE_PATHS.map((route) => PAGE_DESCRIPTIONS[route])
    expect(new Set(values).size, 'two routes share a description').toBe(values.length)
  })

  it('stays within the length search results display', () => {
    for (const [route, description] of Object.entries(PAGE_DESCRIPTIONS)) {
      const at = `${route} is ${description.length} chars`
      expect(description.length, at).toBeGreaterThanOrEqual(60)
      expect(description.length, at).toBeLessThanOrEqual(170)
    }
  })

  it('carries no claims the PRD forbids', () => {
    for (const [route, description] of Object.entries(PAGE_DESCRIPTIONS)) {
      expect(description, route).not.toContain('48 hours')
      expect(description, route).not.toContain('BHH')
    }
  })

  it('is wired into the prerender step, which fails loudly without it', () => {
    expect(prerender).toContain('PAGE_DESCRIPTIONS')
    // all three tags the shell defines, not just <meta name="description">
    expect(prerender).toContain('name="description"')
    expect(prerender).toContain('og:description')
    expect(prerender).toContain('twitter:description')
    expect(prerender).toContain('no meta description for route')
  })
})

describe('structured data', () => {
  it('describes the home page as the clinic, using only published details', () => {
    const clinic = PAGE_JSON_LD['/']
    expect(clinic['@context']).toBe('https://schema.org')
    expect(clinic['@type']).toBe('MedicalClinic')
    expect(clinic.name).toBe(brand.name)
    expect(clinic.alternateName).toBe(brand.short)
    expect(clinic.url).toBe(canonicalUrl('/'))
    expect(clinic.address).toEqual({
      '@type': 'PostalAddress',
      addressLocality: 'Ibadan',
      addressRegion: 'Oyo State',
      addressCountry: 'NG',
    })
    // contact.holdingNote: direct contact details are not public yet, so the
    // schema must not invent a phone, email or opening hours either.
    const json = JSON.stringify(clinic)
    expect(json).not.toMatch(/phone|email|telephone|openingHours/i)
  })

  it('mirrors the contact page FAQ question for question', () => {
    const faqPage = PAGE_JSON_LD['/contact']
    expect(faqPage['@context']).toBe('https://schema.org')
    expect(faqPage['@type']).toBe('FAQPage')
    expect(faqPage.mainEntity).toHaveLength(faq.items.length)
    faqPage.mainEntity.forEach((question, index) => {
      expect(question['@type']).toBe('Question')
      expect(question.name).toBe(faq.items[index].q)
      expect(question.acceptedAnswer['@type']).toBe('Answer')
      expect(question.acceptedAnswer.text).toBe(faq.items[index].a)
    })
  })

  it('is injected per route by the prerender step', () => {
    expect(prerender).toContain('PAGE_JSON_LD')
    expect(prerender).toContain('application/ld+json')
  })
})

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(path.join(ROOT, 'src/styles/global.css'), 'utf8')

describe('button colours are never overridden by context rules', () => {
  it('the CTA callout does not repaint its buttons through a bare link rule', () => {
    // `.callout a` (0,1,1) would beat `.btn-light` (0,1,0): the CTA band once
    // shipped a white-on-white "Book an Assessment" button because of it.
    expect(css).not.toMatch(/\.callout\s+a\s*\{/)
    expect(css).not.toMatch(/\.callout\s+a:hover\s*\{/)
  })

  it('the light button keeps a dark foreground on its light background', () => {
    expect(css).toMatch(/\.btn-light\s*\{[^}]*background:\s*#fff/)
    expect(css).toMatch(/\.btn-light\s*\{[^}]*color:\s*var\(--primary-dark\)/)
  })
})

describe('the original design tokens are the brand values', () => {
  it('primary is the logo indigo and accent the logo green', () => {
    expect(css).toMatch(/--primary:\s*var\(--brand-indigo\)/)
    expect(css).toMatch(/--accent:\s*var\(--brand-green\)/)
  })

  it('the body logo is not boxed in a bordered card', () => {
    const block = (css.match(/\.about-logo\s*\{[^}]*\}/) || [''])[0]
    expect(block).not.toMatch(/border:/)
    expect(block).not.toMatch(/background:/)
    expect(block).not.toMatch(/box-shadow:/)
  })

  it('logo-led splits top-align instead of centring the left column', () => {
    expect(css).toMatch(/\.split--top\s*\{[^}]*align-items:\s*start/)
    const pages = ['src/features/home/Home.jsx', 'src/features/about/About.jsx'].map((file) =>
      readFileSync(path.join(ROOT, file), 'utf8')
    )
    for (const source of pages) {
      expect(source).toContain('split split--top')
    }
  })

  it('the footer logo keeps its aspect ratio', () => {
    // Intrinsic width/height attributes plus a fixed CSS height squashed the
    // lockup when the column was narrower than the attribute width.
    const block = (css.match(/\.footer-brand img\s*\{[^}]*\}/) || [''])[0]
    expect(block).toMatch(/height:\s*84px/)
    expect(block).toMatch(/width:\s*auto/)
  })
})

describe('art direction never breaks the content layers', () => {
  it('the home services use a grid that collapses on small screens', () => {
    expect(css).toMatch(/\.service-grid\s*\{[^}]*display:\s*grid/)
    expect(css).toMatch(/@media \(max-width: 640px\)\s*\{[\s\S]*?\.service-grid\s*\{\s*grid-template-columns:\s*1fr/)
  })

  it('the hero artwork is decorative and cannot be dragged or selected', () => {
    expect(css).toMatch(/\.hero-bloom\s*\{[^}]*pointer-events:\s*none/)
    expect(css).toMatch(/\.audience-svg\s*\{[^}]*position:\s*absolute/)
  })

  it('light inner-page heroes keep the bloom hidden', () => {
    expect(css).toMatch(/\.page-hero\.light \.page-hero-art\s*\{\s*display:\s*none/)
  })

  it('motion-heavy hover effects are dropped for reduced motion', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.service-card/)
  })
})

describe('the hero trust strip centres each icon-and-label pair', () => {
  it('does not left-align the icon against a top-aligned label', () => {
    const block = (css.match(/\.trust-item\s*\{[^}]*\}/) || [''])[0]
    expect(block).toMatch(/justify-content:\s*center/)
    expect(block).toMatch(/align-items:\s*center/)
    expect(block).not.toMatch(/align-items:\s*flex-start/)
  })
})

describe('the home approach headline is the display moment of its column', () => {
  it('runs large and bold, and spans the full width of the feature column', () => {
    const block = (css.match(/\.feature-list \.approach-title\s*\{[^}]*\}/) || [''])[0]
    expect(block).toMatch(/font-size:\s*clamp\(/)
    expect(block).toMatch(/font-weight:\s*800/)
    expect(block).toMatch(/text-wrap:\s*balance/)
    expect(block).toMatch(/max-width:\s*100%/)

    // The section head's 720px cap once left the heading narrower than the
    // cards beneath it on tablet widths.
    const head = (css.match(/\.feature-list \.section-head\s*\{[^}]*\}/) || [''])[0]
    expect(head).toMatch(/max-width:\s*100%/)
  })
})

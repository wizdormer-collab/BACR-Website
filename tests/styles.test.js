import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(path.join(ROOT, 'src/styles/global.css'), 'utf8')
const block = (selector) => (css.match(new RegExp(`${selector}\\s*\\{[^}]*\\}`)) || [''])[0]

describe('brand tokens are the logo values', () => {
  it('uses the sampled navy, indigo and green', () => {
    expect(css).toMatch(/--navy:\s*#160958/)
    expect(css).toMatch(/--indigo:\s*#534cea/)
    expect(css).toMatch(/--green:\s*#00e24b/)
  })

  it('keeps the display face on headings and the body face on text', () => {
    expect(css).toMatch(/--font-display:\s*'Plus Jakarta Sans'/)
    expect(css).toMatch(/--font-body:\s*'Inter'/)
  })
})

describe('type never shrinks below a readable mobile size', () => {
  it('sets body text to 16px and ships no root font-size shrink', () => {
    // The previous sheet dropped html to 13.6px on mobile, which made every
    // rem-based rule smaller than the platform default.
    expect(css).toMatch(/body\s*\{[^}]*font-size:\s*16px/)
    expect(css).not.toMatch(/html\s*\{[^}]*font-size:\s*13\.6px/)
    expect(css).not.toMatch(/@media[^{]*\{[^@]*html\s*\{[^}]*font-size:\s*1[0-5](?:\.\d+)?px/)
  })

  it('caps the reading measure so long PRD paragraphs stay legible', () => {
    expect(block('\\.lead')).toMatch(/max-width:\s*62ch/)
    expect(css).toMatch(/\.section-head\s*\{[^}]*max-width:\s*780px/)
  })
})

describe('the shell cannot scroll sideways', () => {
  it('clips horizontal overflow without turning the page into a scroll box', () => {
    expect(css).toMatch(/html,\s*\nbody\s*\{[^}]*overflow-x:\s*clip/)
  })

  it('uses fluid container gutters rather than a fixed desktop width', () => {
    expect(block('\\.container')).toMatch(/max-width:\s*var\(--max\)/)
    expect(css).toMatch(/--gutter:\s*clamp\(20px,\s*4vw,\s*40px\)/)
  })
})

describe('buttons keep their own foregrounds', () => {
  it('the CTA band never repaints buttons through a bare link rule', () => {
    // `.cta a` would outrank `.btn-ghost` and turn the label navy on navy.
    expect(css).not.toMatch(/\.cta\s+a\s*\{/)
    expect(css).not.toMatch(/\.cta\s+a:hover\s*\{/)
  })

  it('ghost buttons stay white on the navy band', () => {
    expect(block('\\.btn-ghost')).toMatch(/color:\s*#fff/)
    expect(block('\\.btn-ghost')).toMatch(/border-color:\s*rgba\(255,\s*255,\s*255/)
  })

  it('the green action keeps navy text for contrast', () => {
    expect(block('\\.btn-green')).toMatch(/background:\s*var\(--green\)/)
    expect(block('\\.btn-green')).toMatch(/color:\s*var\(--navy\)/)
  })
})

describe('Calm Clinic home art direction', () => {
  it('the hero pairs one large headline with one consultation portrait', () => {
    expect(block('\\.hero h1')).toMatch(/font-size:\s*clamp\(2\.3rem/)
    expect(block('\\.hero h1 \\.hl::after')).toMatch(/background:\s*var\(--green\)/)
    expect(block('\\.hero-photo')).toMatch(/aspect-ratio:\s*4\s*\/\s*5/)
    expect(block('\\.hero-photo img')).toMatch(/object-fit:\s*cover/)
  })

  it('the approach quote floats on the photo rather than in a hero panel', () => {
    expect(block('\\.hero-quote')).toMatch(/position:\s*absolute/)
    expect(css).not.toContain('hero-panel')
    expect(css).not.toContain('approach-row')
  })

  it('services are a numbered editorial list, not a side-scroller', () => {
    expect(block('\\.service-list')).toMatch(/border-top:\s*1px solid var\(--line-strong\)/)
    expect(block('\\.service-row')).toMatch(/grid-template-columns:\s*52px/)
    expect(block('\\.service-num')).toMatch(/font-family:\s*var\(--font-display\)/)
    expect(css).not.toContain('service-track')
    expect(css).not.toContain('scroll-snap-type')
  })

  it('the trust strip is a three-column band with centred pairs', () => {
    expect(block('\\.trust-grid')).toMatch(/grid-template-columns:\s*repeat\(3,\s*1fr\)/)
    expect(block('\\.trust-item')).toMatch(/align-items:\s*center/)
    expect(css).not.toMatch(/\.trust-item\s*\{[^}]*align-items:\s*flex-start/)
  })

  it('the process is a five-step numbered grid, not a scroll rail', () => {
    expect(block('\\.process-grid')).toMatch(/grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/)
    expect(block('\\.process-num')).toMatch(/border-radius:\s*50%/)
    expect(css).not.toContain('--process-fill')
    expect(css).not.toContain('process-list')
  })

  it('the About column keeps its quote and principles in separate tracks', () => {
    expect(block('\\.about-grid')).toMatch(/grid-template-columns:/)
    expect(block('blockquote\\.pull')).toMatch(/border-left:\s*3px solid var\(--green\)/)
    expect(block('\\.principles')).toMatch(/border-top:\s*1px solid var\(--line-strong\)/)
  })

  it('drops decorative SVG artwork from the stylesheet', () => {
    const home = readFileSync(path.join(ROOT, 'src/features/home/Home.jsx'), 'utf8')
    expect(home).not.toContain('AudienceArt')
    expect(home).not.toContain('HeroBloom')
    expect(css).not.toContain('hero-bloom')
    expect(css).not.toContain('audience-svg')
  })
})

describe('inner pages share the quiet clinical surface', () => {
  it('page heroes are white with a rule, not a gradient band', () => {
    expect(block('\\.page-hero')).toMatch(/background:\s*#fff/)
    expect(block('\\.page-hero')).toMatch(/border-bottom:\s*1px solid var\(--line\)/)
    expect(block('\\.page-hero-inner h1')).toMatch(/font-size:\s*clamp\(2\.05rem/)
  })

  it('cards are flat bordered surfaces', () => {
    expect(block('\\.card')).toMatch(/border:\s*1px solid var\(--line\)/)
    expect(block('\\.card')).toMatch(/background:\s*#fff/)
    expect(block('\\.card')).not.toMatch(/box-shadow/)
  })

  it('the body logo is not boxed in a bordered card', () => {
    const logo = block('\\.about-logo')
    expect(logo).not.toMatch(/border:/)
    expect(logo).not.toMatch(/background:/)
    expect(logo).not.toMatch(/box-shadow:/)
  })

  it('the footer mark keeps its aspect ratio', () => {
    expect(block('\\.footer-brand img')).toMatch(/height:\s*44px/)
    expect(block('\\.footer-brand img')).toMatch(/width:\s*auto/)
  })
})

describe('forms and responsive behaviour are mobile-first safe', () => {
  it('fields fill their column and stack below 680px', () => {
    expect(block('\\.field input,\\s*\\n\\.field select,\\s*\\n\\.field textarea')).toMatch(/width:\s*100%/)
    expect(css).toMatch(/@media \(max-width:\s*680px\)[\s\S]*\.form-grid\s*\{\s*grid-template-columns:\s*1fr/)
  })

  it('the mobile menu replaces the desktop nav before the header can overflow', () => {
    // The nine nav links plus the CTA need ~1100px; collapsing at 1160 keeps
    // the CTA inside the gutter on small laptops and tablets.
    expect(css).toMatch(/@media \(max-width:\s*1160px\)[\s\S]*\.desk-nav,[\s\S]*?\.header-cta\s*\{\s*display:\s*none/)
    expect(css).toMatch(/@media \(max-width:\s*1160px\)[\s\S]*\.nav-toggle\s*\{\s*display:\s*grid/)
  })

  it('motion is opt-outable', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*transition:\s*none !important/)
  })
})

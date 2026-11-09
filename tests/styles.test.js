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
})

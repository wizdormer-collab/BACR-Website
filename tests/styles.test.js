import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const layout = readFileSync(path.join(ROOT, 'src/styles/layout.css'), 'utf8')
const components = readFileSync(path.join(ROOT, 'src/styles/components.css'), 'utf8')

describe('button colours are never overridden by context rules', () => {
  it('the band prose-link rule skips buttons', () => {
    // `.band a` (0,1,1) beats `.btn--solid-light` (0,1,0): the live CTA band
    // shipped a white-on-white "Book an Assessment" button because of it.
    expect(layout).toContain('.band a:not(.btn)')
    expect(layout).not.toMatch(/\.band a\s*\{/)
    expect(layout).not.toMatch(/\.band a:hover\s*\{/)
  })

  it('the solid-light button keeps a dark foreground on its light background', () => {
    expect(components).toMatch(/\.btn--solid-light\s*\{[^}]*color:\s*var\(--brand-navy\)/)
    expect(components).toMatch(/\.btn--solid-light\s*\{[^}]*background:\s*var\(--on-dark\)/)
  })
})

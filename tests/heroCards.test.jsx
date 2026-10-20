// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import Home from '../src/features/home/Home.jsx'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

function renderHome() {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => {
    root.render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    )
  })
  return {
    container,
    unmount: () => act(() => root.unmount()),
  }
}

function findCard(container, title) {
  return [...container.querySelectorAll('button.float-card')].find((button) =>
    button.textContent.includes(title)
  )
}

function pointer(type) {
  const event = new Event('pointerover', { bubbles: true })
  event.pointerType = type
  return event
}

const expanded = (card) => card.getAttribute('aria-expanded')

describe('hero info cards', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('opens on click and collapses itself after 5 seconds', () => {
    const { container, unmount } = renderHome()
    const card = findCard(container, 'Specialist-Led Care')

    expect(expanded(card)).toBe('false')

    act(() => {
      card.click()
    })
    expect(expanded(card)).toBe('true')

    act(() => {
      vi.advanceTimersByTime(4999)
    })
    expect(expanded(card)).toBe('true')

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(expanded(card)).toBe('false')

    unmount()
  })

  it('closes at once when tapped again before the timer', () => {
    const { container, unmount } = renderHome()
    const card = findCard(container, 'Evidence-Based')

    act(() => {
      card.click()
    })
    expect(expanded(card)).toBe('true')

    act(() => {
      vi.advanceTimersByTime(2000)
      card.click()
    })
    expect(expanded(card)).toBe('false')

    // the cancelled timer must not fire later
    act(() => {
      vi.advanceTimersByTime(10000)
    })
    expect(expanded(card)).toBe('false')

    unmount()
  })

  it('ignores the compatibility mouse events a touch tap emits', () => {
    const { container, unmount } = renderHome()
    const card = findCard(container, 'Personalised Plans')

    act(() => {
      card.dispatchEvent(pointer('touch'))
    })
    expect(expanded(card)).toBe('false')

    // a real mouse hover still peeks
    act(() => {
      card.dispatchEvent(pointer('mouse'))
    })
    expect(expanded(card)).toBe('true')

    // ...and that peek also self-collapses
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(expanded(card)).toBe('false')

    unmount()
  })
})

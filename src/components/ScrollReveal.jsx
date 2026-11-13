import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Sections below the fold fade up as they enter the viewport — the "where
// did that come from" effect. Two deliberate constraints:
//
// - The hidden state is added from JS only, after checking each section is
//   genuinely below the fold. The prerendered HTML therefore ships fully
//   visible: crawlers, no-JS readers and the route tests never see
//   opacity: 0, and anything already on screen at load renders instantly.
// - Without IntersectionObserver (jsdom, old browsers) nothing is hidden
//   at all — the page simply behaves as it did before.
//
// prefers-reduced-motion readers get opacity: 1 straight from global.css.
export default function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const sections = [...document.querySelectorAll('#main section')]
    const below = sections.filter((el) => el.getBoundingClientRect().top >= window.innerHeight)
    if (below.length === 0) return undefined

    below.forEach((el) => el.classList.add('reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('reveal-in')
          io.unobserve(entry.target)
        }
      },
      // Fire as soon as a sliver clears the viewport bottom (minus 60px, so
      // the section has visibly arrived rather than peeking).
      { rootMargin: '0px 0px -60px 0px', threshold: 0 },
    )
    below.forEach((el) => io.observe(el))

    return () => {
      io.disconnect()
      below.forEach((el) => el.classList.remove('reveal', 'reveal-in'))
    }
  }, [pathname])

  return null
}

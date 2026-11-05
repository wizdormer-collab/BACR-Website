import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Instant jump to top on navigation — no smooth-scroll animation, which is
// what produced the layout/motion churn on the old site.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''))
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

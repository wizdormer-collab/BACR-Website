import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// After a client-side navigation, move focus to <main> so keyboard and screen
// reader users land on the new page's content instead of being stranded on the
// header link they clicked. tabIndex={-1} (App.jsx) makes <main> focusable
// without adding it to the tab order; #main:focus { outline: none } keeps the
// programmatic move from drawing a ring, while :focus-visible keeps the ring
// for real keyboard use of the skip link.
//
// The first render is skipped — on initial load the browser's own focus
// behaviour (and the skip link) is correct, and stealing focus there would
// fight the user's browser. A ref holds the previous pathname rather than the
// effect relying on closure state, because this component is mounted outside
// the Suspense boundary and must not re-run — or skip — when a remount happens.
export default function RouteFocus() {
  const { pathname } = useLocation()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    const main = document.getElementById('main')
    main?.focus({ preventScroll: true })
  }, [pathname])

  return null
}

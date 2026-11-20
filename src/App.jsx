import { Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ScrollReveal from './components/ScrollReveal.jsx'
import RouteFocus from './components/RouteFocus.jsx'
import RoutePrefetch from './components/RoutePrefetch.jsx'
import { REDIRECTS } from './lib/pages.js'

// One Suspense boundary wraps every route so the server tree and the client
// tree render identically: ssr.jsx passes an eager table (pages.ssr.js) whose
// components are already imported, so renderToString never suspends and ships
// full HTML; main.jsx passes the lazy table (pages.js) so a phone downloads
// only the page it opens. A lazy client hydrating over eager server HTML keeps
// that HTML on screen until the chunk lands — verified error-free in jsdom.
//
// ScrollReveal lives *inside* the boundary, keyed by pathname: its effect
// measures #main's sections, which do not exist until a lazy chunk resolves,
// and must re-run after every client-side navigation.
export default function App({ routes }) {
  const { pathname } = useLocation()

  return (
    <div className="app">
      <ScrollToTop />
      <RouteFocus />
      <RoutePrefetch routes={routes} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className="page" tabIndex={-1}>
        <Suspense fallback={null}>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            {REDIRECTS.map(({ path, to }) => (
              <Route key={path} path={path} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ScrollReveal key={pathname} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

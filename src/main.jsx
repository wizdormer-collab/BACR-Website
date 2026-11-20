import React, { lazy } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { PAGE_ROUTES } from './lib/pages.js'
import './styles/global.css'

// Route-level code splitting: each page becomes its own chunk, so a phone
// downloads the home page first and fetches /about only when someone asks for
// it (RoutePrefetch warms the chunk on hover/focus, so the wait is usually
// already over before the click). React.lazy resolves these on demand inside
// App's single Suspense boundary; ssr.jsx passes an eager table instead,
// because renderToString cannot wait for a suspended boundary.
const CLIENT_ROUTES = PAGE_ROUTES.map(({ path, load }) => ({
  path,
  load,
  Component: lazy(load),
}))

// '/' in dev, '/BACR-Website/' in the build (see `base` in vite.config.js).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App routes={CLIENT_ROUTES} />
    </BrowserRouter>
  </React.StrictMode>
)

// Prerendered pages arrive with content already in #root — adopt it so the
// first paint survives (tools/prerender.mjs). An empty shell (dev, or a build
// that skipped prerendering) renders from scratch.
//
// A legacy #/route hash means index.html's forwarder has already scheduled a
// navigation: this document is about to be replaced, and booting the router
// here would hydrate one page's HTML against another page's URL (React #418).
if (/^#\//.test(location.hash)) {
  // intentionally idle — the forwarder navigates momentarily
} else if (container.firstChild) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}

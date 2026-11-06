import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'

// '/' in dev, '/BACR-Website/' in the build (see `base` in vite.config.js).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
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

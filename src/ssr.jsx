import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { takePendingTitle } from './lib/meta.js'
import { SITE_BASE_PATH } from './lib/site.config.js'

// The same call the route tests make, used for real by tools/prerender.mjs:
// render each route once on the server so dist ships full HTML instead of the
// empty #root shell Vite builds. The entry carries the deployed base path —
// that is what a browser actually requests, and it keeps every server-rendered
// <a href> (and React's hydration pass) in step with the client router.
export function render(path) {
  const entry = path === '/' ? `${SITE_BASE_PATH}/` : SITE_BASE_PATH + path
  const html = renderToString(
    <MemoryRouter basename={SITE_BASE_PATH} initialEntries={[entry]}>
      <App />
    </MemoryRouter>,
  )
  return { html, title: takePendingTitle() }
}

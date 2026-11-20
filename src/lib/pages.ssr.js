// The eager half of the route table. tools/prerender.mjs renders through
// renderToString, which aborts a Suspense boundary and emits a "switched to
// client rendering" marker instead of the page — and that prerendered markup
// is the site's entire no-JS, crawler and link-unfurler story. So the server
// imports every page statically while the client loads them lazily (App.jsx).
//
// The mapping is keyed off PAGE_ROUTES and throws in both directions, so the
// two tables cannot drift apart without the build failing loudly.
import Home from '../features/home/Home.jsx'
import About from '../features/about/About.jsx'
import HowItWorks from '../features/how-it-works/HowItWorks.jsx'
import Services from '../features/services/Services.jsx'
import Children from '../features/audiences/Children.jsx'
import Adults from '../features/audiences/Adults.jsx'
import Team from '../features/team/Team.jsx'
import Referrers from '../features/referrers/Referrers.jsx'
import Book from '../features/book/Book.jsx'
import Contact from '../features/contact/Contact.jsx'
import { PAGE_ROUTES } from './pages.js'

const COMPONENTS = {
  '/': Home,
  '/about': About,
  '/how-it-works': HowItWorks,
  '/services': Services,
  '/children': Children,
  '/adults': Adults,
  '/team': Team,
  '/referrers': Referrers,
  '/book': Book,
  '/contact': Contact,
}

for (const { path } of PAGE_ROUTES) {
  if (!COMPONENTS[path]) {
    throw new Error(`pages.ssr.js: no eager component registered for route "${path}"`)
  }
}
for (const path of Object.keys(COMPONENTS)) {
  if (!PAGE_ROUTES.some((route) => route.path === path)) {
    throw new Error(`pages.ssr.js: component for "${path}" is not in PAGE_ROUTES`)
  }
}

// Eager route table passed to App on the server: same shape as the client's
// lazy table, so both trees render inside one Suspense boundary.
export const SSR_ROUTES = PAGE_ROUTES.map((route) => ({
  path: route.path,
  Component: COMPONENTS[route.path],
}))

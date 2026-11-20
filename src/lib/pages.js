// Single source of truth for the public routes. Each entry pairs a path with a
// loader rather than a component: the client wraps the loader in React.lazy so
// a phone downloads only the page it opens (route-level code splitting, see
// App.jsx), while the prerender step renders the same pages eagerly from
// pages.ssr.js — renderToString cannot await a suspended boundary, so the
// server must never see these lazy wrappers. tools/prerender.mjs and the route
// tests both read the paths from here.
export const PAGE_ROUTES = [
  { path: '/', load: () => import('../features/home/Home.jsx') },
  { path: '/about', load: () => import('../features/about/About.jsx') },
  { path: '/how-it-works', load: () => import('../features/how-it-works/HowItWorks.jsx') },
  { path: '/services', load: () => import('../features/services/Services.jsx') },
  { path: '/children', load: () => import('../features/audiences/Children.jsx') },
  { path: '/adults', load: () => import('../features/audiences/Adults.jsx') },
  { path: '/team', load: () => import('../features/team/Team.jsx') },
  { path: '/referrers', load: () => import('../features/referrers/Referrers.jsx') },
  { path: '/book', load: () => import('../features/book/Book.jsx') },
  { path: '/contact', load: () => import('../features/contact/Contact.jsx') },
]

// Old URLs that must keep working: /who-we-help was a landing route and the
// first v2 release hash-routed every page (#/about), so the shell forwards
// those hashes before React boots (see index.html).
export const REDIRECTS = [{ path: '/who-we-help', to: '/children' }]

export const PAGE_PATHS = PAGE_ROUTES.map((route) => route.path)

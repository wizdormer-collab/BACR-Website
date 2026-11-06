// Single source of truth for the public routes. App builds its <Routes> from
// this list, tools/prerender.mjs emits one static HTML file per entry, and the
// route tests iterate it — add a page here and everything else follows.
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

export const PAGE_ROUTES = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/how-it-works', component: HowItWorks },
  { path: '/services', component: Services },
  { path: '/children', component: Children },
  { path: '/adults', component: Adults },
  { path: '/team', component: Team },
  { path: '/referrers', component: Referrers },
  { path: '/book', component: Book },
  { path: '/contact', component: Contact },
]

// Old URLs that must keep working: /who-we-help was a landing route and the
// first v2 release hash-routed every page (#/about), so the shell forwards
// those hashes before React boots (see index.html).
export const REDIRECTS = [{ path: '/who-we-help', to: '/children' }]

export const PAGE_PATHS = PAGE_ROUTES.map((route) => route.path)

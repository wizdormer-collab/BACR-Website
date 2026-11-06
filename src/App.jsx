import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { PAGE_ROUTES, REDIRECTS } from './lib/pages.js'

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main id="main" className="page">
        <Routes>
          {PAGE_ROUTES.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {REDIRECTS.map(({ path, to }) => (
            <Route key={path} path={path} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

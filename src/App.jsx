import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './features/home/Home.jsx'
import About from './features/about/About.jsx'
import HowItWorks from './features/how-it-works/HowItWorks.jsx'
import Services from './features/services/Services.jsx'
import Children from './features/audiences/Children.jsx'
import Adults from './features/audiences/Adults.jsx'
import Team from './features/team/Team.jsx'
import Referrers from './features/referrers/Referrers.jsx'
import Book from './features/book/Book.jsx'
import Contact from './features/contact/Contact.jsx'

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/services" element={<Services />} />
          <Route path="/children" element={<Children />} />
          <Route path="/adults" element={<Adults />} />
          <Route path="/team" element={<Team />} />
          <Route path="/referrers" element={<Referrers />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          {/* Pre-restructure URL kept working */}
          <Route path="/who-we-help" element={<Navigate to="/children" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

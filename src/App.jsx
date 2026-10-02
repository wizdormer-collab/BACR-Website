import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './features/home/Home.jsx'
import About from './features/about/About.jsx'
import Services from './features/services/Services.jsx'
import WhoWeHelp from './features/who-we-help/WhoWeHelp.jsx'
import Team from './features/team/Team.jsx'
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
          <Route path="/services" element={<Services />} />
          <Route path="/who-we-help" element={<WhoWeHelp />} />
          <Route path="/team" element={<Team />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

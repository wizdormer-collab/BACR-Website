import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { nav, brand } from '../data/site.js'
import mark from '../assets/bacr-mark.png'

export default function Header() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={close}>
          <img src={mark} alt={`${brand.short} logo`} className="brand-mark" />
          <span className="brand-text">
            <strong>{brand.short}</strong>
            <small>{brand.name}</small>
          </span>
        </Link>

        <button
          type="button"
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? 'open' : ''}`}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={close}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/book" className="btn btn-primary header-cta" onClick={close}>
            Book Appointment
          </Link>
        </nav>
      </div>
    </header>
  )
}

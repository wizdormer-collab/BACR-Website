import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { brand, nav } from '../data/site.js'
import mark from '../assets/bacr-mark.svg'

// Original site header: white sticky bar, small mark + BACR, and the menu
// always collapsed behind the hamburger card at every screen size.
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const panelId = useId()
  const navRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // The old header gains a soft shadow once the page leaves the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    // Tapping the page behind the menu card closes it, like the old header.
    const onPointerDown = (e) => {
      if (navRef.current?.contains(e.target) || toggleRef.current?.contains(e.target)) return
      setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`.trim()}>
      <div className="header-inner">
        <Link to="/" className="brand" aria-label={`${brand.short} — home`}>
          <img className="brand-mark" src={mark} alt="" width="40" height="40" />
          <span className="brand-text">
            <strong>{brand.short}</strong>
            <small>{brand.name}</small>
          </span>
        </Link>

        <button
          type="button"
          ref={toggleRef}
          className={`nav-toggle ${open ? 'open' : ''}`.trim()}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id={panelId} ref={navRef} className={`nav ${open ? 'open' : ''}`.trim()} aria-label="Main">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/book" className="btn btn-primary header-cta" onClick={() => setOpen(false)}>
            Book an Assessment
          </Link>
        </nav>
      </div>
    </header>
  )
}

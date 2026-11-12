import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { brand, nav } from '../data/site.js'
import mark from '../assets/bacr-mark.svg'

const [CENTRE, SUFFIX] = brand.name.split(' for ')

// Calm Clinic header: logo + wordmark, a full desktop nav, and a compact
// dropdown below 1160px. The mobile panel closes on route change, outside
// press, Escape and link click.
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const panelId = useId()
  const panelRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
    const onPointerDown = (e) => {
      if (panelRef.current?.contains(e.target) || toggleRef.current?.contains(e.target)) return
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
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={`${brand.short} — home`}>
          <img
            className="brand-mark"
            src={mark}
            alt=""
            width="40"
            height="40"
            fetchPriority="high"
          />
          <span className="brand-text">
            <strong className="brand-name">{CENTRE}</strong>
            <span className="brand-sub">for {SUFFIX}</span>
          </span>
        </Link>

        <nav className="desk-nav" aria-label="Main">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `desk-link ${isActive ? 'active' : ''}`.trim()}
            >
              {item.short || item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/book" className="btn btn-primary btn-sm header-cta">
          Book an Assessment
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

        {open ? (
          <nav id={panelId} ref={panelRef} className="mnav-panel" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `mnav-link ${isActive ? 'active' : ''}`.trim()}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/book" className="btn btn-primary mnav-book" onClick={() => setOpen(false)}>
              Book an Assessment
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  )
}

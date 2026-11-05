import { useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { brand, nav } from '../data/site.js'
import mark from '../assets/bacr-mark.svg'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const panelId = useId()

  // Static disclosure: opens/closes on click only. No hover states, no timers,
  // no auto-collapse — the source of the old site's last six bug-fix commits.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label={`${brand.short} — home`}>
          <img className="brand__mark" src={mark} alt="" width="34" height="34" />
          <span className="brand__text">
            <strong className="brand__short">{brand.short}</strong>
            <span className="brand__name">{brand.name}</span>
          </span>
        </Link>

        <nav className="site-nav site-nav--desktop" aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-toggle__label">{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {open && (
        <nav id={panelId} className="site-nav site-nav--panel" aria-label="Main">
          <ul className="container">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

import { Link } from 'react-router-dom'
import { brand, nav, footer } from '../data/site.js'
import logo from '../assets/bacr-logo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src={logo} alt={`${brand.short} logo`} />
              <span>
                <strong>
                  {brand.short} - {brand.name}
                </strong>
                <span>{brand.ecosystem}</span>
              </span>
            </div>
            <p>{brand.location}</p>
            <p className="mb-0">&ldquo;{brand.tagline}&rdquo;</p>
          </div>

          <div>
            <h4>{footer.quickLinksLabel}</h4>
            <ul className="footer-links">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{footer.ecosystemLabel}</h4>
            <ul className="footer-links">
              {footer.ecosystemLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{footer.socialsLabel}</h4>
            <ul className="footer-links">
              {footer.socials.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {footer.copyright.split(' ')[0]} {brand.short}. All rights reserved.
          </span>
          <span className="tagline">&ldquo;{brand.tagline}&rdquo;</span>
          <span className="footer-legal">
            {footer.legal.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}

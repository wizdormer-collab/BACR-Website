import { Link } from 'react-router-dom'
import { brand, nav, footer } from '../data/site.js'
import whiteLogo from '../assets/bacr-logo-white.webp'

// Original near-black footer: big white logo, name + tagline, address,
// quick links. No social/legal columns — those were dead placeholders.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <img
                src={whiteLogo}
                alt={`${brand.short} logo`}
                width={320}
                height={255}
                loading="lazy"
                decoding="async"
              />
              <div className="footer-brand-text">
                <strong>{brand.name}</strong>
                <span>{brand.location}</span>
                <span>{brand.tagline}</span>
              </div>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}

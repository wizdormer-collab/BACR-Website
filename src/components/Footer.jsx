import { Link } from 'react-router-dom'
import { brand, nav, contact, footer } from '../data/site.js'
import mark from '../assets/bacr-mark.svg'

// Calm Clinic footer: white surface, logo and centre details, then the nine
// PRD links split across two columns. No social or legal placeholders.
export default function Footer() {
  const half = Math.ceil(nav.length / 2)

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand" aria-label={`${brand.short} — home`}>
            <img
              src={mark}
              alt={`${brand.short} logo`}
              width="44"
              height="44"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <div className="footer-brand-text">
            <strong>{brand.name}</strong>
            <span>{brand.location}</span>
            <span>{brand.tagline}</span>
          </div>
          <p className="footer-hold">{contact.holdingNote}</p>
        </div>

        <div className="footer-links-col">
          {/* h2, not h4: the footer follows the page's h2/h3 headings and a
              level skip there is exactly what Lighthouse's heading-order audit
              flags. */}
          <h2>Explore</h2>
          <ul className="footer-links">
            {nav.slice(0, half).map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links-col">
          <h2>More</h2>
          <ul className="footer-links">
            {nav.slice(half).map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/book">Book an Assessment</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>{footer.copyright}</span>
        <span>Preview photography: Pexels. Not BACR staff or patients.</span>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import { brand, nav, footer } from '../data/site.js'
import mark from '../assets/bacr-mark.svg'

export default function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <img className="site-footer__mark" src={mark} alt="" width="44" height="44" />
          <div>
            <p className="site-footer__name">{brand.name}</p>
            <p className="site-footer__tagline">{brand.tagline}</p>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container site-footer__bottom">
        <p>{footer.copyright}</p>
      </div>
    </footer>
  )
}

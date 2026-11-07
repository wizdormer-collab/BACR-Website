import { Link } from 'react-router-dom'
import { journey } from '../data/site.js'

// "Start Your Journey" closing band — the original site's gradient callout
// card, sitting at the end of most pages.
export default function CtaBand() {
  return (
    <section className="section section-cta">
      <div className="container">
        <div className="callout">
          <div>
            <span className="kicker">{journey.kicker}</span>
            <h2>{journey.headline}</h2>
            <p>{journey.text}</p>
          </div>
          <div className="callout-actions">
            <Link to={journey.primary.to} className="btn btn-light">
              {journey.primary.label}
            </Link>
            <Link to={journey.secondary.to} className="btn btn-ghost-light">
              {journey.secondary.label}
            </Link>
            <Link to={journey.tertiary.to} className="btn btn-ghost-light">
              {journey.tertiary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

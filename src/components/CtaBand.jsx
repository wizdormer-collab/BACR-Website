import { Link } from 'react-router-dom'
import { journey } from '../data/site.js'

// Full-width navy closing band — the Calm Clinic version of "Start Your
// Journey". Green primary action, two quiet secondary actions.
export default function CtaBand() {
  return (
    <section className="cta" id="start-your-journey">
      <div className="container cta-inner">
        <div className="cta-copy">
          <span className="kicker">{journey.kicker}</span>
          <h2>{journey.headline}</h2>
          <p>{journey.text}</p>
        </div>
        <div className="cta-actions">
          <Link to={journey.primary.to} className="btn btn-green">
            {journey.primary.label}
          </Link>
          <Link to={journey.secondary.to} className="btn btn-ghost">
            {journey.secondary.label}
          </Link>
          <Link to={journey.tertiary.to} className="btn btn-ghost">
            {journey.tertiary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}

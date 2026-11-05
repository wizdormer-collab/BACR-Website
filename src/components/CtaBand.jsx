import { Link } from 'react-router-dom'
import { journey } from '../data/site.js'

// "Start Your Journey" closing band — appears at the end of most pages,
// so it lives as one component rather than being copied per feature.
export default function CtaBand() {
  return (
    <section className="section band on-dark">
      <div className="container section-head section-head--center">
        <p className="kicker">{journey.kicker}</p>
        <h2>{journey.headline}</h2>
        <p className="lead">{journey.text}</p>
        <div className="btn-row btn-row--center">
          <Link className="btn btn--solid-light" to={journey.primary.to}>
            {journey.primary.label}
          </Link>
          <Link className="btn btn--on-dark" to={journey.secondary.to}>
            {journey.secondary.label}
          </Link>
          <Link className="btn btn--on-dark" to={journey.tertiary.to}>
            {journey.tertiary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}

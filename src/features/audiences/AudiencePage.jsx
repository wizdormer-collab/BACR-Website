import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import usePageTitle from '../../lib/usePageTitle.js'
import { journey } from '../../data/site.js'

// Shared by /children and /adults — the PRD structures both identically:
// kicker, headline, paragraphs, a "we support…"/"we can support…" list, CTA.
//
// Note the PRD's [Explore … Rehabilitation] button: on the audience page itself
// it would either link back to the page you're on or carry a label that doesn't
// match its destination, so the page closes on the journey CTA instead.
export default function AudiencePage({ data, title }) {
  usePageTitle(title)

  return (
    <>
      <PageHero kicker={data.kicker} title={data.headline} lead={data.paragraphs[0]} />

      <section className="section">
        <div className="container split split--sticky">
          <div className="stack">
            {data.paragraphs.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              <Link className="btn btn--primary" to={journey.primary.to}>
                {journey.primary.label}
              </Link>
            </p>
          </div>

          <div>
            <p className="list-label">{data.listLabel}</p>
            <ul className="checklist checklist--columns">
              {data.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

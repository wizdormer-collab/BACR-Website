import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import { team, multidisciplinary } from '../../data/site.js'

export default function Team() {
  return (
    <>
      <PageHero kicker={team.kicker} title={team.headline} lead={team.intro} />

      <section className="section">
        <div className="container split split--sticky">
          <div>
            <p className="kicker">Multidisciplinary care</p>
            <h2>{multidisciplinary.headline}</h2>
            <div className="stack">
              {multidisciplinary.paragraphs.slice(0, 2).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p style={{ marginTop: 'var(--s-5)' }}>
              <Link className="link-arrow" to="/services">
                How our services fit together
              </Link>
            </p>
          </div>

          <div>
            <p className="list-label">{team.listLabel}</p>
            <ul className="discipline-list discipline-list--light">
              {team.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            {/* The PRD's [Meet Our Team] has no destination: there are no
                profiles in the content. Shipping a button labelled "Meet our
                team" that lands on /contact would be a lie, so it's omitted
                until profiles exist. */}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import { about, approach, families } from '../../data/site.js'

export default function About() {
  return (
    <>
      <PageHero
        kicker={about.kicker}
        title={about.headline}
        lead={about.paragraphs[0]}
      />

      <section className="section">
        <div className="container split split--sticky">
          <div>
            <div className="stack">
              {about.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="goal-label">{about.goalLabel}</p>
            <p className="goal">{about.goal}</p>
          </div>

          <div>
            <p className="kicker">{approach.kicker}</p>
            <h2>{approach.headline}</h2>
            <div className="stack">
              {approach.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <ol className="principles">
              {approach.principles.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--ruled">
        <div className="container split split--even">
          <div>
            <p className="kicker">{families.kicker}</p>
            <h2>{families.headline}</h2>
          </div>
          <div className="stack">
            {families.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="checklist">
              {families.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="pullquote pullquote--marked">{families.closing}</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

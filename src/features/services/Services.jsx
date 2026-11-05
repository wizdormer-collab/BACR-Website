import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import { services, multidisciplinary } from '../../data/site.js'

export default function Services() {
  return (
    <>
      <PageHero kicker={services.kicker} title={services.headline} />

      <section className="section">
        <div className="container">
          {services.items.map((s, i) => (
            <article className="service-detail" key={s.slug} id={s.slug}>
              <div className="split split--even">
                <div>
                  <span className="service-detail__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>

                <div>
                  {s.listLabel && <p className="list-label">{s.listLabel}</p>}
                  {s.bullets.length > 0 && (
                    <ul className="checklist checklist--columns">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {s.note && <p className="service-detail__note">{s.note}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Multidisciplinary care */}
      <section className="section band on-dark">
        <div className="container split split--even">
          <div>
            <p className="kicker">{multidisciplinary.kicker}</p>
            <h2>{multidisciplinary.headline}</h2>
          </div>

          <div className="stack">
            {multidisciplinary.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <ul className="discipline-list">
              {multidisciplinary.disciplines.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            <p className="small">{multidisciplinary.note}</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

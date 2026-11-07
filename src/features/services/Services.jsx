import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import { services, multidisciplinary } from '../../data/site.js'

export default function Services() {
  return (
    <>
      <PageHero variant="light" kicker={services.kicker} title={services.headline} />

      <section className="section">
        <div className="container">
          <div className="grid grid-auto">
            {services.items.map((service) => (
              <article key={service.slug} className="card" id={service.slug}>
                <div className="icon-tile">
                  <Icon name={service.icon} size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                {service.listLabel ? <p className="card-sublabel">{service.listLabel}</p> : null}
                {service.bullets.length > 0 ? (
                  <ul className="list-check list-check-sm">
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {service.note ? <p className="text-muted card-note">{service.note}</p> : null}
                <Link to="/book" className="card-link">
                  Book an Assessment &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="kicker">{multidisciplinary.kicker}</span>
            <h2>{multidisciplinary.headline}</h2>
            {multidisciplinary.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>

          <div className="center">
            <div className="chip-grid">
              {multidisciplinary.disciplines.map((discipline) => (
                <span className="chip" key={discipline}>
                  {discipline}
                </span>
              ))}
            </div>
          </div>

          <p className="center" style={{ marginTop: 30, marginBottom: 0 }}>
            <strong>{multidisciplinary.note}</strong>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

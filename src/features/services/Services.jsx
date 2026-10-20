import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import { services, multidisciplinary, journey } from '../../data/site.js'

export default function Services() {
  usePageTitle('Rehabilitation')

  return (
    <>
      <PageHero
        variant="light"
        kicker={services.kicker}
        title={services.headline}
        subtitle={services.intro}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-auto">
            {services.items.map((service, i) => (
              <Reveal
                key={service.slug}
                delay={i * 70}
                className="card"
                id={service.slug}
              >
                <div className="icon-tile">
                  <Icon name={service.icon} size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                {service.listLabel ? (
                  <p className="card-sublabel">{service.listLabel}</p>
                ) : null}
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="kicker">{multidisciplinary.kicker}</span>
            <h2>{multidisciplinary.headline}</h2>
            {multidisciplinary.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </Reveal>

          <Reveal delay={80} className="center">
            <div className="chip-grid">
              {multidisciplinary.disciplines.map((discipline) => (
                <span className="chip" key={discipline}>
                  {discipline}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-muted" style={{ marginTop: 30, maxWidth: 780 }}>
              {multidisciplinary.example}
            </p>
            <p className="mb-0" style={{ maxWidth: 780 }}>
              <strong>{multidisciplinary.note}</strong>
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={journey.headline}
        text={journey.text}
        primary={journey.primary}
        secondary={journey.secondary}
      />
    </>
  )
}

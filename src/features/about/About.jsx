import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import Reveal from '../../components/Reveal.jsx'
import logo from '../../assets/bacr-logo.png'
import { about, approach, families, hero, journey } from '../../data/site.js'

export default function About() {
  usePageTitle('About BACR')

  return (
    <>
      <PageHero variant="light" kicker={about.kicker} title={about.headline} />

      <section className="section section-alt">
        <div className="container">
          <div className="split">
            <Reveal>
              <img src={logo} alt="BACR logo" className="about-logo" />
              <div className="section-head">
                <span className="kicker">Who We Are</span>
              </div>
              {about.paragraphs.map((text) => (
                <p key={text.slice(0, 24)} className="text-muted">
                  {text}
                </p>
              ))}
              <blockquote className="quote">
                <strong>{about.goalLabel}</strong>
                <br />
                {about.goal}
              </blockquote>
            </Reveal>

            <Reveal delay={120}>
              <div className="section-head">
                <span className="kicker">{approach.kicker}</span>
                <h2>{approach.headline}</h2>
                <p>{approach.paragraphs[0]}</p>
                <p>{approach.paragraphs[3]}</p>
                <p>{approach.paragraphs[4]}</p>
              </div>
              <div className="feature-list">
                {approach.principles.map((item) => (
                  <div key={item.title} className="feature">
                    <span className="feature-dot" />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="section-head">
                <span className="kicker">{families.kicker}</span>
                <h2>{families.headline}</h2>
              </div>
              {families.paragraphs.map((text) => (
                <p key={text.slice(0, 24)} className="text-muted">
                  {text}
                </p>
              ))}
              <p className="text-muted mb-0">{families.closing}</p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="list-check">
                {families.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="callout">
            <div>
              <h2>{about.ecosystem.title}</h2>
              <p>{about.ecosystem.text}</p>
            </div>
            <div className="callout-actions">
              <span className="pill-note">{hero.trust[3]}</span>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={journey.headline}
        text={journey.text}
        primary={journey.primary}
        secondary={journey.tertiary}
      />
    </>
  )
}

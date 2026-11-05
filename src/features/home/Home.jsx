import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import CtaBand from '../../components/CtaBand.jsx'
import mark from '../../assets/bacr-mark.svg'
import {
  hero,
  doneDifferently,
  services,
  howItWorks,
  children,
  adults,
  careCoordinator,
} from '../../data/site.js'

export default function Home() {
  usePageTitle('')

  return (
    <>
      {/* ---------------------------------------------------- Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="kicker">{hero.eyebrow}</p>
            <h1 className="hero__title">{hero.headline}</h1>

            <div className="hero__lede">
              {hero.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <p className="hero__note">{hero.note}</p>

            <div className="btn-row">
              <Link className="btn btn--primary" to={hero.primaryCta.to}>
                {hero.primaryCta.label}
              </Link>
              <Link className="btn btn--secondary" to={hero.secondaryCta.to}>
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="hero__art" aria-hidden="true">
            <img src={mark} alt="" />
          </div>
        </div>

        <div className="container">
          <ul className="trust">
            {hero.trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------- Rehabilitation, done differently */}
      <section className="section">
        <div className="container split split--even">
          <div>
            <p className="kicker">{doneDifferently.kicker}</p>
            <h2>{doneDifferently.headline}</h2>
          </div>
          <div className="stack">
            {doneDifferently.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="pullquote pullquote--marked">{doneDifferently.pullQuote}</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Rehabilitation */}
      <section className="section section--ruled">
        <div className="container">
          <div className="section-head">
            <p className="kicker">{services.kicker}</p>
            <h2>{services.headline}</h2>
          </div>

          <ol className="service-list">
            {services.items.map((s) => (
              <li key={s.slug} className="service-list__item">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <Link className="link-arrow" to="/services">
                  Learn more
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------- How BACR works */}
      <section className="section section--ruled">
        <div className="container split split--sticky">
          <div>
            <p className="kicker">{howItWorks.kicker}</p>
            <h2>{howItWorks.headline}</h2>
            <p className="lead">{howItWorks.intro}</p>
            <p style={{ marginTop: 'var(--s-5)' }}>
              <Link className="link-arrow" to="/how-it-works">
                How the process works
              </Link>
            </p>
          </div>

          <ol className="numbered">
            {howItWorks.steps.map((step) => (
              <li key={step.title}>
                <div>
                  <h3 className="numbered__title">{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------- Children / Adults */}
      <section className="section section--ruled">
        <div className="container">
          <div className="grid grid--2">
            <article className="audience">
              <p className="kicker">{children.kicker}</p>
              <h2>{children.headline}</h2>
              <p className="lead">{children.paragraphs[0]}</p>
              <p>{children.listLabel}</p>
              <ul className="checklist checklist--columns">
                {children.items.slice(0, 6).map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p style={{ marginTop: 'var(--s-5)' }}>
                <Link className="link-arrow" to={children.exploreCta.to}>
                  {children.exploreCta.label}
                </Link>
              </p>
            </article>

            <article className="audience">
              <p className="kicker">{adults.kicker}</p>
              <h2>{adults.headline}</h2>
              <p className="lead">{adults.paragraphs[0]}</p>
              <p>{adults.listLabel}</p>
              <ul className="checklist checklist--columns">
                {adults.items.slice(0, 6).map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p style={{ marginTop: 'var(--s-5)' }}>
                <Link className="link-arrow" to={adults.exploreCta.to}>
                  {adults.exploreCta.label}
                </Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Care coordinator */}
      <section className="section section--ruled">
        <div className="container split split--sticky">
          <div>
            <p className="kicker">{careCoordinator.kicker}</p>
            <h2>{careCoordinator.headline}</h2>
            <div className="stack">
              {careCoordinator.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="small muted">{careCoordinator.note}</p>
          </div>

          <div>
            <p className="list-label">{careCoordinator.listLabel}</p>
            <ul className="checklist">
              {careCoordinator.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <blockquote className="pullquote pullquote--marked">
              {careCoordinator.quote}
            </blockquote>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Start your journey */}
      <CtaBand />
    </>
  )
}

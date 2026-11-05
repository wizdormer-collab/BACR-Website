import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import {
  howItWorks,
  careCoordinator,
  rehabPlan,
  measuring,
  safety,
} from '../../data/site.js'

export default function HowItWorks() {
  return (
    <>
      <PageHero
        kicker={howItWorks.kicker}
        title={howItWorks.headline}
        lead={howItWorks.intro}
      />

      {/* 5-step process */}
      <section className="section">
        <div className="container">
          <ol className="numbered numbered--wide">
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

      {/* Clinical Case Coordination */}
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

      {/* Rehabilitation plan */}
      <section className="section section--ruled">
        <div className="container split split--even">
          <div>
            <p className="kicker">{rehabPlan.kicker}</p>
            <h2>{rehabPlan.headline}</h2>
            <p className="lead">{rehabPlan.intro}</p>
            <p className="pullquote pullquote--marked">{rehabPlan.closing}</p>
          </div>
          <div>
            <p className="list-label">{rehabPlan.listLabel}</p>
            <ul className="checklist checklist--columns">
              {rehabPlan.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Measuring progress */}
      <section className="section section--ruled">
        <div className="container split split--even">
          <div>
            <p className="kicker">{measuring.kicker}</p>
            <h2>{measuring.headline}</h2>
            <div className="stack">
              {measuring.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="small muted">{measuring.closing}</p>
          </div>
          <div>
            <ul className="checklist checklist--columns">
              {measuring.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Safety first — dark band, it's the section the PRD wants emphasised */}
      <section className="section band on-dark">
        <div className="container split split--even">
          <div>
            <p className="kicker">{safety.kicker}</p>
            <h2>{safety.headline}</h2>
          </div>
          <div className="stack">
            {safety.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="pullquote pullquote--marked on-dark">{safety.closing}</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

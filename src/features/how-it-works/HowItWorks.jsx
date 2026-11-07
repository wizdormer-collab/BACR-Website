import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import {
  howItWorks,
  careCoordinator,
  rehabPlan,
  measuring,
  safety,
} from '../../data/site.js'

function splitList(items) {
  const mid = Math.ceil(items.length / 2)
  return [items.slice(0, mid), items.slice(mid)]
}

function TwoColumnList({ items }) {
  const [left, right] = splitList(items)
  return (
    <div className="grid grid-2">
      <ul className="list-check">
        {left.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul className="list-check">
        {right.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <>
      <PageHero
        variant="light"
        kicker={howItWorks.kicker}
        title={howItWorks.headline}
        subtitle={howItWorks.intro}
      />

      <section className="section">
        <div className="container">
          <div className="timeline timeline-5">
            {howItWorks.steps.map((step) => (
              <div key={step.title} className="tl-item">
                <span className="tl-num" aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{careCoordinator.kicker}</span>
            <h2>{careCoordinator.headline}</h2>
            {careCoordinator.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>

          <span className="kicker">{careCoordinator.listLabel}</span>
          <TwoColumnList items={careCoordinator.items} />
          <p className="text-muted" style={{ marginTop: 26, marginBottom: 8 }}>
            {careCoordinator.note}
          </p>
          <blockquote className="quote mb-0">{careCoordinator.quote}</blockquote>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{rehabPlan.kicker}</span>
            <h2>{rehabPlan.headline}</h2>
            <p>{rehabPlan.intro}</p>
          </div>

          <span className="kicker">{rehabPlan.listLabel}</span>
          <TwoColumnList items={rehabPlan.items} />
          <p className="center text-muted" style={{ marginTop: 26 }}>
            <strong>{rehabPlan.closing}</strong>
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{measuring.kicker}</span>
            <h2>{measuring.headline}</h2>
            {measuring.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>

          <TwoColumnList items={measuring.items} />
          <p className="center text-muted" style={{ marginTop: 26 }}>
            <strong>{measuring.closing}</strong>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{safety.kicker}</span>
            <h2>{safety.headline}</h2>
            {safety.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="text-muted">
                {text}
              </p>
            ))}
          </div>
          <p className="center">
            <span className="pill-note">{safety.closing}</span>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

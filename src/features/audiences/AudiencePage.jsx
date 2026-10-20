import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import Reveal from '../../components/Reveal.jsx'
import { journey } from '../../data/site.js'

function splitList(items) {
  const mid = Math.ceil(items.length / 2)
  return [items.slice(0, mid), items.slice(mid)]
}

export default function AudiencePage({ data, pageTitle }) {
  usePageTitle(pageTitle)

  const [left, right] = splitList(data.items)
  const bodyParagraphs = data.paragraphs.slice(1)

  return (
    <>
      <PageHero
        variant="light"
        kicker={data.kicker}
        title={data.headline}
        subtitle={data.paragraphs[0]}
      />

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            {bodyParagraphs.map((text) => (
              <p key={text.slice(0, 24)} className="text-muted">
                {text}
              </p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <p className="kicker">{data.listLabel}</p>
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
          </Reveal>
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

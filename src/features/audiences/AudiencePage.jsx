import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'

function splitList(items) {
  const mid = Math.ceil(items.length / 2)
  return [items.slice(0, mid), items.slice(mid)]
}

export default function AudiencePage({ data }) {
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
          <div className="section-head">
            {bodyParagraphs.map((text) => (
              <p key={text.slice(0, 24)} className="text-muted">
                {text}
              </p>
            ))}
          </div>

          <span className="kicker">{data.listLabel}</span>
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
        </div>
      </section>

      <CtaBand />
    </>
  )
}

import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import { audiences, whyChoose, howItWorks } from '../../data/site.js'

export default function WhoWeHelp() {
  usePageTitle('Who We Help')

  return (
    <>
      <PageHero
        kicker="Who We Help"
        title={audiences.headline}
        subtitle="Care tailored to children, adults and the elderly - at every stage of the recovery journey."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {audiences.items.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="kicker">Your Journey With Us</span>
            <h2>{howItWorks.headline}</h2>
          </div>
          <div className="steps grid grid-2">
            {howItWorks.steps.map((step) => (
              <div key={step.title} className="step">
                <span className="step-num" aria-hidden="true" />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="kicker">Why Choose BACR</span>
            <h2>{whyChoose.headline}</h2>
          </div>
          <div className="grid grid-2">
            <ul className="list-check">
              {whyChoose.points
                .slice(0, Math.ceil(whyChoose.points.length / 2))
                .map((point) => (
                  <li key={point}>{point}</li>
                ))}
            </ul>
            <ul className="list-check">
              {whyChoose.points.slice(Math.ceil(whyChoose.points.length / 2)).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title="Care for every journey"
        text="If you are not sure where to start, book a consultation and we will guide you."
        primary={{ label: 'Book Appointment', to: '/book' }}
        secondary={{ label: 'Our services', to: '/services' }}
      />
    </>
  )
}

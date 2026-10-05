import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import mark from '../../assets/bacr-mark.png'
import { audiences, whyChoose, howItWorks } from '../../data/site.js'

const ICONS = ['smile', 'user', 'heart', 'waves']

export default function WhoWeHelp() {
  usePageTitle('Who We Help')

  return (
    <>
      <PageHero
        variant="light"
        kicker="Who We Help"
        title={audiences.headline}
        subtitle="Care tailored to children, adults and the elderly - at every stage of the recovery journey."
      />

      <section className="section">
        <div className="container">
          <div className="split-rows">
            {audiences.items.map((item, i) => (
              <Reveal key={item.title} className="split-row">
                <div className={`sr-art tone-${i + 1}`}>
                  <span className="sr-icon">
                    <Icon name={ICONS[i]} size={64} strokeWidth={1.4} />
                  </span>
                  <img src={mark} alt="" className="sr-watermark" />
                </div>
                <div className="sr-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="kicker">Your Journey With Us</span>
            <h2>{howItWorks.headline}</h2>
          </Reveal>

          <Reveal className="timeline">
            {howItWorks.steps.map((step) => (
              <div key={step.title} className="tl-item">
                <span className="tl-num" aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <Reveal className="section-head center">
            <span className="kicker">Why Choose BACR</span>
            <h2>{whyChoose.headline}</h2>
          </Reveal>

          <Reveal className="grid grid-2" delay={100}>
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
          </Reveal>
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

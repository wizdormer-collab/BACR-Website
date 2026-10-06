import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import logo from '../../assets/bacr-logo.png'
import { about, hero } from '../../data/site.js'

export default function About() {
  usePageTitle('About BACR')

  const splitAt = about.headline.indexOf('. ')
  const hasLines = splitAt > -1
  const line1 = hasLines ? about.headline.slice(0, splitAt + 1) : about.headline
  const line2 = hasLines ? about.headline.slice(splitAt + 2) : ''
  const title = hasLines ? (
    <>
      {line1}
      <br />
      {line2}
    </>
  ) : (
    about.headline
  )

  return (
    <>
      <PageHero variant="light" kicker="About BACR" title={title} />

      <section className="section section-alt">
        <div className="container">
          <div className="split">
            <div>
              <img src={logo} alt="BACR logo" className="about-logo" />
              <div className="section-head">
                <span className="kicker">Who We Are</span>
              </div>
              {about.paragraphs.map((text) => (
                <p key={text.slice(0, 24)} className="text-muted">
                  {text}
                </p>
              ))}
              <blockquote className="quote">{about.pullQuote}</blockquote>
            </div>

            <div>
              <div className="section-head">
                <span className="kicker">Core Principles</span>
                <h2>How We Work</h2>
              </div>
              <div className="feature-list">
                {about.principles.map((item) => (
                  <div key={item.title} className="feature">
                    <span className="feature-dot" />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
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
        title="Ready to take the first step?"
        text="Speak to our team about the right therapy pathway for you or your loved one."
        primary={{ label: 'Book Appointment', to: '/book' }}
        secondary={{ label: 'Contact us', to: '/contact' }}
      />
    </>
  )
}

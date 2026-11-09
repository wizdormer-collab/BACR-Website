import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import logo from '../../assets/bacr-logo.webp'
import { about, approach, families } from '../../data/site.js'

export default function About() {
  return (
    <>
      <PageHero variant="light" kicker={about.kicker} title={about.headline} />

      <section className="section section-alt">
        <div className="container">
          <div className="split">
            <div>
              <img src={logo} alt="BACR logo" className="about-logo" width={480} height={382} />
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
            </div>

            <div>
              <div className="section-head">
                <span className="kicker">{approach.kicker}</span>
                <h2>{approach.headline}</h2>
                {approach.paragraphs.map((text) => (
                  <p key={text.slice(0, 24)}>{text}</p>
                ))}
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
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
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
            </div>

            <div>
              <ul className="list-check">
                {families.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-outline" style={{ marginTop: 26 }}>
                Contact BACR
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

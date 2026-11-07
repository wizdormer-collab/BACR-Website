import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import { referrers } from '../../data/site.js'
import { contactConfig, isPlaceholder } from '../../lib/site.config.js'

export default function Referrers() {
  const referralLinkReady = Boolean(contactConfig.referralFormUrl)
  const emailReady = !isPlaceholder(contactConfig.referralEmail)
  const phoneReady = !isPlaceholder(contactConfig.referralPhone)

  return (
    <>
      <PageHero
        variant="light"
        kicker={referrers.kicker}
        title={referrers.headline}
        subtitle={referrers.paragraphs[0]}
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            {referrers.paragraphs.slice(1).map((text) => (
              <p key={text.slice(0, 24)} className="text-muted">
                {text}
              </p>
            ))}
          </div>

          <div className="section-head">
            <span className="kicker">Referrals</span>
            <h2>{referrers.headline2}</h2>
            <p>{referrers.text}</p>
          </div>

          <div className="grid grid-3">
            <div className="card center">
              <h3>Referral Form</h3>
              {referralLinkReady ? (
                <a className="card-link" href={contactConfig.referralFormUrl}>
                  Download the form &rarr;
                </a>
              ) : (
                <p className="text-muted">
                  Available on request — contact our clinical team and we will send it across.
                </p>
              )}
            </div>

            <div className="card center">
              <h3>Email</h3>
              {emailReady ? (
                <p className="text-muted">{contactConfig.referralEmail}</p>
              ) : (
                <Link to="/contact" className="card-link">
                  Contact our team &rarr;
                </Link>
              )}
            </div>

            <div className="card center">
              <h3>Phone</h3>
              {phoneReady ? (
                <p className="text-muted">{contactConfig.referralPhone}</p>
              ) : (
                <Link to="/contact" className="card-link">
                  Contact our team &rarr;
                </Link>
              )}
            </div>
          </div>

          <p className="center" style={{ marginTop: 30 }}>
            <Link to="/book" className="btn btn-primary">
              Make a Referral
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

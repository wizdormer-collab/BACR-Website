import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import Reveal from '../../components/Reveal.jsx'
import { referrers, journey } from '../../data/site.js'
import { contactConfig, isPlaceholder } from '../../lib/site.config.js'

export default function Referrers() {
  usePageTitle('For Referrers')

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
          <Reveal className="section-head">
            {referrers.paragraphs.slice(1).map((text) => (
              <p key={text.slice(0, 24)} className="text-muted">
                {text}
              </p>
            ))}
          </Reveal>

          <Reveal delay={60} className="section-head">
            <span className="kicker">Referrals</span>
            <h2>{referrers.headline2}</h2>
            <p>{referrers.text}</p>
          </Reveal>

          <div className="grid grid-3">
            <Reveal className="card center">
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
            </Reveal>

            <Reveal delay={70} className="card center">
              <h3>Email</h3>
              {emailReady ? (
                <p className="text-muted">{contactConfig.referralEmail}</p>
              ) : (
                <Link to="/contact" className="card-link">
                  Contact our team &rarr;
                </Link>
              )}
            </Reveal>

            <Reveal delay={140} className="card center">
              <h3>Phone</h3>
              {phoneReady ? (
                <p className="text-muted">{contactConfig.referralPhone}</p>
              ) : (
                <Link to="/contact" className="card-link">
                  Contact our team &rarr;
                </Link>
              )}
            </Reveal>
          </div>

          <p className="center" style={{ marginTop: 26 }}>
            <span className="pill-note">{referrers.acknowledgement}</span>
          </p>
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

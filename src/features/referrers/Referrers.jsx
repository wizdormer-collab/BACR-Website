import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import { referrers } from '../../data/site.js'

export default function Referrers() {
  return (
    <>
      <PageHero
        kicker={referrers.kicker}
        title={referrers.headline}
        lead={referrers.paragraphs[0]}
      />

      <section className="section">
        <div className="container split split--even">
          <div className="stack">
            <p>{referrers.paragraphs[1]}</p>
            <p className="pullquote pullquote--marked">{referrers.headline2}</p>
          </div>

          <div>
            <p>{referrers.text}</p>

            {/* referralEmail / referralFormUrl are blank in site.config.js, so
                this routes to the enquiry form instead of a dead mailto: */}
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <Link className="btn btn--primary" to="/book">
                Make a Referral
              </Link>
              <Link className="btn btn--secondary" to="/contact">
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

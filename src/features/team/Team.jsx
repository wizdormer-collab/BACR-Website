import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import Icon from '../../components/Icon.jsx'
import mark from '../../assets/bacr-mark.png'
import { team, services } from '../../data/site.js'

const DISCIPLINE_ICONS = {
  Physiotherapy: 'activity',
  'Speech Therapy': 'chat',
  'Occupational Therapy': 'hand',
  'Behavioral Therapy': 'brain',
}

export default function Team() {
  usePageTitle('Our Team')

  return (
    <>
      <PageHero
        variant="light"
        kicker="Our Team"
        title={team.headline}
        subtitle={team.intro}
      />

      <section className="section">
        <div className="container">
          <div className="coming-soon">
            <img src={mark} alt="" className="cs-mark" />
            <h2>Specialists who care — profiles publishing soon</h2>
            <p>
              Our physiotherapists, speech and language therapists, occupational therapists and
              behavioral specialists are being introduced here shortly. In the meantime, you can
              book a consultation and be seen by a specialist in your first visit.
            </p>

            <div className="cs-disciplines">
              {services.items.map((service) => (
                <span key={service.slug}>
                  <Icon name={DISCIPLINE_ICONS[service.title]} size={16} />
                  {service.title}
                </span>
              ))}
            </div>

            <div className="hero-actions" style={{ justifyContent: 'center', marginBottom: 0 }}>
              <Link to="/book" className="btn btn-primary">
                Book Appointment
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

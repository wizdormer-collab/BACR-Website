import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import mark from '../../assets/bacr-mark.png'
import { team, multidisciplinary, journey } from '../../data/site.js'

const DISCIPLINE_ICONS = {
  Physiotherapy: 'activity',
  'Occupational Therapy': 'hand',
  'Speech & Language Therapy': 'chat',
  Audiology: 'waves',
  'Behavioural and Developmental Care': 'brain',
  'Behavioural Therapy': 'brain',
  'Psychological Support': 'heart',
  'Clinical Case Coordination': 'clipboard',
  'Medical and Rehabilitation Oversight': 'shield',
  'Medical & Rehabilitation Oversight': 'shield',
}

export default function Team() {
  usePageTitle('Our Team')

  return (
    <>
      <PageHero
        variant="light"
        kicker={team.kicker}
        title={team.headline}
        subtitle={team.intro}
      />

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="kicker">Multidisciplinary Care</span>
            <h2>{team.listLabel.replace(/:$/, '')}</h2>
          </Reveal>

          <Reveal delay={80} className="center">
            <div className="chip-grid">
              {team.items.map((discipline) => (
                <span className="chip chip-lg" key={discipline}>
                  <Icon name={DISCIPLINE_ICONS[discipline] || 'users'} size={16} />
                  {discipline}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-muted center" style={{ maxWidth: 780, margin: '30px auto 0' }}>
              {multidisciplinary.note}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="coming-soon">
            <img src={mark} alt="" className="cs-mark" />
            <h2>Profiles publishing soon</h2>
            <p>
              Introductions for the professionals across our rehabilitation disciplines will appear
              here shortly. In the meantime, you can book an assessment and be guided to the right
              clinical pathway in your first contact.
            </p>

            <div className="cs-disciplines">
              {multidisciplinary.disciplines.map((discipline) => (
                <span key={discipline}>
                  <Icon name={DISCIPLINE_ICONS[discipline] || 'users'} size={16} />
                  {discipline}
                </span>
              ))}
            </div>

            <div className="hero-actions" style={{ justifyContent: 'center', marginBottom: 0 }}>
              <Link to={journey.primary.to} className="btn btn-primary">
                {journey.primary.label}
              </Link>
              <Link to={journey.tertiary.to} className="btn btn-outline">
                {journey.tertiary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

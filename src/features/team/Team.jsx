import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import Icon from '../../components/Icon.jsx'
import { team, multidisciplinary } from '../../data/site.js'

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
          <div className="section-head center">
            <span className="kicker">{multidisciplinary.kicker}</span>
            <h2>{multidisciplinary.headline}</h2>
            {multidisciplinary.paragraphs.slice(0, 2).map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>

          <div className="center">
            <div className="chip-grid">
              {team.items.map((discipline) => (
                <span className="chip chip-lg" key={discipline}>
                  <Icon name={DISCIPLINE_ICONS[discipline] || 'users'} size={16} />
                  {discipline}
                </span>
              ))}
            </div>
          </div>

          <p className="text-muted center" style={{ maxWidth: 780, margin: '30px auto 26px' }}>
            {multidisciplinary.note}
          </p>

          <p className="center" style={{ marginBottom: 0 }}>
            <Link to="/services" className="btn btn-outline">
              How our services fit together
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

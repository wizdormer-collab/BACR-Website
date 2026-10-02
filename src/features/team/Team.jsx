import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import { team, services } from '../../data/site.js'

const SPECIALISATIONS = {
  Physiotherapy: 'Movement, strength and physical function recovery',
  'Speech Therapy': 'Speech, language, communication and swallowing',
  'Occupational Therapy': 'Everyday activities, independence and participation',
  'Behavioral Therapy': 'ASD, ADHD, anxiety and emotional regulation',
}

export default function Team() {
  usePageTitle('Our Team')

  return (
    <>
      <PageHero kicker="Our Team" title={team.headline} subtitle={team.intro} />

      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {services.items.map((service) => (
              <article key={service.slug} className="card team-card">
                <div className="avatar" aria-hidden="true">
                  ?
                </div>
                <div className="team-role">{service.title}</div>
                <h3>Name to be added</h3>
                <p>{SPECIALISATIONS[service.title] || 'Specialist therapist'}</p>
                <p className="text-muted" style={{ fontSize: 14, marginTop: 10 }}>
                  Short bio to be added.
                </p>
              </article>
            ))}
          </div>

          <p className="center" style={{ marginTop: 30 }}>
            <span className="pill-note">{team.placeholderNote}</span>
          </p>
        </div>
      </section>

      <CtaBand
        title="Want to meet the team?"
        text="Book a consultation and be seen by a specialist in your first visit."
        primary={{ label: 'Book Appointment', to: '/book' }}
        secondary={{ label: 'Contact us', to: '/contact' }}
      />
    </>
  )
}

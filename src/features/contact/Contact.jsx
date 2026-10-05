import { Link } from 'react-router-dom'
import usePageTitle from '../../lib/usePageTitle.js'
import PageHero from '../../components/PageHero.jsx'
import CtaBand from '../../components/CtaBand.jsx'
import ContactList from '../../components/ContactList.jsx'
import Reveal from '../../components/Reveal.jsx'
import { brand } from '../../data/site.js'
import { contactConfig } from '../../lib/site.config.js'

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  contactConfig.mapQuery
)}&t=&z=14&ie=UTF8&iwloc=&output=embed`

export default function Contact() {
  usePageTitle('Contact')

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Visit Us in Bodija, Ibadan"
        subtitle={`${brand.name} - ${brand.location}`}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <Reveal>
              <div className="section-head">
                <span className="kicker">Get in Touch</span>
                <h2>We'd love to hear from you</h2>
                <p>Walk in, call us, or send a message - we will get back to you.</p>
              </div>

              <ContactList />

              <Link to="/book" className="btn btn-primary" style={{ marginTop: 22 }}>
                Book an appointment
              </Link>
            </Reveal>

            <Reveal delay={120} className="map-frame">
              <iframe
                title={`Map of ${contactConfig.mapQuery}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Your Recovery Starts With One Step."
        text="Book your consultation today - for yourself, a loved one, or as a referring clinician."
        primary={{ label: 'Book Appointment', to: '/book' }}
        secondary={{ label: 'Our services', to: '/services' }}
      />
    </>
  )
}

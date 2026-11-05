import usePageTitle from '../lib/usePageTitle.js'

// Shared opening for every inner page: kicker, headline, lead.
// The PRD opens every section the same way, so the hero mirrors that rhythm.
export default function PageHero({ title, kicker, lead, children }) {
  usePageTitle(title)

  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero__inner">
          {kicker && <p className="kicker">{kicker}</p>}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

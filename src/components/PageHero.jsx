import usePageTitle from '../lib/usePageTitle.js'

// Calm Clinic inner-page opener: a quiet white band with a kicker, a large
// navy heading and one lead paragraph. No gradient, no artwork.
export default function PageHero({ title, kicker, lead, subtitle, children }) {
  usePageTitle(title)

  return (
    <section className="page-hero light">
      <div className="container page-hero-inner">
        {kicker ? <span className="kicker">{kicker}</span> : null}
        <h1>{title}</h1>
        {lead || subtitle ? <p className="lead">{lead || subtitle}</p> : null}
        {children}
      </div>
    </section>
  )
}

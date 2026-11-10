import usePageTitle from '../lib/usePageTitle.js'
import { HeroBloom } from './BrandArt.jsx'

// Original inner-page opener: gradient band by default, white "light" variant
// for text-heavy pages (as the old site did).
export default function PageHero({ title, kicker, lead, subtitle, variant, children }) {
  usePageTitle(title)

  return (
    <section className={`page-hero ${variant === 'light' ? 'light' : ''}`.trim()}>
      <div className="page-hero-art" aria-hidden="true">
        <HeroBloom />
      </div>
      <div className="container">
        {kicker ? <span className="eyebrow">{kicker}</span> : null}
        <h1>{title}</h1>
        {lead || subtitle ? <p>{lead || subtitle}</p> : null}
        {children}
      </div>
    </section>
  )
}

export default function PageHero({ kicker, title, subtitle, variant = 'gradient' }) {
  return (
    <section className={`page-hero ${variant === 'light' ? 'light' : ''}`}>
      <div className="container">
        {kicker ? <span className="eyebrow">{kicker}</span> : null}
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </section>
  )
}

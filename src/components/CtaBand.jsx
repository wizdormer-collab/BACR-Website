import { Link } from 'react-router-dom'

export default function CtaBand({
  title,
  text,
  primary,
  secondary,
  note,
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="callout">
          <div>
            <h2>{title}</h2>
            {text ? <p>{text}</p> : null}
            {note ? (
              <p style={{ marginTop: 10, fontSize: 14.5 }}>
                <strong>{note}</strong>
              </p>
            ) : null}
          </div>
          <div className="callout-actions">
            {primary ? (
              <Link to={primary.to} className="btn btn-light">
                {primary.label}
              </Link>
            ) : null}
            {secondary ? (
              <Link to={secondary.to} className="btn btn-ghost-light">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

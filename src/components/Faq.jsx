// Native <details> — accessible disclosure with zero JS and zero animation,
// which is the whole point of dropping the old site's motion layer.
export default function Faq({ items }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details className="faq__item" key={item.q}>
          <summary className="faq__q">
            <span>{item.q}</span>
          </summary>
          <div className="faq__body">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}

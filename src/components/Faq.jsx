// Native <details> — accessible disclosure with zero JS. The old sheet's
// .faq-item rules style it.
export default function Faq({ items }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details className="faq-item faq__item" key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  )
}

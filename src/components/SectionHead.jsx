export default function SectionHead({ kicker, title }) {
  return (
    <header className="section-head">
      <p className="kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      <span className="gold-line" aria-hidden="true" />
    </header>
  )
}

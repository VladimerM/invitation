export default function SectionHead({ kicker, title }) {
  return (
    <header className="section-head">
      <p className="kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      {/* rosebud on a leafy stem — echoes the floral frame of the hero video */}
      <svg className="gold-line" viewBox="0 0 160 24" aria-hidden="true">
        <path d="M73 12H10M87 12h63" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".6" />
        <path d="M68 12q-8-9-17-7q5 8 17 7zM68 12q-8 9-17 7q5-8 17-7zM44 12q-6-6-12-5q4 5 12 5z" fill="currentColor" opacity=".55" />
        <path d="M92 12q8-9 17-7q-5 8-17 7zM92 12q8 9 17 7q-5-8-17-7zM116 12q6-6 12-5q-4 5-12 5z" fill="currentColor" opacity=".55" />
        <circle cx="80" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth=".9" />
        <circle cx="80" cy="12" r="1.9" fill="currentColor" />
      </svg>
    </header>
  )
}

import { useState } from 'react'
import { config } from '../config'
import SectionHead from './SectionHead'

function LocationCard({ loc }) {
  const [failed, setFailed] = useState(!loc.image)
  return (
    <article className="loc-card">
      <div className="loc-photo">
        {failed ? (
          <span className="img-placeholder">{loc.title}</span>
        ) : (
          <img src={loc.image} alt={loc.title} loading="lazy" onError={() => setFailed(true)} />
        )}
      </div>
      <div className="loc-body">
        <p className="loc-time">{loc.time}</p>
        <h3 className="loc-title">{loc.title}</h3>
        <p className="loc-address">{loc.address}</p>
        <a className="btn btn-solid loc-btn" href={loc.map} target="_blank" rel="noopener noreferrer">
          Открыть карту
        </a>
      </div>
    </article>
  )
}

export default function Locations() {
  return (
    <section className="section section-soft" id="locations">
      <div className="container">
        <SectionHead kicker="Локации" title="Как добраться" />
        <div className="loc-grid" data-reveal-group>
          {config.locations.map((loc, i) => (
            <LocationCard key={i} loc={loc} />
          ))}
        </div>
      </div>
    </section>
  )
}

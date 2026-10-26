import { config } from '../config'
import SectionHead from './SectionHead'
import { Pin, timelineIcons } from './icons'

export default function Timeline() {
  return (
    <section className="section" id="timeline">
      <div className="container">
        <SectionHead kicker="Расписание" title="План дня" />
        <div className="tl-wrap">
          <div className="tl-line" aria-hidden="true"><i className="tl-line-fill" /></div>
          <ol className="tl-list">
            {config.schedule.map((item, i) => (
              <li key={i} className={`tl-item ${i % 2 ? 'tl-item--right' : 'tl-item--left'}`}>
                <div className="tl-medal" aria-hidden="true">
                  {timelineIcons[item.icon] ?? timelineIcons.heart}
                </div>
                <div className="tl-card">
                  <p className="tl-time">{item.time}</p>
                  <h3 className="tl-title">{item.title}</h3>
                  <p className="tl-sub">{item.text}</p>
                  {item.map && (
                    <a className="tl-map" href={item.map} target="_blank" rel="noopener noreferrer">
                      <Pin />
                      На карте
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

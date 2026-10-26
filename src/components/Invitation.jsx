import { config } from '../config'
import SectionHead from './SectionHead'

export default function Invitation() {
  const { invitation } = config
  return (
    <section className="section" id="invitation">
      <div className="container container--narrow">
        <SectionHead kicker={invitation.kicker} title={invitation.title} />
        <p className="invitation-text" data-reveal>
          {invitation.text.map((line, i) => (
            <span key={i}>
              {line}
              {i < invitation.text.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

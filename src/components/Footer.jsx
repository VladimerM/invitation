import { config } from '../config'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-message">С любовью, {config.groom} и {config.bride}</p>
        <p className="footer-bottom">
          {config.groom} &amp; {config.bride} · {config.dateLabel}
        </p>
      </div>
      <img className="footer-swans" src="photos/swans.jpg" width="720" height="360" alt="" aria-hidden="true" loading="lazy" />
    </footer>
  )
}

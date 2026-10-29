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
      <img className="footer-swans" src="photos/swans.jpg" width="576" height="250" alt="" aria-hidden="true" loading="lazy" />
    </footer>
  )
}

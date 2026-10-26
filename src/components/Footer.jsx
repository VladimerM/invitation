import { config } from '../config'
import { Heart } from './icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Heart className="footer-heart" />
        <p className="footer-message">С любовью, {config.groom} и {config.bride}</p>
        <p className="footer-bottom">
          {config.groom} &amp; {config.bride} · {config.dateLabel}
        </p>
      </div>
    </footer>
  )
}

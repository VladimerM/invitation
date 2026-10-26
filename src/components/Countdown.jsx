import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { config } from '../config'
import { downloadIcs, reducedMotion } from '../utils'
import SectionHead from './SectionHead'
import { CalendarIcon } from './icons'

const pad = (n) => (n < 10 ? '0' : '') + n

function remaining(target) {
  const diff = target - Date.now()
  if (diff <= 0) return null
  const sec = Math.floor(diff / 1000)
  return {
    days: pad(Math.floor(sec / 86400)),
    hours: pad(Math.floor(sec / 3600) % 24),
    minutes: pad(Math.floor(sec / 60) % 60),
    seconds: pad(sec % 60),
  }
}

// One split-flap card; flips when its value changes
function FlipUnit({ value, label }) {
  const top = useRef(null)
  const bottom = useRef(null)
  const flapT = useRef(null)
  const flapB = useRef(null)
  const cur = useRef(null)

  useEffect(() => {
    const old = cur.current
    cur.current = value
    if (old === null || old === value || reducedMotion) {
      top.current.textContent = value
      bottom.current.textContent = value
      return
    }
    top.current.textContent = value
    flapT.current.firstElementChild.textContent = old
    flapB.current.firstElementChild.textContent = value
    gsap.timeline({
      onComplete: () => {
        bottom.current.textContent = value
        gsap.set([flapT.current, flapB.current], { visibility: 'hidden' })
      },
    })
      .set(flapT.current, { visibility: 'visible', rotateX: 0 })
      .set(flapB.current, { visibility: 'visible', rotateX: 90 })
      .to(flapT.current, { rotateX: -89, duration: 0.26, ease: 'power2.in' })
      .to(flapB.current, { rotateX: 0, duration: 0.34, ease: 'back.out(1.2)' })
  }, [value])

  return (
    <div className="flip-unit">
      <div className="flip-card" aria-hidden="true">
        <div className="flip-half flip-top"><span ref={top} /></div>
        <div className="flip-half flip-bottom"><span ref={bottom} /></div>
        <div className="flip-half flip-flap flip-flap-top" ref={flapT}><span /></div>
        <div className="flip-half flip-flap flip-flap-bottom" ref={flapB}><span /></div>
      </div>
      <span className="flip-label">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const target = new Date(config.date).getTime()
  const [t, setT] = useState(() => remaining(target))

  useEffect(() => {
    const id = setInterval(() => {
      const next = remaining(target)
      setT(next)
      if (!next) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <section className="section section-soft" id="countdown">
      <div className="container">
        <SectionHead kicker="Уже скоро" title="До торжества осталось" />
        <p className="countdown-date" data-reveal>
          {config.dateLabel} · {config.timeLabel}
        </p>
        {t ? (
          <div className="flip-grid" id="flip-grid" aria-label="Обратный отсчёт">
            <FlipUnit value={t.days} label="Дней" />
            <FlipUnit value={t.hours} label="Часов" />
            <FlipUnit value={t.minutes} label="Минут" />
            <FlipUnit value={t.seconds} label="Секунд" />
          </div>
        ) : (
          <p className="countdown-done">Сегодня наш день!</p>
        )}
        <p className="countdown-actions" data-reveal>
          <a className="btn btn-outline" href="#" onClick={downloadIcs}>
            <CalendarIcon />
            Добавить в календарь
          </a>
        </p>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { config } from '../config'
import { reducedMotion } from '../utils'
import SectionHead from './SectionHead'
import { ChevronLeft, ChevronRight, Close } from './icons'

const AUTOPLAY_MS = 4500

// Signed shortest distance from the current slide on a looped ring: -2, -1, 0, 1, 2…
function offsetFrom(i, current, n) {
  let d = i - current
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

// Coverflow positions by distance from the centre: 0 = current, 1 = neighbours, 2 = outer, 3 = hidden
const SHIFT = [0, 62, 108, 140] // translateX, % of slide width
const SCALE = [1, 0.84, 0.7, 0.6]
const ROTATE = [0, 38, 44, 48] // deg, turned toward the centre
const DEPTH = [0, -80, -160, -220] // px

function slideStyle(offset) {
  const abs = Math.min(Math.abs(offset), 3)
  const sign = Math.sign(offset)
  return {
    transform: `translateX(${sign * SHIFT[abs]}%) translateZ(${DEPTH[abs]}px) rotateY(${-sign * ROTATE[abs]}deg) scale(${SCALE[abs]})`,
    opacity: abs > 2 ? 0 : 1,
    zIndex: 10 - abs,
    pointerEvents: abs > 2 ? 'none' : undefined,
  }
}

function Slide({ src, index, offset, onClick }) {
  const [failed, setFailed] = useState(false)
  const abs = Math.abs(offset)
  return (
    <button
      className={`carousel-slide ${offset === 0 ? 'is-active' : ''}`}
      type="button"
      style={slideStyle(offset)}
      aria-hidden={abs > 2}
      tabIndex={abs > 2 ? -1 : 0}
      aria-label={offset === 0 ? `Открыть фото ${index + 1}` : `Показать фото ${index + 1}`}
      onClick={onClick}
    >
      {failed ? (
        <span className="img-placeholder">Фотография {index + 1}</span>
      ) : (
        <img src={src} alt={`Фотография ${index + 1}`} draggable="false" onError={() => setFailed(true)} />
      )}
    </button>
  )
}

function Carousel({ photos, onOpen, paused }) {
  const n = photos.length
  const [current, setCurrent] = useState(0)
  const [hover, setHover] = useState(false)
  const drag = useRef(null)
  const suppressClick = useRef(false)

  const go = (i) => setCurrent(((i % n) + n) % n)
  const prev = () => go(current - 1)
  const next = () => go(current + 1)

  // Autoplay; restarts after every slide change, stops on hover and while the lightbox is open
  useEffect(() => {
    if (reducedMotion || hover || paused || n < 2) return
    const id = setTimeout(() => go(current + 1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [current, hover, paused, n])

  const onPointerDown = (e) => (drag.current = { x: e.clientX, moved: false })
  const onPointerMove = (e) => {
    if (drag.current && Math.abs(e.clientX - drag.current.x) > 10) drag.current.moved = true
  }
  const onPointerUp = (e) => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 40) (dx > 0 ? prev : next)()
    // A swipe ends with a click on whatever slide is under the finger — swallow it
    if (d.moved) {
      suppressClick.current = true
      setTimeout(() => (suppressClick.current = false), 0)
    }
  }

  return (
    <div
      className="carousel"
      id="gallery-carousel"
      role="region"
      aria-roledescription="карусель"
      aria-label="Фотографии"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      }}
      // Pause only for a real mouse: on phones a tap would "hover" forever and stop autoplay
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
    >
      <div
        className="carousel-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
      >
        {photos.map((src, i) => {
          const offset = offsetFrom(i, current, n)
          return (
            <Slide
              key={i}
              src={src}
              index={i}
              offset={offset}
              onClick={(e) => {
                if (suppressClick.current) return e.preventDefault()
                offset === 0 ? onOpen(i) : go(i)
              }}
            />
          )
        })}
      </div>

      {n > 1 && (
        <>
          <button className="carousel-btn carousel-prev" type="button" aria-label="Предыдущее фото" onClick={prev}><ChevronLeft /></button>
          <button className="carousel-btn carousel-next" type="button" aria-label="Следующее фото" onClick={next}><ChevronRight /></button>
          <div className="carousel-dots" role="tablist">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className={`carousel-dot ${i === current ? 'is-active' : ''}`}
                aria-selected={i === current}
                aria-label={`Фото ${i + 1}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function Lightbox({ photos, index, setIndex, onClose }) {
  const touchX = useRef(null)
  const n = photos.length
  const prev = () => setIndex((i) => (i - 1 + n) % n)
  const next = () => setIndex((i) => (i + 1) % n)

  useEffect(() => {
    document.documentElement.classList.add('lb-lock')
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('lb-lock')
      window.removeEventListener('keydown', onKey)
    }
  })

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографий"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)()
      }}
    >
      <button className="lb-btn lb-close" type="button" aria-label="Закрыть" onClick={onClose}><Close /></button>
      <button className="lb-btn lb-prev" type="button" aria-label="Предыдущее фото" onClick={prev}><ChevronLeft /></button>
      <figure className="lb-stage">
        <img src={photos[index]} alt="Фотография из галереи" />
      </figure>
      <button className="lb-btn lb-next" type="button" aria-label="Следующее фото" onClick={next}><ChevronRight /></button>
      <p className="lb-counter">{index + 1} / {n}</p>
    </div>
  , document.body)
}

export default function Gallery() {
  const [active, setActive] = useState(null)
  const photos = config.photos

  return (
    <section className="section gallery-section" id="gallery">
      <div className="gallery-atmosphere" aria-hidden="true">
        {photos[2] && (
          <img
            className="gallery-atmosphere-img"
            src={photos[2]}
            alt=""
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        )}
        <div className="gallery-atmosphere-veil" />
        <div className="gallery-atmosphere-grain" />
      </div>

      <svg className="gallery-flourish gallery-flourish--tl" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <path d="M12 108C28 72 52 48 108 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M28 96c14-18 32-30 64-42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".7" />
        <circle cx="108" cy="28" r="3.5" fill="currentColor" opacity=".55" />
        <circle cx="92" cy="54" r="2" fill="currentColor" opacity=".4" />
      </svg>
      <svg className="gallery-flourish gallery-flourish--br" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <path d="M108 12C92 48 68 72 12 92" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M92 24c-14 18-32 30-64 42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".7" />
        <circle cx="12" cy="92" r="3.5" fill="currentColor" opacity=".55" />
        <circle cx="28" cy="66" r="2" fill="currentColor" opacity=".4" />
      </svg>

      <div className="container gallery-inner">
        <SectionHead kicker="Фотографии" title="Наши моменты" />
        <Carousel photos={photos} onOpen={setActive} paused={active !== null} />
      </div>

      {active !== null && (
        <Lightbox photos={photos} index={active} setIndex={setActive} onClose={() => setActive(null)} />
      )}
    </section>
  )
}

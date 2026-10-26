import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { config } from '../config'
import SectionHead from './SectionHead'
import { ChevronLeft, ChevronRight, Close } from './icons'

function GalleryItem({ src, index, onOpen }) {
  const [failed, setFailed] = useState(false)
  return (
    <button
      className="gallery-item"
      type="button"
      aria-label={`Открыть фото ${index + 1}`}
      onClick={() => !failed && onOpen(index)}
    >
      {failed ? (
        <span className="img-placeholder">Фотография {index + 1}</span>
      ) : (
        <img src={src} alt={`Фотография ${index + 1}`} loading="lazy" onError={() => setFailed(true)} />
      )}
    </button>
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
        <div className="gallery-grid" id="gallery-grid">
          {photos.map((src, i) => (
            <GalleryItem key={src} src={src} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      {active !== null && (
        <Lightbox photos={photos} index={active} setIndex={setActive} onClose={() => setActive(null)} />
      )}
    </section>
  )
}

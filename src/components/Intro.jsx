import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { config } from '../config'
import { reducedMotion } from '../utils'

// Envelope with a wax seal. onOpen fires inside the click (so music may start),
// onRevealHero fires as the envelope fades out.
export default function Intro({ onOpen, onRevealHero, onUnlock }) {
  const root = useRef(null)
  const opened = useRef(false)
  const breath = useRef(null)

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.envelope', {
        y: 44, autoAlpha: 0, duration: 1.1, ease: 'power3.out',
        onComplete: () => {
          breath.current = gsap.to('.envelope', {
            y: 8, rotation: 0.5, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut',
          })
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const open = () => {
    if (opened.current) return
    opened.current = true
    onOpen()

    const el = root.current
    if (reducedMotion) {
      el.style.display = 'none'
      onUnlock()
      onRevealHero()
      return
    }
    breath.current?.kill()

    const q = gsap.utils.selector(el)
    gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      .to(q('.env-seal'), { scale: 1.22, duration: 0.16, ease: 'power2.out' })
      .to(q('.env-seal'), { scale: 0, rotation: 140, y: -46, autoAlpha: 0, duration: 0.5, ease: 'back.in(1.6)' })
      .to(q('.env-flap'), { rotateX: -180, duration: 0.65 }, '-=0.22')
      .set(q('.env-flap'), { zIndex: 0 })
      .to(q('.env-letter'), { yPercent: -74, duration: 0.85 }, '<15%')
      .to(q('.intro-hint'), { autoAlpha: 0, duration: 0.4 }, '<')
      .to(el, { autoAlpha: 0, duration: 0.7 }, '+=0.35')
      .set(el, { display: 'none' })
      .add(onUnlock, '-=0.6')
      .add(onRevealHero, '-=0.55')
  }

  return (
    <div className="intro" ref={root} onClick={(e) => e.target === root.current && open()}>
      <div className="envelope">
        <div className="env-body">
          <div className="env-letter" aria-hidden="true">
            <span className="letter-monogram">{config.monogram}</span>
            <span className="letter-names">{config.groom} &amp; {config.bride}</span>
            <span className="letter-date">{config.dateLabel}</span>
          </div>
          <div className="env-pocket" aria-hidden="true" />
          <div className="env-flap" aria-hidden="true" />
          <button className="env-seal" type="button" aria-label="Открыть приглашение" onClick={open}>
            <span className="seal-ring" aria-hidden="true" />
            <span className="seal-monogram">{config.monogram}</span>
          </button>
        </div>
      </div>
      <p className="intro-hint">Нажмите на печать, чтобы открыть приглашение</p>
    </div>
  )
}

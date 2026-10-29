import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config'
import { downloadIcs, reducedMotion } from '../utils'
import { ChevronDown } from './icons'

gsap.registerPlugin(ScrollTrigger)

const waitsForIntro = config.sections?.intro !== false
const PARTS = '.hero-kicker, .hero-names, .hero-date, .hero-cal, .hero-scroll'

const Hero = forwardRef(function Hero(_, ref) {
  const root = useRef(null)
  const video = useRef(null)
  const played = useRef(false)

  useImperativeHandle(ref, () => ({
    // Called inside the intro tap: a play() started by a gesture is allowed even in iOS low-power mode
    startVideo() {
      video.current?.play().catch(() => {})
    },
    // Soft entrance of the text once the envelope has dissolved
    play() {
      video.current?.play().catch(() => {})
      if (played.current || reducedMotion) return
      played.current = true
      const q = gsap.utils.selector(root)
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(q('.hero-kicker'), { autoAlpha: 0, y: 12, letterSpacing: '.7em' }, { autoAlpha: 1, y: 0, letterSpacing: '.42em', duration: 1.3 }, 0.15)
        .fromTo(q('.hero-names'), { autoAlpha: 0, y: 26, filter: 'blur(10px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.5, clearProps: 'filter' }, 0.45)
        .fromTo(q('.hero-date'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.05)
        .fromTo(q('.hero-cal'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.4)
        .fromTo(q('.hero-scroll'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 2)
    },
  }))

  // Hide the text before the first paint so it does not flash through the dissolving envelope
  useLayoutEffect(() => {
    if (waitsForIntro && !reducedMotion) gsap.set(root.current.querySelectorAll(PARTS), { autoAlpha: 0 })
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-inner', {
        y: 70, autoAlpha: 0.15, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <header className="hero" id="hero" ref={root}>
      <div className="hero-stage">
        <video
          ref={video}
          className="hero-video"
          src={config.heroVideo}
          poster={config.heroPoster}
          autoPlay={!waitsForIntro}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="hero-inner">
          <p className="hero-kicker">{config.heroKicker}</p>
          <h1 className="hero-names">
            {config.groom} <span className="hero-amp">и</span> {config.bride}
          </h1>
          <p className="hero-date">{config.dateLabel}</p>
          <a className="hero-cal" href="#" onClick={downloadIcs}>Добавить в календарь</a>
          <a className="hero-scroll" href="#invitation" aria-label="Листайте вниз">
            <ChevronDown />
          </a>
        </div>
      </div>
    </header>
  )
})

export default Hero

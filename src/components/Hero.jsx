import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config'
import { reducedMotion } from '../utils'
import { ChevronDown } from './icons'

gsap.registerPlugin(ScrollTrigger)

const Chars = ({ text }) =>
  [...text].map((c, i) => (
    <span key={i} className="char">{c}</span>
  ))

const Hero = forwardRef(function Hero(_, ref) {
  const root = useRef(null)
  const played = useRef(false)
  const [photo, setPhoto] = useState(Boolean(config.heroImage))

  // Letter-by-letter entrance, started by the intro
  useImperativeHandle(ref, () => ({
    play() {
      if (played.current || reducedMotion) return
      played.current = true
      const q = gsap.utils.selector(root)
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(q('.hero-kicker'), { autoAlpha: 0, letterSpacing: '.72em', duration: 1.2 }, 0.1)
        .from(q('.char'), { yPercent: 65, autoAlpha: 0, rotateX: -55, duration: 0.9, stagger: 0.045 }, 0.3)
        .from(q('.hero-amp'), { scale: 0, rotation: -30, autoAlpha: 0, duration: 0.8, ease: 'back.out(2)' }, 1.0)
        .from(q('.hero-date'), { y: 18, autoAlpha: 0, duration: 0.85 }, 1.25)
        .from(q('.hero-scroll'), { autoAlpha: 0, duration: 0.9 }, 1.7)
    },
  }))

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      // fade content while scrolling away
      gsap.to('.hero-inner', {
        y: 90, autoAlpha: 0.2, scale: 0.96, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
      gsap.to('.hero-scroll', {
        autoAlpha: 0, y: 24, ease: 'none',
        scrollTrigger: { trigger: root.current, start: '10% top', end: '35% top', scrub: true },
      })
    }, root)

    // background and text follow the cursor (or phone tilt) slightly
    const bg = root.current.querySelector('.hero-bg, .hero-art')
    const content = root.current.querySelector('.hero-inner')
    const setBgX = bg && gsap.quickTo(bg, 'xPercent', { duration: 1.1, ease: 'power2.out' })
    const setBgY = bg && gsap.quickTo(bg, 'yPercent', { duration: 1.1, ease: 'power2.out' })
    const setCX = gsap.quickTo(content, 'x', { duration: 1.3, ease: 'power2.out' })
    const setCY = gsap.quickTo(content, 'y', { duration: 1.3, ease: 'power2.out' })
    const apply = (nx, ny) => {
      if (setBgX) { setBgX(nx * 1.6); setBgY(ny * 1.2) }
      setCX(nx * -9); setCY(ny * -6)
    }
    const onMouse = (e) =>
      apply((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2)
    const onTilt = (e) => {
      if (e.gamma === null || e.beta === null) return
      apply(Math.max(-1, Math.min(1, e.gamma / 35)), Math.max(-1, Math.min(1, (e.beta - 45) / 40)))
    }
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (fine) window.addEventListener('mousemove', onMouse, { passive: true })
    else window.addEventListener('deviceorientation', onTilt, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('deviceorientation', onTilt)
    }
  }, [photo])

  return (
    <header className={`hero ${photo ? 'hero--photo' : 'hero--art'}`} id="hero" ref={root}>
      {photo ? (
        <>
          <div className="hero-bg" aria-hidden="true">
            <img src={config.heroImage} alt="" onError={() => setPhoto(false)} />
          </div>
          <div className="hero-veil" aria-hidden="true" />
        </>
      ) : (
        <div className="hero-art" aria-hidden="true" />
      )}
      <div className="hero-inner">
        <p className="hero-kicker">Приглашение на свадьбу</p>
        <h1 className="hero-names" aria-label={`${config.groom} и ${config.bride}`}>
          <span className="hero-name" aria-hidden="true"><Chars text={config.groom} /></span>
          <span className="hero-amp" aria-hidden="true">&amp;</span>
          <span className="hero-name" aria-hidden="true"><Chars text={config.bride} /></span>
        </h1>
        <p className="hero-date">{config.dateLabel}</p>
      </div>
      <a className="hero-scroll" href="#invitation" aria-label="Листайте вниз">
        <ChevronDown />
      </a>
    </header>
  )
})

export default Hero

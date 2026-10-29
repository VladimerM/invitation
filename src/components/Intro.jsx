import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { config } from '../config'
import { reducedMotion } from '../utils'

// Seconds before the end of the envelope video when the zoom-and-dissolve starts
const LEAD_OUT = 1.1

// Envelope video held on its first frame. A tap plays it; near the end the camera
// pushes into the open envelope and the whole layer dissolves into the hero.
// onOpen fires inside the tap (so music and the hero video may start),
// onRevealHero fires while the envelope dissolves.
export default function Intro({ onOpen, onRevealHero, onUnlock }) {
  const root = useRef(null)
  const video = useRef(null)
  const opened = useRef(false)
  const finished = useRef(false)

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.intro-hint', { autoAlpha: 0, y: 14, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.intro-ring', { autoAlpha: 0, duration: 1, delay: 0.9 })
    }, root)
    return () => ctx.revert()
  }, [])

  const finish = () => {
    if (finished.current) return
    finished.current = true
    const el = root.current
    if (reducedMotion) {
      el.style.display = 'none'
      onUnlock()
      onRevealHero()
      return
    }
    const q = gsap.utils.selector(el)
    gsap.timeline()
      .to(q('.intro-stage'), { scale: 1.55, duration: 2, ease: 'power2.in' }, 0)
      .to(el, { autoAlpha: 0, duration: 1.2, ease: 'power1.inOut' }, 0.75)
      .add(onRevealHero, 1.15)
      .add(onUnlock, 1.5)
      .set(el, { display: 'none' })
  }

  const open = () => {
    if (opened.current) return
    opened.current = true
    onOpen()
    gsap.to(root.current.querySelectorAll('.intro-hint, .intro-ring'), { autoAlpha: 0, duration: 0.5 })

    const v = video.current
    if (!v || reducedMotion) return finish()
    v.play().catch(finish)
    // Safety net if the video stalls on a slow connection
    setTimeout(finish, ((v.duration || 6) + 3) * 1000)
  }

  const onTime = () => {
    const v = video.current
    if (v.duration && v.currentTime >= v.duration - LEAD_OUT) finish()
  }

  return (
    <div className="intro" ref={root}>
      <img className="intro-backdrop" src={config.introPoster} alt="" aria-hidden="true" />
      <div className="intro-stage">
        <video
          ref={video}
          className="intro-video"
          src={config.introVideo}
          poster={config.introPoster}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={onTime}
          onEnded={finish}
          onError={() => opened.current && finish()}
        />
        <span className="intro-ring" aria-hidden="true" />
      </div>
      <button className="intro-tap" type="button" aria-label="Открыть приглашение" onClick={open} />
      <p className="intro-hint" aria-hidden="true">{config.introHint}</p>
    </div>
  )
}

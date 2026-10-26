import { useEffect, useRef } from 'react'
import { reducedMotion } from '../utils'

// Soft petals falling over the whole page (canvas)
export default function Petals({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!active || reducedMotion || !canvas) return

    const ctx = canvas.getContext('2d')
    const color = getComputedStyle(document.documentElement).getPropertyValue('--petal').trim() || '#e9cfc5'
    let w = 0, h = 0, raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const rnd = (a, b) => a + Math.random() * (b - a)
    const make = (onScreen) => ({
      x: rnd(-40, w + 40),
      y: onScreen ? rnd(-h * 0.2, h) : rnd(-140, -20),
      s: rnd(6.5, 15),
      vy: rnd(24, 58),
      drift: rnd(14, 46),
      fx: rnd(0.25, 0.7),
      ph: rnd(0, 6.28),
      rot: rnd(0, 6.28),
      vr: rnd(-1.4, 1.4),
      f3: rnd(0.5, 1.3),
      p3: rnd(0, 6.28),
      a: rnd(0.3, 0.62),
    })

    const petals = Array.from({ length: 23 }, () => make(true))
    let last = performance.now()

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, w, h)
      petals.forEach((p, i) => {
        p.y += p.vy * dt
        p.ph += p.fx * dt
        p.rot += p.vr * dt
        p.p3 += p.f3 * dt
        if (p.y > h + 40) { petals[i] = make(false); return }
        const x = p.x + Math.sin(p.ph * 6.28) * p.drift
        const squash = 0.32 + 0.68 * Math.abs(Math.cos(p.p3))
        ctx.save()
        ctx.translate(x, p.y)
        ctx.rotate(p.rot)
        ctx.scale(squash, 1)
        ctx.globalAlpha = p.a
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.moveTo(0, -p.s)
        ctx.bezierCurveTo(p.s * 0.85, -p.s * 0.45, p.s * 0.75, p.s * 0.55, 0, p.s)
        ctx.bezierCurveTo(-p.s * 0.75, p.s * 0.55, -p.s * 0.85, -p.s * 0.45, 0, -p.s)
        ctx.fill()
        ctx.restore()
      })
    }

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else { last = performance.now(); raf = requestAnimationFrame(tick) }
    }
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [active])

  return <canvas ref={canvasRef} className="petals" aria-hidden="true" />
}

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from './utils'

gsap.registerPlugin(ScrollTrigger)

// Scroll-triggered entrances for every section. Returns a cleanup function.
export function initScrollAnimations(scope) {
  if (reducedMotion) return () => {}

  const ctx = gsap.context(() => {
    const $$ = (sel, root = scope) => Array.from(root.querySelectorAll(sel))
    const once = (trigger, start) => ({ trigger, start, toggleActions: 'play none none none' })

    // Section headings: kicker → clipped title → gold line
    $$('.section-head').forEach((head) => {
      const tl = gsap.timeline({ scrollTrigger: once(head, 'top 88%') })
      tl.from(head.querySelector('.kicker'), {
        autoAlpha: 0, y: 18, letterSpacing: '.72em', duration: 0.85, ease: 'power3.out',
      })
      tl.fromTo(head.querySelector('.section-title'),
        { clipPath: 'inset(0 0 105% 0)', y: 40, autoAlpha: 0.4 },
        { clipPath: 'inset(0 0 -10% 0)', y: 0, autoAlpha: 1, duration: 1.05, ease: 'power3.out' },
        '-=0.45')
      tl.from(head.querySelector('.gold-line'), { scaleX: 0, autoAlpha: 0, duration: 0.95, ease: 'power2.out' }, '-=0.55')
    })

    // Plain blocks: soft rise + blur
    $$('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 36, autoAlpha: 0, filter: 'blur(8px)', duration: 1.15, ease: 'power3.out',
        clearProps: 'filter', scrollTrigger: once(el, 'top 90%'),
      })
    })

    $$('[data-reveal-group]').forEach((group) => {
      gsap.from(group.children, {
        y: 40, autoAlpha: 0, scale: 0.94, filter: 'blur(6px)', duration: 1,
        stagger: 0.14, ease: 'power3.out', clearProps: 'filter', scrollTrigger: once(group, 'top 86%'),
      })
    })

    // Countdown cards
    const grid = scope.querySelector('#flip-grid')
    if (grid) {
      gsap.from(grid.children, {
        y: 48, autoAlpha: 0, rotateX: -35, transformOrigin: '50% 100%',
        duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: once(grid, 'top 88%'),
      })
    }

    // Gallery: the carousel rises in as a whole (slides keep their own CSS transitions), flourishes swirl in
    const gallery = scope.querySelector('#gallery-carousel')
    if (gallery) {
      gsap.from(gallery, {
        y: 40, autoAlpha: 0, scale: 0.96, filter: 'blur(6px)', duration: 1.1,
        ease: 'power3.out', clearProps: 'filter,transform', scrollTrigger: once(gallery, 'top 85%'),
      })
    }
    $$('.gallery-flourish').forEach((el, i) => {
      gsap.from(el, {
        autoAlpha: 0, scale: 0.6, rotate: i ? 18 : -18, duration: 1.2, ease: 'power3.out',
        scrollTrigger: once('#gallery', 'top 75%'),
      })
    })
    const atmo = scope.querySelector('.gallery-atmosphere-img')
    if (atmo) {
      gsap.fromTo(atmo, { yPercent: -4 }, {
        yPercent: 4, ease: 'none',
        scrollTrigger: { trigger: '#gallery', start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }

    // Timeline: line fills while scrolling, medals pop, cards slide in
    const wrap = scope.querySelector('.tl-wrap')
    if (wrap) {
      gsap.fromTo(wrap.querySelector('.tl-line-fill'), { scaleY: 0 }, {
        scaleY: 1, ease: 'none', transformOrigin: 'top center',
        scrollTrigger: { trigger: wrap, start: 'top 75%', end: 'bottom 55%', scrub: 0.85 },
      })
      const desktop = window.matchMedia('(min-width: 761px)').matches
      $$('.tl-item', wrap).forEach((item) => {
        const fromX = desktop ? (item.classList.contains('tl-item--right') ? 64 : -64) : 32
        const tl = gsap.timeline({ scrollTrigger: once(item, 'top 84%') })
        tl.from(item.querySelector('.tl-medal'), { scale: 0, rotate: -40, duration: 0.75, ease: 'back.out(2.4)' }, 0)
        tl.from(item.querySelector('.tl-card'), {
          x: fromX, autoAlpha: 0, filter: 'blur(6px)', duration: 0.95, ease: 'power3.out', clearProps: 'filter',
        }, 0.08)
      })
    }

    // Footer: text rises, then the swans drift up from below
    const footer = scope.querySelector('.footer')
    if (footer) {
      const tl = gsap.timeline({ scrollTrigger: once(footer, 'top 92%') })
      tl.from($$('.footer-message, .footer-bottom', footer), {
        y: 22, autoAlpha: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out',
      })
      tl.from(footer.querySelector('.footer-swans'), {
        y: 40, autoAlpha: 0, duration: 1.4, ease: 'power2.out',
      }, '-=0.5')
    }
  }, scope)

  return () => ctx.revert()
}

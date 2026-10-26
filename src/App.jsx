import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from './config'
import { initScrollAnimations } from './animations'
import Intro from './components/Intro'
import Petals from './components/Petals'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Countdown from './components/Countdown'
import Gallery from './components/Gallery'
import Timeline from './components/Timeline'
import Locations from './components/Locations'
import Rsvp from './components/Rsvp'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MusicButton from './components/MusicButton'

export default function App() {
  const page = useRef(null)
  const hero = useRef(null)
  const audio = useRef(null)
  const [opened, setOpened] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [hasMusic, setHasMusic] = useState(Boolean(config.music))

  useEffect(() => {
    document.title = `${config.groom} и ${config.bride} — приглашение на свадьбу`
    const root = document.documentElement
    Object.entries(config.theme).forEach(([k, v]) => root.style.setProperty(`--${k}`, v))
    root.classList.add('intro-lock')
    return initScrollAnimations(page.current)
  }, [])

  const play = () => {
    audio.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }
  const toggleMusic = () => {
    if (playing) { audio.current.pause(); setPlaying(false) } else play()
  }

  return (
    <>
      <Intro
        onOpen={() => { setOpened(true); if (hasMusic) play() }}
        onUnlock={() => {
          document.documentElement.classList.remove('intro-lock')
          ScrollTrigger.refresh()
        }}
        onRevealHero={() => hero.current?.play()}
      />

      <Petals active={opened} />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <div ref={page}>
        <Hero ref={hero} />
        <main>
          <Invitation />
          <Countdown />
          <Gallery />
          <Timeline />
          <Locations />
          <Rsvp />
          <Contact />
        </main>
        <Footer />
      </div>

      {hasMusic && (
        <>
          <MusicButton playing={playing} onToggle={toggleMusic} />
          <audio
            ref={audio}
            src={config.music}
            loop
            preload="auto"
            playsInline
            onError={() => setHasMusic(false)}
          />
        </>
      )}
    </>
  )
}

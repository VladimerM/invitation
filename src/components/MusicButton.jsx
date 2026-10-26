import { Note } from './icons'

export default function MusicButton({ playing, onToggle }) {
  return (
    <button
      className={`music-btn ${playing ? 'is-playing' : ''}`}
      type="button"
      aria-label={playing ? 'Выключить музыку' : 'Включить музыку'}
      aria-pressed={playing}
      onClick={onToggle}
    >
      <Note />
      <span className="music-eq" aria-hidden="true"><i /><i /><i /><i /></span>
    </button>
  )
}

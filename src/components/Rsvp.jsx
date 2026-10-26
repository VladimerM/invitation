import { useState } from 'react'
import { config } from '../config'
import SectionHead from './SectionHead'

const SENT_KEY = 'rsvp-sent'

export default function Rsvp() {
  const { rsvp } = config
  const [name, setName] = useState('')
  const [attend, setAttend] = useState('yes')
  const [guests, setGuests] = useState(1)
  const [comment, setComment] = useState('')
  const [website, setWebsite] = useState('') // honeypot — bots fill it, people don't see it
  const [status, setStatus] = useState('idle') // idle | loading | done
  const [error, setError] = useState('')
  const [result, setResult] = useState(() => {
    try { return localStorage.getItem(SENT_KEY) } catch { return null }
  })

  const coming = attend === 'yes'
  const clampGuests = (n) => Math.min(rsvp.maxGuests, Math.max(1, Number(n) || 1))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (name.trim().length < 2) return setError('Пожалуйста, укажите имя и фамилию')
    if (!rsvp.endpoint) return setError('Форма ещё не подключена к Google Таблице')
    if (website) return // silently ignore bots

    setStatus('loading')
    try {
      // URL-encoded body keeps this a "simple" request, so Apps Script needs no CORS preflight
      const body = new URLSearchParams({
        name: name.trim(),
        attend: coming ? 'Придёт' : 'Не придёт',
        guests: coming ? String(guests) : '0',
        comment: comment.trim(),
      })
      const res = await fetch(rsvp.endpoint, { method: 'POST', body })
      // Apps Script answers 200 with an HTML page on script errors, so only a JSON {ok:true} counts
      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch { data = { ok: false, error: text.slice(0, 300) } }
      if (!data.ok) {
        console.error('RSVP: Google Apps Script error →', data.error)
        throw new Error(data.error || 'Ошибка сервера')
      }

      const msg = coming
        ? `Спасибо, ${name.trim()}! Мы очень ждём вас.`
        : `Спасибо, ${name.trim()}, что предупредили. Нам будет вас не хватать.`
      try { localStorage.setItem(SENT_KEY, msg) } catch {}
      setResult(msg)
      setStatus('done')
    } catch {
      setStatus('idle')
      setError('Не удалось отправить ответ. Проверьте интернет и попробуйте ещё раз.')
    }
  }

  return (
    <section className="section section-soft" id="rsvp">
      <div className="container container--narrow">
        <SectionHead kicker="Ждём вас" title="Подтвердите присутствие" />
        {rsvp.deadline && <p className="rsvp-deadline" data-reveal>{rsvp.deadline}</p>}

        <div className="rsvp-card" data-reveal>
          {result ? (
            <div className="rsvp-success">
              <svg className="rsvp-check" viewBox="0 0 72 72" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle pathLength="1" cx="36" cy="36" r="33" />
                <path pathLength="1" d="M22 37.5l10 10 18-21" />
              </svg>
              <p className="rsvp-success-text">{result}</p>
              <button
                type="button"
                className="tl-map"
                style={{ background: 'none', border: 0, borderBottom: '1px solid var(--accent-30)', cursor: 'pointer', marginTop: '1.4em' }}
                onClick={() => {
                  try { localStorage.removeItem(SENT_KEY) } catch {}
                  setResult(null)
                  setStatus('idle')
                }}
              >
                Изменить ответ
              </button>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={submit} noValidate>
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <label className="field">
                <span className="field-label">Ваше имя и фамилия</span>
                <input
                  className="field-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={120}
                  autoComplete="name"
                  placeholder="Например, Анна Петросян"
                />
              </label>

              <fieldset className="field field-radios">
                <legend className="field-label">Придёте ли вы?</legend>
                <label className="radio">
                  <input type="radio" name="attend" checked={coming} onChange={() => setAttend('yes')} />
                  <i aria-hidden="true" />
                  <span>С радостью приду</span>
                </label>
                <label className="radio">
                  <input type="radio" name="attend" checked={!coming} onChange={() => setAttend('no')} />
                  <i aria-hidden="true" />
                  <span>К сожалению, не смогу</span>
                </label>
              </fieldset>

              {coming && (
                <div className="field field-collapse">
                  <span className="field-label" id="guests-label">Количество гостей</span>
                  <div className="stepper">
                    <button className="stepper-btn" type="button" aria-label="Меньше гостей" onClick={() => setGuests((g) => clampGuests(g - 1))}>−</button>
                    <input
                      className="stepper-value"
                      type="number"
                      min="1"
                      max={rsvp.maxGuests}
                      inputMode="numeric"
                      value={guests}
                      onChange={(e) => setGuests(clampGuests(e.target.value))}
                      aria-labelledby="guests-label"
                    />
                    <button className="stepper-btn" type="button" aria-label="Больше гостей" onClick={() => setGuests((g) => clampGuests(g + 1))}>+</button>
                  </div>
                </div>
              )}

              <label className="field">
                <span className="field-label">Пожелания или комментарий</span>
                <textarea
                  className="field-input"
                  rows="3"
                  maxLength={600}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Необязательно"
                />
              </label>

              {error && <p className="rsvp-error" role="alert">{error}</p>}

              <button className={`btn btn-solid rsvp-submit ${status === 'loading' ? 'is-loading' : ''}`} type="submit" disabled={status === 'loading'}>
                <span className="btn-label">Отправить ответ</span>
                <span className="btn-spinner" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

import { config } from './config'

export const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Formats a Date as an iCalendar UTC timestamp, e.g. 20270619T140000Z
const icsDate = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

// Builds the .ics file in the browser — no server needed
export function downloadIcs(e) {
  e.preventDefault()
  const start = new Date(config.date)
  const end = new Date(start.getTime() + config.durationHours * 3600000)
  const loc = config.locations[0]
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//RU',
    'BEGIN:VEVENT',
    `UID:${icsDate(start)}-wedding@invitation`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:Свадьба ${config.groom} и ${config.bride}`,
    loc ? `LOCATION:${loc.address}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'wedding.ics'
  a.click()
  URL.revokeObjectURL(url)
}

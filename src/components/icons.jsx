const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const timelineIcons = {
  camera: (
    <svg {...stroke} strokeWidth="1.4">
      <rect x="3.5" y="7" width="17" height="12" rx="2" />
      <path d="M9 7l1.3-2.2h3.4L15 7" />
      <circle cx="12" cy="13" r="3.4" />
      <circle cx="17.5" cy="10" r=".6" />
    </svg>
  ),
  home: (
    <svg {...stroke} strokeWidth="1.4">
      <path d="M4.8 11.2L12 5l7.2 6.2" />
      <path d="M6.5 9.9v9.6h11V9.9" />
      <path d="M12 16.6c-1.9-1.3-2.8-2.5-2.3-3.5.4-.8 1.6-.9 2.3-.1.7-.8 1.9-.7 2.3.1.5 1-.4 2.2-2.3 3.5z" />
    </svg>
  ),
  heart: (
    <svg {...stroke} strokeWidth="1.4">
      <path d="M12 19.5c-5-3.2-7.5-6.2-6.3-9.2C6.6 8 9.4 7.6 11 9.4l1 1.1 1-1.1c1.6-1.8 4.4-1.4 5.3.9 1.2 3-1.3 6-6.3 9.2z" />
    </svg>
  ),
  car: (
    <svg {...stroke} strokeWidth="1.4">
      <path d="M4 16.8v-2.9l1.6-4.1A2 2 0 0 1 7.5 8.5h9a2 2 0 0 1 1.9 1.3l1.6 4.1v2.9" />
      <path d="M4 13.9h16" />
      <circle cx="7.6" cy="16.8" r="1.8" />
      <circle cx="16.4" cy="16.8" r="1.8" />
    </svg>
  ),
  church: (
    <svg {...stroke} strokeWidth="1.4">
      <path d="M12 2.6v3.2M10.7 3.9h2.6M12 5.8v3.8" />
      <path d="M6.8 20.5v-6.6L12 9.6l5.2 4.3v6.6" />
      <path d="M4.5 20.5h15" />
      <path d="M10.3 20.5v-3.1a1.7 1.7 0 0 1 3.4 0v3.1" />
    </svg>
  ),
  glasses: (
    <svg {...stroke} strokeWidth="1.4">
      <g transform="rotate(-13 9 12)">
        <path d="M6.9 3.6h4.2l-.7 5.3c-.15 1.05-.8 1.7-1.4 1.7s-1.25-.65-1.4-1.7L6.9 3.6z" />
        <path d="M9 10.6v5.6" />
        <path d="M7.2 16.8h3.6" />
      </g>
      <g transform="rotate(13 15 12)">
        <path d="M12.9 3.6h4.2l-.7 5.3c-.15 1.05-.8 1.7-1.4 1.7s-1.25-.65-1.4-1.7l-.7-5.3z" />
        <path d="M15 10.6v5.6" />
        <path d="M13.2 16.8h3.6" />
      </g>
    </svg>
  ),
}

export const ChevronDown = () => (
  <svg {...stroke} strokeWidth="1.5"><path d="M6 10l6 6 6-6" /></svg>
)
export const ChevronLeft = () => (
  <svg {...stroke} strokeWidth="1.5"><path d="M15 5l-7 7 7 7" /></svg>
)
export const ChevronRight = () => (
  <svg {...stroke} strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
)
export const Close = () => (
  <svg {...stroke} strokeWidth="1.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const CalendarIcon = () => (
  <svg {...stroke} strokeWidth="1.5">
    <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
    <path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5M12 13v4M10 15h4" />
  </svg>
)
export const Pin = () => (
  <svg {...stroke} strokeWidth="1.5">
    <path d="M12 21s-6.5-5.6-6.5-10.4a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
    <circle cx="12" cy="10.4" r="2.3" />
  </svg>
)
export const Phone = () => (
  <svg {...stroke} strokeWidth="1.5">
    <path d="M6.5 4.5h3.2l1.3 4.2-2 1.2a12.5 12.5 0 0 0 5.6 5.6l1.2-2 4.2 1.3v3.2A2 2 0 0 1 18 20 14.5 14.5 0 0 1 4 6a2 2 0 0 1 2.5-1.5z" />
  </svg>
)
export const Note = () => (
  <svg className="music-note" {...stroke} strokeWidth="1.5">
    <path d="M9 17.3V6.8l8-1.8v10.2" />
    <circle cx="7.1" cy="17.3" r="1.9" />
    <circle cx="15.1" cy="15.2" r="1.9" />
  </svg>
)
export const Heart = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 19.5c-5-3.2-7.5-6.2-6.3-9.2C6.6 8 9.4 7.6 11 9.4l1 1.1 1-1.1c1.6-1.8 4.4-1.4 5.3.9 1.2 3-1.3 6-6.3 9.2z" />
  </svg>
)

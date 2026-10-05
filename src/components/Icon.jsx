const paths = {
  activity: <polyline points="3 12 7 12 10 4 14 20 17 12 21 12" />,
  chat: (
    <>
      <path d="M20 15a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
    </>
  ),
  hand: (
    <>
      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-6-2.5-6-6v-3.5a1.5 1.5 0 0 1 3 0V14" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5a3 3 0 0 0-3 3 2.5 2.5 0 0 0-1.5 4.5A2.5 2.5 0 0 0 9 17a3 3 0 0 0 3 3z" />
      <path d="M12 5a3 3 0 0 1 3 3 2.5 2.5 0 0 1 1.5 4.5A2.5 2.5 0 0 1 15 17a3 3 0 0 1-3 3z" />
      <path d="M12 5v15" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  heart: (
    <path d="M20.8 6.6a4.7 4.7 0 0 0-6.7 0L12 8.7l-2.1-2.1a4.7 4.7 0 1 0-6.7 6.7L12 22l8.8-8.7a4.7 4.7 0 0 0 0-6.7z" />
  ),
  waves: <path d="M2 8c2.5 0 2.5 3 5 3s2.5-3 5-3 2.5 3 5 3 2.5-3 5-3M2 16c2.5 0 2.5 3 5 3s2.5-3 5-3 2.5 3 5 3 2.5-3 5-3" />,
  check: <polyline points="4 12.5 9.5 18 20 6.5" />,
  phone: (
    <path d="M5 4h3.5l1.7 4.3-2.2 1.4a12.5 12.5 0 0 0 5.3 5.3l1.4-2.2L19 14.5V18a1.6 1.6 0 0 1-1.8 1.6A16.6 16.6 0 0 1 3.4 5.8 1.6 1.6 0 0 1 5 4z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3.5 7 12 13 20.5 7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" />
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H19" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16" rx="2" />
      <path d="M9 4.5a3 3 0 0 1 6 0" />
      <path d="M9 11h6M9 15h4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5l8.5 4.5L12 12.5 3.5 8z" />
      <polyline points="3.5 13 12 17.5 20.5 13" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 19a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.5a3.5 3.5 0 0 1 0 6.5" />
      <path d="M17.5 14.2A6.5 6.5 0 0 1 21.5 19" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.5V12c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V5.5z" />
      <polyline points="8.8 12 11 14.2 15.3 9.8" />
    </>
  ),
  quote: (
    <>
      <path d="M9 7c-2.5 0-4 2-4 4.5S6.5 16 8.5 16c1 0 1.8-.4 2.3-1" />
      <path d="M18.5 7c-2.5 0-4 2-4 4.5s1.5 4.5 3.5 4.5c1 0 1.8-.4 2.3-1" />
    </>
  ),
}

export default function Icon({ name, size = 22, strokeWidth = 1.8, className = '', ...rest }) {
  const glyph = paths[name] || paths.check
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}

// Decorative brand artwork. These are abstract, geometric compositions built
// from the same four-petal mark as the logo — no stock photos, no invented
// clinical imagery, and nothing that reads as a real patient or clinician.

export function HeroBloom() {
  return (
    <svg
      className="hero-bloom"
      viewBox="0 0 420 420"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="bloom-petal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="bloom-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00e24b" stopOpacity="0.55" />
          <stop offset="1" stopColor="#00e24b" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="210" cy="210" r="168" stroke="#ffffff" strokeOpacity="0.12" />
      <circle cx="210" cy="210" r="120" stroke="#ffffff" strokeOpacity="0.16" strokeDasharray="2 9" />
      <circle cx="210" cy="210" r="74" stroke="#ffffff" strokeOpacity="0.1" />

      <g transform="translate(210 210)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            rx="34"
            ry="112"
            fill="url(#bloom-petal)"
            transform={`rotate(${angle}) translate(0 -58)`}
          />
        ))}
        <circle r="30" fill="#ffffff" fillOpacity="0.1" />
        <circle r="10" fill="#00e24b" fillOpacity="0.85" />
      </g>

      <g stroke="#ffffff" strokeOpacity="0.18">
        <ellipse cx="210" cy="210" rx="186" ry="92" transform="rotate(-24 210 210)" />
        <ellipse cx="210" cy="210" rx="186" ry="92" transform="rotate(56 210 210)" />
      </g>

      <g fill="#00e24b">
        <circle cx="53" cy="164" r="5" />
        <circle cx="350" cy="286" r="4" />
        <circle cx="331" cy="93" r="3" />
      </g>
      <g fill="#ffffff" fillOpacity="0.5">
        <circle cx="376" cy="208" r="3" />
        <circle cx="120" cy="330" r="3" />
        <circle cx="88" cy="96" r="2.5" />
      </g>
    </svg>
  )
}

export function AudienceArt({ variant }) {
  if (variant === 'children') {
    return (
      <svg
        className="audience-svg"
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="500" cy="66" r="150" fill="#ffffff" fillOpacity="0.07" />
        <circle cx="500" cy="66" r="82" fill="#ffffff" fillOpacity="0.06" />
        <circle cx="492" cy="74" r="46" fill="#00e24b" fillOpacity="0.8" />

        <g transform="rotate(-8 250 286)">
          <rect x="128" y="252" width="150" height="86" rx="22" fill="#ffffff" fillOpacity="0.16" />
          <rect x="196" y="186" width="150" height="86" rx="22" fill="#ffffff" fillOpacity="0.24" />
          <rect x="264" y="120" width="150" height="86" rx="22" fill="#ffffff" fillOpacity="0.32" />
        </g>

        <path
          d="M96 350c38-62 86-36 122-70s30-94 86-96 64 48 112 46"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="2 14"
        />
        <g fill="#ffffff" fillOpacity="0.7">
          <circle cx="96" cy="350" r="6" />
          <circle cx="218" cy="280" r="5" />
          <circle cx="304" cy="184" r="5" />
          <circle cx="416" cy="230" r="6" />
        </g>

        <g transform="translate(468 322)">
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse
              key={angle}
              rx="13"
              ry="38"
              fill="url(#audience-bloom)"
              transform={`rotate(${angle}) translate(0 -24)`}
            />
          ))}
          <circle r="9" fill="#ffffff" fillOpacity="0.7" />
        </g>

        <g fill="#ffffff" fillOpacity="0.5">
          <circle cx="92" cy="102" r="4" />
          <circle cx="356" cy="64" r="3" />
          <circle cx="552" cy="368" r="4" />
        </g>
        <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round">
          <path d="M72 132v16M64 140h16" />
          <path d="M382 348v12M376 354h12" />
        </g>
        <defs>
          <linearGradient id="audience-bloom" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <svg
      className="audience-svg"
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#ffffff" strokeOpacity="0.18">
        <circle cx="462" cy="188" r="58" />
        <circle cx="462" cy="188" r="104" />
        <circle cx="462" cy="188" r="150" />
      </g>
      <circle cx="462" cy="188" r="104" stroke="#00e24b" strokeOpacity="0.35" strokeDasharray="2 10" />

      <path
        d="M64 364c72-12 64-92 132-104s66 46 126 20 44-88 108-96"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M64 364c72-12 64-92 132-104s66 46 126 20 44-88 108-96"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="26"
        strokeLinecap="round"
      />

      <g>
        <circle cx="64" cy="364" r="13" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="196" cy="260" r="10" fill="#ffffff" fillOpacity="0.55" />
        <circle cx="322" cy="280" r="10" fill="#ffffff" fillOpacity="0.55" />
        <circle cx="430" cy="184" r="13" fill="#00e24b" fillOpacity="0.75" />
      </g>

      <g transform="translate(430 184)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            rx="12"
            ry="34"
            fill="#ffffff"
            fillOpacity="0.35"
            transform={`rotate(${angle}) translate(0 -22)`}
          />
        ))}
        <circle r="8" fill="#ffffff" fillOpacity="0.8" />
      </g>

      <g fill="#ffffff" fillOpacity="0.4">
        <circle cx="106" cy="116" r="4" />
        <circle cx="196" cy="76" r="3" />
        <circle cx="548" cy="340" r="4" />
        <circle cx="74" cy="228" r="3" />
      </g>
      <g stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round">
        <path d="M102 172v16M94 180h16" />
        <path d="M540 88v12M534 94h12" />
      </g>
    </svg>
  )
}

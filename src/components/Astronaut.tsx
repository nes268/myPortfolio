import type { SVGProps } from 'react'

export const Astronaut = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="220"
    height="260"
    viewBox="0 0 150 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <filter
        id="shadow"
        x="18"
        y="156"
        width="112"
        height="30"
        filterUnits="userSpaceOnUse"
      >
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <linearGradient
        id="astronaut-suit"
        x1="33"
        y1="30"
        x2="120"
        y2="170"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#d7e3ff" />
        <stop offset="1" stopColor="#8cbcff" />
      </linearGradient>
      <radialGradient
        id="astronaut-visor"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(75 48) rotate(90) scale(30 40)"
      >
        <stop offset="0.2" stopColor="#84d0ff" />
        <stop offset="0.45" stopColor="#3b5bff" />
        <stop offset="0.9" stopColor="#05011d" />
      </radialGradient>
      <linearGradient
        id="astronaut-accent"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <stop stopColor="#ff6ac8" />
        <stop offset="1" stopColor="#7d41ff" />
      </linearGradient>
    </defs>
    <g filter="url(#shadow)">
      <ellipse cx="74" cy="168" rx="36" ry="8" fill="rgba(7,13,40,0.35)" />
    </g>
    <g id="astronaut-body">
      <path
        d="M60 32c0-14.359 11.641-26 26-26s26 11.641 26 26-11.641 26-26 26-26-11.641-26-26Z"
        fill="url(#astronaut-visor)"
      />
      <rect
        x="37"
        y="60"
        width="76"
        height="76"
        rx="34"
        fill="url(#astronaut-suit)"
      />
      <rect
        x="45"
        y="88"
        width="60"
        height="34"
        rx="14"
        fill="rgba(20,25,60,0.2)"
      />
      <path
        d="M38 82c-12 4-20 14-20 24 0 6 4 10 9 10 7 0 12-7 16-14 3-6 5-13 6-20Z"
        fill="#a3d4ff"
        opacity="0.7"
      />
      <path
        d="M114 82c12 4 20 14 20 24 0 6-4 10-9 10-7 0-12-7-16-14-3-6-5-13-6-20Z"
        fill="#8cbcff"
        opacity="0.7"
      />
      <path
        d="M70 136c-2 10-12 28-24 24-8-3-10-16-4-28 6-13 26-35 38-32 8 2 4 16-6 36Z"
        fill="#b1d6ff"
      />
      <path
        d="M86 136c2 10 12 28 24 24 8-3 10-16 4-28-6-13-26-35-38-32-8 2-4 16 6 36Z"
        fill="#9bcaff"
      />
      <circle cx="75" cy="104" r="14" fill="rgba(20,25,60,0.15)" />
      <circle cx="75" cy="104" r="8" fill="rgba(20,25,60,0.28)" />
      <rect
        x="64"
        y="64"
        width="22"
        height="32"
        rx="10"
        fill="rgba(255,255,255,0.34)"
      />
      <path
        d="M48 70c-6-4-10-10-10-18 0-10 6-18 16-20"
        stroke="rgba(112,184,255,0.4)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M102 70c6-4 10-10 10-18 0-10-6-18-16-20"
        stroke="rgba(112,184,255,0.4)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
    <g id="astronaut-details">
      <path
        d="M65 146c-10 28-18 32-24 30"
        stroke="url(#astronaut-accent)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M86 146c10 28 18 32 24 30"
        stroke="url(#astronaut-accent)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="108" cy="106" r="6" fill="url(#astronaut-accent)" />
      <circle cx="42" cy="108" r="6" fill="url(#astronaut-accent)" />
      <path
        d="M60 116h30"
        stroke="rgba(14,24,66,0.45)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  </svg>
)


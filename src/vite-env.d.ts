/// <reference types="vite/client" />

declare module 'react-vertical-timeline-component' {
  import type { ReactNode, CSSProperties } from 'react'

  export interface VerticalTimelineProps {
    animate?: boolean
    layout?: '1-column' | '1-column-left' | '1-column-right' | '2-columns'
    lineColor?: string
    className?: string
    intersectionObserverProps?: { rootMargin?: string; threshold?: number }
    children?: ReactNode
  }

  export interface VerticalTimelineElementProps {
    date?: string
    contentStyle?: CSSProperties
    contentArrowStyle?: CSSProperties
    iconStyle?: CSSProperties
    icon?: ReactNode
    dateClassName?: string
    textClassName?: string
    children?: ReactNode
  }

  export const VerticalTimeline: (props: VerticalTimelineProps) => ReactNode
  export const VerticalTimelineElement: (props: VerticalTimelineElementProps) => ReactNode
}

export const HEADING_VISUAL_LEVELS = [
  'display',
  'display-2',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  '5xl',
  '4xl',
  '3xl',
  '2xl',
  'xl',
  'lg',
  'md',
  'base',
  '',
] as const
export const HEADING_COLORS = ['primary', 'info', 'success', 'warning', 'danger', '', 'blue', 'white'] as const

export type HeadingVisualLevel = (typeof HEADING_VISUAL_LEVELS)[number]
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'p'
export type HeadingLevel = HeadingTag
export type HeadingColor = (typeof HEADING_COLORS)[number]

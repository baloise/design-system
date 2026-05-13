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
export const HEADING_COLORS = ['primary', 'info', 'success', 'warning', 'danger', 'blue', 'white', ''] as const
export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'span', 'p'] as const
export const HEADING_LEVELS = ['display', 'display-2', 'h1', 'h2', 'h3', 'h4', 'h5', 'span', 'p', ''] as const
export const HEADING_SPACES = ['none', 'bottom', 'top', 'all', ''] as const

export type HeadingVisualLevel = (typeof HEADING_VISUAL_LEVELS)[number]
export type HeadingTag = (typeof HEADING_TAGS)[number]
export type HeadingLevel = (typeof HEADING_LEVELS)[number]
export type HeadingSpace = (typeof HEADING_SPACES)[number]
export type HeadingColor = (typeof HEADING_COLORS)[number]

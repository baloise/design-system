export const TEXT_ALIGNS = ['left', 'right', 'center', 'justify'] as const
export const TEXT_SIZES = [
  'xs',
  'sm',
  'base',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  'small',
  'lead',
  'block',
] as const
export const TEXT_SPACES = ['none', 'bottom', 'top', 'all'] as const
export const TEXT_COLORS = ['grey', 'primary', 'hint', 'success', 'warning', 'danger', 'placeholder'] as const

export type TextAlign = (typeof TEXT_ALIGNS)[number]
export type TextSize = (typeof TEXT_SIZES)[number]
export type TextSpace = (typeof TEXT_SPACES)[number]
export type TextColor = (typeof TEXT_COLORS)[number]

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
  '',
] as const
export const TEXT_SPACES = ['none', 'bottom', 'top', 'all', ''] as const
export const TEXT_COLORS = [
  'light-blue',
  'blue-dark',
  'blue-light',
  'primary-light',
  'white',
  'black',
  'grey',
  'primary',
  'blue',
  'info',
  'success',
  'warning',
  'danger',
  // | 'hint' // @deprecated use primary-light
  '',
] as const

export type TextAlign = (typeof TEXT_ALIGNS)[number]
export type TextSize = (typeof TEXT_SIZES)[number]
export type TextSpace = (typeof TEXT_SPACES)[number]
export type TextColor = (typeof TEXT_COLORS)[number]

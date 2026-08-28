export const DIVIDER_LAYOUTS = ['horizontal', 'vertical', ''] as const
export const DIVIDER_BORDER_STYLES = ['solid', 'dashed', ''] as const
export const DIVIDER_COLORS = ['primary', 'secondary', 'base', 'inverted'] as const

export const DIVIDER_SPACES = [
  'none',
  '2xs',
  'xs',
  'sm',
  'base',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  'xx-small',
  'x-small',
  'small',
  'normal',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'xxx-large',
  '',
] as const

export type DividerLayout = (typeof DIVIDER_LAYOUTS)[number]
export type DividerBorderStyle = (typeof DIVIDER_BORDER_STYLES)[number]
export type DividerColor = (typeof DIVIDER_COLORS)[number]
export type DividerSpace = (typeof DIVIDER_SPACES)[number]

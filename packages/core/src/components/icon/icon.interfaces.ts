export const ICON_SHAPES = ['triangle', 'circle'] as const
export const ICON_COLORS = [
  'auto',
  'blue',
  'light-blue',
  'success',
  'success-dark',
  'success-darker',
  'danger',
  'danger-dark',
  'danger-darker',
  'warning',
  'warning-dark',
  'warning-darker',
  'white',
  'grey',
  'grey-light',
  'grey-dark',
  'primary',
  'primary-light',
  'primary-dark',
  '',
] as const
export const ICON_TILE_COLORS = ['purple', 'red', 'yellow', 'green'] as const

export const ICON_SIZES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '',
  'xsmall',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
] as const

export type IconShape = (typeof ICON_SHAPES)[number]
export type IconColor = (typeof ICON_COLORS)[number] | string | undefined
export type IconTileColor = (typeof ICON_TILE_COLORS)[number]
export type IconSize = (typeof ICON_SIZES)[number] | undefined

export const TAG_COLORS = [
  'primary',
  'grey',
  'success',
  'info',
  'warning',
  'danger',
  'purple',
  'red',
  'yellow',
  'green',
  'purple-dark',
  'red-dark',
  'yellow-dark',
  'green-dark',
  'purple-light',
  'red-light',
  'yellow-light',
  'green-light',
] as const

export const TAG_SHAPES = ['square', 'pill'] as const
export const TAG_SIZES = ['small', 'medium', 'large'] as const
export const TAG_FONT_WEIGHTS = ['regular', 'bold'] as const
export const TAG_PLACEMENTS = ['left', 'center', 'right'] as const

export type TagColor = (typeof TAG_COLORS)[number]
export type TagShape = (typeof TAG_SHAPES)[number]
export type TagSize = (typeof TAG_SIZES)[number]
export type TagFontWeight = (typeof TAG_FONT_WEIGHTS)[number]
export type TagPlacement = (typeof TAG_PLACEMENTS)[number]

export interface TagCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsTagElement
}

export type TagCloseClickDetail = MouseEvent
export type TagCloseClick = TagCustomEvent<TagCloseClickDetail>

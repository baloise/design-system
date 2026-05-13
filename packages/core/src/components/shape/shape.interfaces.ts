export const SHAPE_VARIATIONS = ['1', '2', '3'] as const
export const SHAPE_COLORS = [
  'green',
  'green-light',
  'red',
  'red-light',
  'purple',
  'purple-light',
  'yellow',
  'yellow-light',
] as const
export const SHAPE_ROTATIONS = ['0', '90', '180', '270'] as const

export type ShapeVariation = (typeof SHAPE_VARIATIONS)[number]
export type ShapeColor = (typeof SHAPE_COLORS)[number]
export type ShapeRotation = (typeof SHAPE_ROTATIONS)[number]

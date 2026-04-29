export const LABEL_WEIGHTS = ['bold', 'regular'] as const
export const LABEL_SIZES = [
  '',
  'sm',
  'lg',
  'xl',
  '2xl',
  '3xl',
  'small',
  'large',
  'x-large',
  'xx-large',
  'xxx-large',
] as const

export type LabelWeight = (typeof LABEL_WEIGHTS)[number]
export type LabelSize = (typeof LABEL_SIZES)[number]

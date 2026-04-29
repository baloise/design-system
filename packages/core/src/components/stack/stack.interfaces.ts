export const STACK_LAYOUTS = ['horizontal', 'vertical', 'horizontal-reverse', 'vertical-reverse'] as const

export const STACK_SPACES = [
  'auto',
  'none',
  '2xs',
  'xs',
  'sm',
  'base',
  'md',
  'lg',
  'xl',
  'xxl',
  // deprecated
  'xx-small',
  'x-small',
  'small',
  'normal',
  'medium',
  'large',
  'x-large',
  'xx-large',
] as const
export const STACK_PADDINGS = [
  'none',
  '2xs',
  'xs',
  'sm',
  'base',
  'md',
  'lg',
  'xl',
  'xxl',
  // deprecated
  'xx-small',
  'x-small',
  'small',
  'normal',
  'medium',
  'large',
  'x-large',
  'xx-large',
] as const
export const STACK_ALIGNMENTS = [
  'top start',
  'top center',
  'top end',
  'start',
  'center',
  'end',
  'bottom start',
  'bottom center',
  'bottom end',
] as const

export const STACK_DIRECTIONS = ['row', 'column', 'row-reverse', 'column-reverse'] as const

export type StackLayout = (typeof STACK_LAYOUTS)[number]
export type StackSpace = (typeof STACK_SPACES)[number]
export type StackPadding = (typeof STACK_PADDINGS)[number]
export type StackAlignment = (typeof STACK_ALIGNMENTS)[number]
export type StackDirection = (typeof STACK_DIRECTIONS)[number]

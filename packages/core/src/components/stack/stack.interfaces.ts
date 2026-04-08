/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type StackLayout = 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse'

  export type StackSpace =
    | 'auto'
    | 'none'
    | '2xs'
    | 'xs'
    | 'sm'
    | 'base'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    // deprecated
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'normal'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
  export type StackPadding =
    | 'none'
    | '2xs'
    | 'xs'
    | 'sm'
    | 'base'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    // deprecated
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'normal'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
  export type StackAlignment =
    | 'top start'
    | 'top center'
    | 'top end'
    | 'start'
    | 'center'
    | 'end'
    | 'bottom start'
    | 'bottom center'
    | 'bottom end'

  export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
}

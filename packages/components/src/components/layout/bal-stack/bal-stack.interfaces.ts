/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalStackLayout = 'horizontal' | 'vertical' | ''

  export type BalStackSpace =
    | 'none'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'normal'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
    | ''
  export type BalStackPadding =
    | 'none'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'normal'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
    | ''
  export type BalStackAlignment =
    | 'top start'
    | 'top center'
    | 'top end'
    | 'start'
    | 'center'
    | 'end'
    | 'bottom start'
    | 'bottom center'
    | 'bottom end'
    | ''

  // deprecated
  export type BalStackDirection = 'row' | 'column' | ''
}

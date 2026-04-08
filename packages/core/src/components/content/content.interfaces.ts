/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type ContentLayout = 'horizontal' | 'vertical'
  export type ContentDirection = 'column' | 'row'
  export type ContentSpace =
    | 'none'
    | '3xs'
    | '2xs'
    | 'xs'
    | 'sm'
    | 'base'
    // deprecated
    | 'xxx-small'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'normal'
  export type ContentAlignment = 'start' | 'center' | 'end'
  export type ContentTextAlignment = 'left' | 'center' | 'right'
}

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type TextAlign = 'left' | 'right' | 'center' | 'justify'
  export type TextSize =
    | 'xs'
    | 'sm'
    | 'base'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | 'small'
    | 'lead'
    | 'block'
    | ''
  export type TextSpace = 'none' | 'bottom' | 'top' | 'all' | ''
  export type TextColor =
    | 'light-blue'
    | 'blue-dark'
    | 'blue-light'
    | 'primary-light'
    | 'white'
    | 'black'
    | 'grey'
    | 'primary'
    | 'blue'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    // | 'hint' // @deprecated use primary-light
    | ''
}

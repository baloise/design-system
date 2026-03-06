/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalTagColor =
    | 'primary'
    | 'grey'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'purple'
    | 'red'
    | 'yellow'
    | 'green'
    | 'purple-dark'
    | 'red-dark'
    | 'yellow-dark'
    | 'green-dark'
    | 'purple-light'
    | 'red-light'
    | 'yellow-light'
    | 'green-light'

  export type BalTagShape = 'square' | 'pill'
  export type BalTagSize = 'small' | 'medium' | 'large'
  export type BalTagFontWeight = 'regular' | 'bold'
  export type BalTagPlacement = 'left' | 'center'
}

namespace BalEvents {
  export interface BalTagCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalTagElement
  }

  export type BalTagCloseClickDetail = MouseEvent
  export type BalTagCloseClick = BalTagCustomEvent<BalTagCloseClickDetail>
}

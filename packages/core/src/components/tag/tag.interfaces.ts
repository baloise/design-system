/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type TagColor =
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

  export type TagShape = 'square' | 'pill'
  export type TagSize = 'small' | 'medium' | 'large'
  export type TagFontWeight = 'regular' | 'bold'
  export type TagPlacement = 'left' | 'center' | 'right'

  export interface TagCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsTagElement
  }

  export type TagCloseClickDetail = MouseEvent
  export type TagCloseClick = TagCustomEvent<TagCloseClickDetail>
}

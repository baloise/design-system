/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalPopoverContentRadius =
    | 'normal'
    | 'large'
    | 'none'
    | 'normal-bottom-none'
    | 'normal-top-none'
    | 'large-bottom-none'
    | 'large-top-none'
  export type BalPopoverContentColor = 'white' | 'grey'
  export type BalPopoverPlacement =
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'left'
    | 'bottom'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end'
}

namespace BalEvents {
  export type BalPopoverChangeDetail = boolean
  export interface BalPopoverChange extends CustomEvent {
    detail: BalPopoverChangeDetail
    target: HTMLBalPopoverElement
  }

  export type BalPopoverWillAnimateDetail = void
  export interface BalPopoverWillAnimate extends CustomEvent {
    detail: BalPopoverWillAnimateDetail
    target: HTMLBalPopoverElement
  }

  export type BalPopoverDidAnimateDetail = void
  export interface BalPopoverDidAnimate extends CustomEvent {
    detail: BalPopoverDidAnimateDetail
    target: HTMLBalPopoverElement
  }
}

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalTooltipTouchPosition = 'top' | 'bottom'
  export type BalTooltipVariant = 'popover' | 'fullscreen' | 'drawer'

  export type BalTooltipPlacement = 'top' | 'right' | 'bottom' | 'left'
}

namespace BalEvents {
  export interface BalTooltipCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalTooltipElement
  }

  export type BalTooltipChangeDetail = boolean
  export type BalTooltipChange = BalTooltipCustomEvent<BalTooltipChangeDetail>

  export type BalTooltipWillAnimateDetail = boolean
  export type BalTooltipWillAnimate = BalTooltipCustomEvent<BalTooltipWillAnimateDetail>

  export type BalTooltipDidAnimateDetail = boolean
  export type BalTooltipDidAnimate = BalTooltipCustomEvent<BalTooltipDidAnimateDetail>
}

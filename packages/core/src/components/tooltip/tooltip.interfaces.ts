export const TOOLTIP_PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const

export type TooltipPlacement = (typeof TOOLTIP_PLACEMENTS)[number]

export interface TooltipCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsTooltipElement
}

export type TooltipWillAnimateDetail = boolean
export type TooltipDidAnimateDetail = boolean

export type TooltipWillAnimate = TooltipCustomEvent<TooltipWillAnimateDetail>
export type TooltipDidAnimate = TooltipCustomEvent<TooltipDidAnimateDetail>

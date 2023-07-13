import { EventEmitter } from '@stencil/core'

export interface TooltipComponentInterface {
  placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
  offset: number
  presented: boolean
  arrow: boolean
  // closable: boolean
  // backdrop: boolean
  reference?: string
  balWillAnimate: EventEmitter<BalEvents.BalTooltipWillAnimateDetail>
  balDidAnimate: EventEmitter<BalEvents.BalTooltipDidAnimateDetail>
  el: HTMLElement
  backdropEl?: HTMLDivElement
  containerEl?: HTMLDivElement
  arrowEl?: HTMLDivElement
  trigger?: Element
  lastTrigger?: Element
}

export interface TooltipVariantRenderer {
  present(component: TooltipComponentInterface): Promise<boolean>
  update(component: TooltipComponentInterface): Promise<boolean>
  dismiss(component: TooltipComponentInterface): Promise<boolean>
}

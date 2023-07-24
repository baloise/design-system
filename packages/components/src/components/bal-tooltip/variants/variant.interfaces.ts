import { EventEmitter } from '@stencil/core'

export interface TooltipComponentInterface {
  placement: 'top' | 'right' | 'bottom' | 'left'
  offset: number
  presented: boolean
  arrow: boolean
  reference?: string
  balWillAnimate: EventEmitter<BalEvents.BalTooltipWillAnimateDetail>
  balDidAnimate: EventEmitter<BalEvents.BalTooltipDidAnimateDetail>
  el: HTMLElement
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

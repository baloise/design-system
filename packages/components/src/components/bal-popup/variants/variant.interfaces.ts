import { EventEmitter } from '@stencil/core'

export type PopupVariant = 'popover' | 'fullscreen' | 'drawer'

export interface PopupComponentInterface {
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
  presented: boolean
  arrow: boolean
  backdrop: boolean
  balWillAnimate: EventEmitter<BalEvents.BalPopupWillAnimateDetail>
  balDidAnimate: EventEmitter<BalEvents.BalPopupDidAnimateDetail>
  el: HTMLElement
  backdropEl?: HTMLDivElement
  containerEl?: HTMLDivElement
  arrowEl?: HTMLDivElement
  trigger?: Element
  lastTrigger?: Element
}

export interface PopupVariantRenderer {
  present(component: PopupComponentInterface): Promise<boolean>
  update(component: PopupComponentInterface): Promise<boolean>
  dismiss(component: PopupComponentInterface): Promise<boolean>
}

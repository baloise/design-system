import { EventEmitter } from '@stencil/core'

export type PopupVariant = 'popover' | 'fullscreen' | 'drawer'

export interface PopupComponentInterface {
  presented: boolean
  balWillAnimate: EventEmitter<BalEvents.BalPopupWillAnimateDetail>
  balDidAnimate: EventEmitter<BalEvents.BalPopupDidAnimateDetail>
  el: HTMLElement
  containerEl?: HTMLDivElement
  arrowEl?: HTMLDivElement
  trigger?: Element
  lastTrigger?: Element
}

export interface PopupVariantRenderer {
  present(component: PopupComponentInterface): Promise<boolean>
  dismiss(component: PopupComponentInterface): Promise<boolean>
}

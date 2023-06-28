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
  offset: number
  presented: boolean
  arrow: boolean
  closable: boolean
  backdrop: boolean
  reference?: string
  balWillAnimate: EventEmitter<BalEvents.BalPopupWillAnimateDetail>
  balDidAnimate: EventEmitter<BalEvents.BalPopupDidAnimateDetail>
  el: HTMLElement
  backdropEl?: HTMLDivElement
  containerEl?: HTMLDivElement
  arrowEl?: HTMLDivElement
  trigger?: Element
  lastTrigger?: Element
  getValue(trigger: Element | HTMLElement, attributeName: string, componentValue: any): any
  getNumberValue(trigger: Element | HTMLElement, attributeName: string, componentValue: number): number
  getBooleanValue(trigger: Element | HTMLElement, attributeName: string, componentValue: boolean): boolean
}

export interface PopupVariantRenderer {
  present(component: PopupComponentInterface): Promise<boolean>
  update(component: PopupComponentInterface): Promise<boolean>
  dismiss(component: PopupComponentInterface): Promise<boolean>
}

import { EventEmitter } from '@stencil/core'

export type ComponentProps = { [key: string]: any }
export type ComponentRef = Function | HTMLElement | string | null

export interface FrameworkDelegate {
  attachViewToDom(container: any, component: any, propsOrDataObj?: any, cssClasses?: string[]): Promise<HTMLElement>
  removeViewFromDom(container: any, component: any): Promise<void>
}

export interface ModalOptions<T extends ComponentRef = ComponentRef> {
  component: T
  componentProps?: ComponentProps
  presentingElement?: HTMLElement
  modalWidth?: number
  cssClass?: string | string[]
  isClosable?: boolean
  hasBackdrop?: boolean
  dataTestId?: string
  delegate?: FrameworkDelegate
  id?: string
}

export interface OverlayEventDetail<T = any> {
  data?: T
  role?: string
}

export interface OverlayInterface {
  el: HTMLElement
  overlayIndex: number
  presented: boolean

  didPresent: EventEmitter<void>
  willPresent: EventEmitter<void>
  willDismiss: EventEmitter<OverlayEventDetail>
  didDismiss: EventEmitter<OverlayEventDetail>

  present(): Promise<void>
  dismiss(data?: any, role?: string): Promise<boolean>
}

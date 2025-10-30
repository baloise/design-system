import { EventEmitter } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'

export type ComponentProps = { [key: string]: any }
// eslint-disable-next-line
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
  backdropDismiss?: boolean
  hasBackdrop?: boolean
  dataTestId?: string
  delegate?: FrameworkDelegate
  id?: string
  space?: 'small' | 'medium' | 'large'
}

export interface OverlayEventDetail<T = any> {
  data?: T
  role?: string
}

export interface OverlayInterface {
  el: HTMLStencilElement
  overlayIndex: number
  presented: boolean

  didPresent: EventEmitter<void>
  willPresent: EventEmitter<void>
  willDismiss: EventEmitter<OverlayEventDetail>
  didDismiss: EventEmitter<OverlayEventDetail>

  present(): Promise<void>
  dismiss(data?: any, role?: string): Promise<boolean>
}

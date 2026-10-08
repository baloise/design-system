import { ComponentRef, FrameworkDelegate } from '@utils'

export interface ModalCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsModalElement
}

export type ModalPresentDetail = void
export interface ModalDismissDetail {
  data?: unknown
  role?: string
}

export interface ModalOptions {
  modalWidth?: number
  closable?: boolean
  component?: ComponentRef
  componentProps?: { [key: string]: any }
  delegate?: FrameworkDelegate
}

export interface ModalController {
  create(options?: ModalOptions): Promise<HTMLDsModalElement>
  dismiss(id?: string, data?: unknown, role?: string): Promise<void>
  dismissAll(): Promise<void>
}

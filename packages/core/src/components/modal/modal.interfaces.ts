export interface ModalCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsModalElement
}

export type ModalPresentDetail = void
export type ModalDismissDetail = void

export interface ModalOptions {
  modalWidth?: number
  closable?: boolean
}

export interface ModalController {
  create(options?: ModalOptions): Promise<HTMLDsModalElement>
  dismiss(id?: string): Promise<void>
  dismissAll(): Promise<void>
}

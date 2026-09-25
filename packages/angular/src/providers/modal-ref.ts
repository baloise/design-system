import { ModalDismissDetail } from '@helvetia-design/core'

/**
 * Scoped to the specific `<ds-modal>` instance returned by `DsModalService.create()` — mirrors
 * Angular Material's `MatDialogRef`. Unlike the deprecated `BalModalService.dismiss(data)`
 * (which dismissed whatever modal was topmost in a shared stack), `dismiss()` here always
 * targets this instance's own element, since there is no shared stack to begin with.
 */
export class DsModalRef<T = unknown> {
  constructor(private readonly element: HTMLDsModalElement) {}

  dismiss(data?: T, role?: string): Promise<void> {
    return this.element.dismiss(data, role)
  }

  onWillDismiss(): Promise<ModalDismissDetail> {
    return new Promise(resolve => {
      this.element.addEventListener(
        'dsWillDismiss',
        (event: CustomEvent<ModalDismissDetail>) => resolve(event.detail),
        { once: true },
      )
    })
  }

  onDidDismiss(): Promise<ModalDismissDetail> {
    return new Promise(resolve => {
      this.element.addEventListener('dsDidDismiss', (event: CustomEvent<ModalDismissDetail>) => resolve(event.detail), {
        once: true,
      })
    })
  }
}

import { ModalDismissDetail } from '@helvetia-design/core'

/**
 * Scoped to the specific `<ds-modal>` instance returned by `DsModalService.create()` — mirrors
 * Angular Material's `MatDialogRef`. Unlike the deprecated `BalModalService.dismiss(data)`
 * (which dismissed whatever modal was topmost in a shared stack), `dismiss()` here always
 * targets this instance's own element, since there is no shared stack to begin with.
 */
export class DsModalRef<T = unknown> {
  private static readonly refs = new WeakMap<HTMLDsModalElement, DsModalRef>()

  /**
   * One ref per `<ds-modal>`: the instance injected into the mounted component and the one
   * returned by `DsModalService.create()` must be the same, so the eager listeners below are
   * registered before `present()` and an early dismiss (e.g. from the component's constructor)
   * is still observed by the caller.
   */
  static for<R = unknown>(element: HTMLDsModalElement): DsModalRef<R> {
    let ref = DsModalRef.refs.get(element)
    if (!ref) {
      ref = new DsModalRef(element)
      DsModalRef.refs.set(element, ref)
    }
    return ref as DsModalRef<R>
  }

  // Listened for eagerly (not lazily, inside onWillDismiss()/onDidDismiss()) so a call made
  // after the event already fired still resolves, instead of awaiting an event that will
  // never happen again.
  private readonly willDismiss = this.onEvent('dsWillDismiss')
  private readonly didDismiss = this.onEvent('dsDidDismiss')

  constructor(private readonly element: HTMLDsModalElement) {}

  dismiss(data?: T, role?: string): Promise<void> {
    return this.element.dismiss(data, role)
  }

  onWillDismiss(): Promise<ModalDismissDetail> {
    return this.willDismiss
  }

  onDidDismiss(): Promise<ModalDismissDetail> {
    return this.didDismiss
  }

  private onEvent(name: 'dsWillDismiss' | 'dsDidDismiss'): Promise<ModalDismissDetail> {
    return new Promise(resolve => {
      const listener = (event: Event) => {
        // The dismiss events bubble, so ignore those of overlays nested in the modal content.
        if (event.target !== this.element) return
        this.element.removeEventListener(name, listener)
        resolve((event as CustomEvent<ModalDismissDetail>).detail)
      }
      this.element.addEventListener(name, listener)
    })
  }
}

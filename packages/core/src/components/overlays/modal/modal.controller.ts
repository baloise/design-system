import {
  addEventListener,
  attachComponent,
  detachComponent,
  dsBrowser,
  getRootElement,
  removeEventListener,
} from '@utils'
import { ModalController, ModalOptions } from './modal.interfaces'

export type { ModalOptions, ModalController } from './modal.interfaces'

class ModalControllerImpl implements ModalController {
  async create(options: ModalOptions = {}): Promise<HTMLDsModalElement> {
    const element = document.createElement('ds-modal') as HTMLDsModalElement

    if (options.modalWidth !== undefined) element.modalWidth = options.modalWidth
    if (options.closable !== undefined) element.closable = options.closable
    if (options.fullscreen !== undefined) element.fullscreen = options.fullscreen
    if (options.label !== undefined) element.label = options.label

    // Append to the document before mounting the component so a custom-element
    // component ref connects and completes its own lifecycle (componentOnReady).
    const root = getRootElement(document)
    root.appendChild(element)

    let hostElement: HTMLElement | undefined
    try {
      if (options.component !== undefined) {
        hostElement = await attachComponent(options.delegate, element, options.component, [], options.componentProps)
      }
    } catch (error) {
      element.remove()
      throw error
    }

    // Destroy the mounted component (otherwise e.g. Angular's component ref leaks) while the
    // modal is still connected, then remove the modal itself. Only modals that mount a
    // `component` are removed: they are owned by this controller and can't be re-presented
    // anyway, whereas a plain modal's element may still be reused by the caller.
    const cleanup = () =>
      detachComponent(options.delegate, hostElement).finally(() => {
        if (hostElement !== undefined) element.remove()
      })

    // `dsDidDismiss` bubbles, so overlays nested in the mounted component (popup, drawer,
    // another modal) would otherwise trigger this cleanup while the modal is still open.
    const onDidDismiss = (event: Event) => {
      if (event.target !== element) return
      removeEventListener(element, 'dsDidDismiss', onDidDismiss)
      void cleanup()
    }
    addEventListener(element, 'dsDidDismiss', onDidDismiss)

    try {
      await element.present()
    } catch (error) {
      // dsDidDismiss never fires when present() fails, so clean up here instead.
      await cleanup().catch(() => undefined)
      throw error
    }
    return element
  }

  async dismiss(id?: string, data?: unknown, role?: string): Promise<void> {
    if (!dsBrowser.hasDocument) return

    const selector = id ? `ds-modal#${CSS.escape(id)}` : 'ds-modal[open]'
    const modal = document.querySelector(selector) as HTMLDsModalElement | null
    await modal?.dismiss(data, role)
  }

  async dismissAll(): Promise<void> {
    if (!dsBrowser.hasDocument) return

    const modals = Array.from(document.querySelectorAll('ds-modal[open]')) as HTMLDsModalElement[]
    await Promise.all(modals.map(m => m.dismiss()))
  }
}

export const dsModalController: ModalController = new ModalControllerImpl()

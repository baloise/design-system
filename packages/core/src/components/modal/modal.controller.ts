import { dsBrowser, getAppRoot } from '@utils'
import { ModalController, ModalOptions } from './modal.interfaces'

export type { ModalOptions, ModalController } from './modal.interfaces'

class ModalControllerImpl implements ModalController {
  async create(options: ModalOptions = {}): Promise<HTMLDsModalElement> {
    const element = document.createElement('ds-modal') as HTMLDsModalElement

    if (options.modalWidth !== undefined) element.modalWidth = options.modalWidth
    if (options.closable !== undefined) element.closable = options.closable

    const root = getAppRoot(document)
    root.appendChild(element)

    await element.present()
    return element
  }

  async dismiss(id?: string): Promise<void> {
    if (!dsBrowser.hasDocument) return

    const selector = id ? `ds-modal#${id}` : 'ds-modal[open]'
    const modal = document.querySelector(selector) as HTMLDsModalElement | null
    await modal?.dismiss()
  }

  async dismissAll(): Promise<void> {
    if (!dsBrowser.hasDocument) return

    const modals = Array.from(document.querySelectorAll('ds-modal[open]')) as HTMLDsModalElement[]
    await Promise.all(modals.map(m => m.dismiss()))
  }
}

export const dsModalController: ModalController = new ModalControllerImpl()

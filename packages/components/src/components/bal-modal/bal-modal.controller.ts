import { getOverlays } from '../../utils/overlays/overlays'
import { componentOnReady, getAppRoot } from '../../utils/helpers'
import { getOverlay } from '../../utils/overlays/overlays'
import { ModalOptions } from './bal-modal.type'
import { balBrowser } from '../../utils/browser'

export * from './bal-modal.type'

export class BalModalController {
  tag = 'bal-modal'
  create(options: ModalOptions): Promise<HTMLBalModalElement> {
    /* tslint:disable-next-line */
    if (balBrowser.hasWindow && typeof customElements !== 'undefined') {
      return customElements.whenDefined(this.tag).then(() => {
        const element = document.createElement(this.tag) as HTMLBalModalElement

        // convert the passed in overlay options into props
        // that get passed down into the new overlay
        Object.assign(element, options)

        // append the overlay element to the document body
        getAppRoot(document).appendChild(element)

        return new Promise(resolve => componentOnReady(element, resolve))
      })
    }
    return Promise.resolve() as any
  }

  async dismissAll(data?: any, role?: string): Promise<void> {
    if (balBrowser.hasDocument) {
      const overlays = getOverlays(document, this.tag)
      await Promise.all(overlays.map(o => o.dismiss(data, role)))
    }
  }

  dismiss(data?: any, role?: string, id?: string): Promise<boolean> {
    if (balBrowser.hasDocument) {
      const overlay = getOverlay(document, this.tag, id)
      if (!overlay) {
        return Promise.reject('overlay does not exist')
      }
      return overlay.dismiss(data, role)
    }
    return Promise.resolve(false)
  }

  async getTop(): Promise<HTMLBalModalElement | undefined> {
    if (balBrowser.hasDocument) {
      return getOverlay(document, this.tag) as any
    }
    return
  }
}

export const balModalController = new BalModalController()

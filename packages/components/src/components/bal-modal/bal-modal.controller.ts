import { getOverlays } from '../../utils/overlays/overlays'
import { componentOnReady, getAppRoot } from '../../utils/helpers'
import { getOverlay } from '../../utils/overlays/overlays'
import { ModalOptions } from './bal-modal.type'
import { balBrowser } from '../../utils/browser'

export * from './bal-modal.type'

export class BalModalController {
  tag = 'bal-modal'
  create(options: ModalOptions): Promise<HTMLBalModalElement> {
    console.log('create', options)
    console.log('customElements', customElements)
    console.log('balBrowser.hasDocument', balBrowser.hasDocument)
    /* tslint:disable-next-line */
    if (typeof customElements !== 'undefined' && balBrowser.hasDocument) {
      console.log('entered if clause')
      return customElements.whenDefined(this.tag).then(() => {
        console.log('customElements.whenDefined')
        const element = document.createElement(this.tag) as HTMLBalModalElement
        console.log('element', element)
        // convert the passed in overlay options into props
        // that get passed down into the new overlay
        Object.assign(element, options)

        // append the overlay element to the document body
        getAppRoot(document).appendChild(element)
        console.log('getAppRoot.appendChild')

        return new Promise(resolve => componentOnReady(element, resolve))
      })
    } else {
      console.log('else')
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

import { componentOnReady, getAppRoot } from '../../../helpers/helpers'
import { getOverlay } from '../../../helpers/overlays'
import { ModalOptions } from './bal-modal.type'

export class BalModalController {
  tag = 'bal-modal'
  create(options: ModalOptions): Promise<HTMLBalModalElement> {
    /* tslint:disable-next-line */
    if (typeof customElements !== 'undefined') {
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

  dismiss(data?: any, role?: string, id?: string): Promise<boolean> {
    const overlay = getOverlay(document, this.tag, id)
    if (!overlay) {
      return Promise.reject('overlay does not exist')
    }
    return overlay.dismiss(data, role)
  }

  async getTop(): Promise<HTMLBalModalElement | undefined> {
    return getOverlay(document, this.tag) as any
  }
}

export const balModalController = new BalModalController()

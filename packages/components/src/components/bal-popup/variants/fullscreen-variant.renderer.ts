import { AbstractVariantRenderer } from './abstract-variant.renderer'
import { PopupVariantRenderer, PopupComponentInterface } from './variant.interfaces'

export class FullscreenVariantRenderer extends AbstractVariantRenderer implements PopupVariantRenderer {
  offset = 0

  async present(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl && component.trigger) {
      this.offset = component.getValue(component.trigger, 'bal-popup-offset', component.offset)

      component.containerEl.style.setProperty('inset', `${this.offset}px auto auto 0px`)

      this.showBackdropElement(component)
      this.showContainerElement(component)
      this.showArrowElement(component)

      component.containerEl.classList.add('container')
      return true
    }
    return false
  }

  async update(_component: PopupComponentInterface): Promise<boolean> {
    return false
  }

  async dismiss(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl) {
      this.hideBackdropElement(component)
      this.hideContainerElement(component)
      this.hideArrowElement(component)
      component.containerEl.style.removeProperty('inset')
      component.containerEl.classList.remove('container')
      return true
    }
    return false
  }
}

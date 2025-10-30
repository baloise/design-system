import { AbstractVariantRenderer } from './abstract-variant.renderer'
import { PopupComponentInterface, PopupVariantRenderer } from './variant.interfaces'

export class FullscreenVariantRenderer extends AbstractVariantRenderer implements PopupVariantRenderer {
  offset = 0

  async present(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl && component.trigger) {
      this.offset = component.getValue(component.trigger, 'bal-popup-offset', component.offset)

      component.containerEl.style.setProperty('inset', `${this.offset}px auto auto 0px`)
      if (this.offset > 0) {
        component.containerEl.style.setProperty('box-shadow', `inset var(--bal-nav-meta-bar-variant-white-shadow)`)
      }

      if (component.innerEl) {
        component.innerEl.style.setProperty('max-height', `calc(var(--bal-app-height, 100%) - ${this.offset}px)`)
      }

      this.showBackdropElement(component)
      this.showContainerElement(component)
      this.hideArrowElement(component)

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

      component.containerEl.style.removeProperty('box-shadow')
      component.containerEl.style.removeProperty('inset')

      if (component.innerEl) {
        component.innerEl.style.removeProperty('max-height')
      }

      return true
    }
    return false
  }
}

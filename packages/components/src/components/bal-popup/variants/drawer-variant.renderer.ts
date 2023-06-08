import { AbstractVariantRenderer } from './abstract-variant.renderer'
import { PopupVariantRenderer, PopupComponentInterface } from './variant.interfaces'

export class DrawerVariantRenderer extends AbstractVariantRenderer implements PopupVariantRenderer {
  async present(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl) {
      component.containerEl.style.setProperty('inset', `auto 0px 0px 0px`)
      component.containerEl.classList.add('container')
      this.showBackdropElement(component)
      this.showContainerElement(component)
      this.showArrowElement(component)
      return true
    }
    return false
  }

  async update(_component: PopupComponentInterface): Promise<boolean> {
    return false
  }

  async dismiss(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl) {
      component.balWillAnimate.emit()
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

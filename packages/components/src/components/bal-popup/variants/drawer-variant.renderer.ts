import { PopupVariantRenderer, PopupComponentInterface } from './variant.interfaces'

export class DrawerVariantRenderer implements PopupVariantRenderer {
  async present(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl && component.arrowEl) {
      component.balWillAnimate.emit()
      component.containerEl.style.setProperty('inset', `auto auto 0px 0px`)
      component.presented = true
      component.balDidAnimate.emit()
      return true
    }
    return false
  }

  async dismiss(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl && component.arrowEl) {
      component.balWillAnimate.emit()
      component.containerEl.style.removeProperty('inset')
      component.presented = false
      component.balDidAnimate.emit()
      return true
    }
    return false
  }
}

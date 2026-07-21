import { PopupVariantRenderer, PopupComponentInterface } from './variant.interfaces'

export class VariantRenderer implements PopupVariantRenderer {
  constructor(private renderer: PopupVariantRenderer) {}

  async present(component: PopupComponentInterface): Promise<boolean> {
    component.balWillAnimate.emit()
    const didRender = await this.renderer.present(component)
    if (didRender) {
      component.presented = true
      component.balDidAnimate.emit()
    }
    return didRender
  }

  async update(component: PopupComponentInterface): Promise<boolean> {
    component.balWillAnimate.emit()
    const didRender = await this.renderer.update(component)
    if (didRender) {
      component.balDidAnimate.emit()
    }
    return didRender
  }

  async dismiss(component: PopupComponentInterface): Promise<boolean> {
    component.balWillAnimate.emit()
    const didRender = await this.renderer.dismiss(component)
    if (didRender) {
      component.presented = false
      component.balDidAnimate.emit()
    }
    return didRender
  }
}

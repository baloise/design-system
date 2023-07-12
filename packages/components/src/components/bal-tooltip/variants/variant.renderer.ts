import { TooltipVariantRenderer, TooltipComponentInterface } from './variant.interfaces'

export class VariantRenderer implements TooltipVariantRenderer {
  constructor(private renderer: TooltipVariantRenderer) {}

  async present(component: TooltipComponentInterface): Promise<boolean> {
    component.balWillAnimate.emit()
    const didRender = await this.renderer.present(component)
    if (didRender) {
      component.presented = true
      component.balDidAnimate.emit()
    }
    return didRender
  }

  async update(component: TooltipComponentInterface): Promise<boolean> {
    component.balWillAnimate.emit()
    const didRender = await this.renderer.update(component)
    if (didRender) {
      component.balDidAnimate.emit()
    }
    return didRender
  }

  async dismiss(component: TooltipComponentInterface): Promise<boolean> {
    component.balWillAnimate.emit()
    const didRender = await this.renderer.dismiss(component)
    if (didRender) {
      component.presented = false
      component.balDidAnimate.emit()
    }
    return didRender
  }
}

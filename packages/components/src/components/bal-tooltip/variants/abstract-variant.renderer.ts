import { TooltipVariantRenderer, TooltipComponentInterface } from './variant.interfaces'

export abstract class AbstractVariantRenderer implements TooltipVariantRenderer {
  abstract present(component: TooltipComponentInterface): Promise<boolean>
  abstract update(component: TooltipComponentInterface): Promise<boolean>
  abstract dismiss(component: TooltipComponentInterface): Promise<boolean>

  showContainerElement(component: TooltipComponentInterface) {
    if (component.containerEl) {
      this.showElement(component.containerEl)
    }
  }

  hideContainerElement(component: TooltipComponentInterface) {
    if (component.containerEl) {
      this.hideElement(component.containerEl)
    }
  }

  showArrowElement(component: TooltipComponentInterface, hasArrow = component.arrow) {
    if (hasArrow && component.arrowEl) {
      this.showElement(component.arrowEl)
    }
  }

  hideArrowElement(component: TooltipComponentInterface) {
    if (component.arrowEl) {
      Object.assign(component.arrowEl.style, {
        left: '',
        top: '',
        display: 'none',
        visibility: 'hidden',
      })
    }
  }

  showElement(element?: HTMLElement) {
    if (element) {
      element.style.setProperty('display', 'block')
      element.style.setProperty('visibility', 'visible')
    }
  }

  hideElement(element?: HTMLElement) {
    if (element) {
      element.style.removeProperty('display')
      element.style.removeProperty('visibility')
    }
  }
}

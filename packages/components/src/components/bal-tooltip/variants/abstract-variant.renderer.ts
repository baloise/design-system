import { PopupVariantRenderer, PopupComponentInterface } from './variant.interfaces'

export abstract class AbstractVariantRenderer implements PopupVariantRenderer {
  abstract present(component: PopupComponentInterface): Promise<boolean>
  abstract update(component: PopupComponentInterface): Promise<boolean>
  abstract dismiss(component: PopupComponentInterface): Promise<boolean>

  showContainerElement(component: PopupComponentInterface) {
    if (component.containerEl) {
      this.showElement(component.containerEl)
    }
  }

  hideContainerElement(component: PopupComponentInterface) {
    if (component.containerEl) {
      this.hideElement(component.containerEl)
    }
  }

  showArrowElement(component: PopupComponentInterface, hasArrow = component.arrow) {
    if (hasArrow && component.arrowEl) {
      this.showElement(component.arrowEl)
    }
  }

  hideArrowElement(component: PopupComponentInterface) {
    if (component.arrowEl) {
      Object.assign(component.arrowEl.style, {
        left: '',
        top: '',
        display: 'none',
        visibility: 'hidden',
      })
    }
  }

  // showBackdropElement(component: PopupComponentInterface, hasBackdrop = component.backdrop) {
  //   if (hasBackdrop && component.backdropEl) {
  //     this.showElement(component.backdropEl)
  //   }
  // }

  // hideBackdropElement(component: PopupComponentInterface) {
  //   if (component.backdropEl) {
  //     this.hideElement(component.backdropEl)
  //   }
  // }

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

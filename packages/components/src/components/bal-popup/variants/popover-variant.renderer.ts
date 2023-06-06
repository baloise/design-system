import { balBrowser } from '../../../utils/browser'
import { getComputedPadding } from '../../../utils/style'
import { PopupVariantRenderer, PopupComponentInterface } from './variant.interfaces'

export class PopoverVariantRenderer implements PopupVariantRenderer {
  async present(component: PopupComponentInterface): Promise<boolean> {
    if (!component.trigger && balBrowser.hasDocument) {
      const firstTrigger = Array.from(document.querySelectorAll(`[bal-popup="${component.el.id}"]`))[0]
      component.trigger = firstTrigger
    }

    if (component.trigger && component.containerEl && component.arrowEl) {
      const { width, height, x, y } = component.trigger.getBoundingClientRect()
      const halfWidth = window.innerWidth / 2
      const useLeft = halfWidth > x + width

      const containerParent = (component.trigger as any).offsetParent
      let containerPadding = { top: 0, right: 0, bottom: 0, left: 0 }
      if (containerParent) {
        containerPadding = getComputedPadding(containerParent)
      }

      component.balWillAnimate.emit()
      if (useLeft) {
        component.arrowEl.style.setProperty('inset', `0px auto auto 0px`)
        component.containerEl.style.setProperty('inset', `0px auto auto 0px`)
        component.containerEl.style.setProperty('margin', `0 2rem 0 0`)

        component.arrowEl.style.setProperty(
          'transform',
          `translate3d(${containerPadding.left + width / 2}px, ${y + height + 12}px, 0px)`,
        )
        component.containerEl.style.setProperty(
          'transform',
          `translate3d(${containerPadding.left}px, ${y + height + 16}px, 0px)`,
        )
        component.trigger.classList.add('bal-popup-variant-popover-trigger')
      } else {
        component.arrowEl.style.setProperty('inset', `0px 0px auto auto`)
        component.containerEl.style.setProperty('inset', `0px 0px auto auto`)
        component.containerEl.style.setProperty('margin', `0 0 0 2rem`)

        component.arrowEl.style.setProperty(
          'transform',
          `translate3d(-${containerPadding.right + width / 2}px, ${y + height + 12}px, 0px)`,
        )
        component.containerEl.style.setProperty(
          'transform',
          `translate3d(-${containerPadding.right}px, ${y + height + 16}px, 0px)`,
        )
        component.trigger.classList.remove('bal-popup-variant-popover-trigger')
      }

      component.presented = true
      component.balDidAnimate.emit()
      return true
    }
    return false
  }

  async dismiss(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl && component.arrowEl && component.trigger) {
      component.balWillAnimate.emit()
      component.arrowEl.style.removeProperty('inset')
      component.arrowEl.style.removeProperty('transform')
      component.containerEl.style.removeProperty('inset')
      component.containerEl.style.removeProperty('transform')
      component.containerEl.style.removeProperty('margin')
      component.trigger.classList.remove('bal-popup-variant-popover-trigger')

      component.presented = false
      component.balDidAnimate.emit()
      return true
    }
    return false
  }
}

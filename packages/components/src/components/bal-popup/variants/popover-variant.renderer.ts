import { computePosition, shift, offset, arrow, flip, autoUpdate } from '@floating-ui/dom'
import { balBrowser } from '../../../utils/browser'
import { AbstractVariantRenderer } from './abstract-variant.renderer'
import { PopupVariantRenderer, PopupComponentInterface } from './variant.interfaces'

export class PopoverVariantRenderer extends AbstractVariantRenderer implements PopupVariantRenderer {
  private cleanup?: () => void

  async present(component: PopupComponentInterface): Promise<boolean> {
    //
    // identify trigger element or the the closest trigger available
    if (!component.trigger && balBrowser.hasDocument) {
      const firstTrigger = Array.from(document.querySelectorAll(`[bal-popup="${component.el.id}"]`))[0]
      component.trigger = firstTrigger
    }

    if (component.trigger && component.containerEl && component.arrowEl) {
      this.showBackdropElement(component)
      this.showContainerElement(component)
      this.showArrowElement(component)
      component.trigger.classList.add('bal-popup-variant-popover-trigger')

      this.cleanup = autoUpdate(component.trigger, component.containerEl, () => {
        this.update(component)
      })

      return true
    }
    return false
  }

  async update(component: PopupComponentInterface): Promise<boolean> {
    if (component.trigger && component.containerEl && component.arrowEl) {
      computePosition(component.trigger, component.containerEl, {
        placement: component.placement,
        middleware: [
          shift(),
          flip(),
          offset(component.arrow ? 16 : 0),
          arrow({
            element: component.arrowEl,
            padding: 4,
          }),
        ],
      }).then(({ x, y, middlewareData, placement }) => {
        const side = placement.split('-')[0]

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[side] as string

        if (component.containerEl) {
          Object.assign(component.containerEl.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
        }

        if (middlewareData.arrow && component.arrowEl) {
          const arrowPosition = middlewareData.arrow
          Object.assign(component.arrowEl.style, {
            left: x != null && arrowPosition.x != null ? `${arrowPosition.x}px` : '',
            top: y != null && arrowPosition.y != null ? `${arrowPosition.y}px` : '',
            right: '',
            bottom: '',
            [staticSide]: `${-4}px`,
          })
        }
      })
      return true
    }
    return false
  }

  async dismiss(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl && component.arrowEl && component.trigger) {
      if (this.cleanup) {
        this.cleanup()
      }

      component.trigger.classList.remove('bal-popup-variant-popover-trigger')

      this.hideBackdropElement(component)
      this.hideContainerElement(component)
      this.hideArrowElement(component)

      return true
    }
    return false
  }
}

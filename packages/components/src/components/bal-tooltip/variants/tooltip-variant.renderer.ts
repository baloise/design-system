import { computePosition, shift, offset, arrow, flip, autoUpdate } from '@floating-ui/dom'
import { balBrowser } from '../../../utils/browser'
import { AbstractVariantRenderer } from './abstract-variant.renderer'
import { TooltipVariantRenderer, TooltipComponentInterface } from './variant.interfaces'

export class MainVariantRenderer extends AbstractVariantRenderer implements TooltipVariantRenderer {
  private cleanup?: () => void
  private placement: BalProps.BalTooltipPlacement = 'bottom'

  async present(component: TooltipComponentInterface): Promise<boolean> {
    //
    // identify trigger element or the the closest trigger available
    if (!component.trigger && balBrowser.hasDocument) {
      const firstTrigger = Array.from(document.querySelectorAll(`[bal-tooltip="${component.reference}"]`))[0]
      component.trigger = firstTrigger
    }

    if (component.trigger && component.containerEl && component.arrowEl) {
      //
      // get placement type of the trigger
      const triggerVariantAttr = component.trigger.attributes.getNamedItem('bal-popup-placement')
      if (triggerVariantAttr) {
        this.placement = triggerVariantAttr.value as BalProps.BalTooltipPlacement
      } else {
        this.placement = component.placement
      }

      //
      // show all required elements
      // this.showBackdropElement(component)
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

  async update(component: TooltipComponentInterface): Promise<boolean> {
    if (component.trigger && component.containerEl && component.arrowEl) {
      computePosition(component.trigger, component.containerEl, {
        placement: this.placement,
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

  async dismiss(component: TooltipComponentInterface): Promise<boolean> {
    if (component.containerEl && component.arrowEl && component.trigger) {
      if (this.cleanup) {
        this.cleanup()
      }

      component.trigger.classList.remove('bal-popup-variant-popover-trigger')

      // this.hideBackdropElement(component)
      this.hideContainerElement(component)
      this.hideArrowElement(component)

      return true
    }
    return false
  }
}

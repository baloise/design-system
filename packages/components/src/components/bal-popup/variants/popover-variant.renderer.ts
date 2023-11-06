import { computePosition, offset, arrow, flip, shift, autoUpdate } from '@floating-ui/dom'
import { balBrowser } from '../../../utils/browser'
import { AbstractVariantRenderer } from './abstract-variant.renderer'
import { PopupVariantRenderer, PopupComponentInterface } from './variant.interfaces'

export class PopoverVariantRenderer extends AbstractVariantRenderer implements PopupVariantRenderer {
  private cleanup?: () => void
  private placement: BalProps.BalPopupPlacement = 'bottom'
  private offset = 0
  private arrow = false
  private backdrop = false
  private reference?: string = undefined
  private triggerEl: Element | null = null

  async present(component: PopupComponentInterface): Promise<boolean> {
    //
    // identify trigger element or the the closest trigger available
    if (!component.trigger && balBrowser.hasDocument) {
      const firstTrigger = Array.from(document.querySelectorAll(`[bal-popup="${component.el.id}"]`))[0]
      component.trigger = firstTrigger
    }

    if (component.trigger && component.containerEl && component.arrowEl) {
      this.placement = component.getValue(component.trigger, 'bal-popup-placement', component.placement)
      this.arrow = component.getBooleanValue(component.trigger, 'bal-popup-arrow', component.arrow)
      this.backdrop = component.getBooleanValue(component.trigger, 'bal-popup-backdrop', component.backdrop)
      this.reference = component.getValue(component.trigger, 'bal-popup-reference', component.reference)
      this.offset = component.getNumberValue(component.trigger, 'bal-popup-offset', component.offset)
      this.triggerEl = component.trigger

      if (this.reference && balBrowser.hasDocument) {
        const referenceEl = document.getElementById(this.reference)
        this.triggerEl = referenceEl ? referenceEl : component.trigger
      }

      if (this.triggerEl) {
        //
        // show all required elements
        this.showContainerElement(component)
        this.showBackdropElement(component, this.backdrop)
        this.showArrowElement(component, this.arrow)

        this.triggerEl.classList.add('bal-popup-variant-popover-trigger')

        const isNavMetaDesktopPopup = this.placement === 'bottom-end' && this.triggerEl !== component.trigger
        if (isNavMetaDesktopPopup) {
          component.setMinWidth(this.triggerEl.clientWidth)
        }

        this.cleanup = autoUpdate(
          this.triggerEl,
          component.containerEl,
          () => {
            this.update(component)
          },
          {
            ancestorScroll: true,
            ancestorResize: true,
            elementResize: false,
            layoutShift: true,
            animationFrame: true,
          },
        )

        return true
      }
    }
    return false
  }

  async update(component: PopupComponentInterface): Promise<boolean> {
    if (this.triggerEl && component.trigger && component.containerEl && component.arrowEl) {
      const isNavMetaDesktopPopup = this.placement === 'bottom-end' && this.triggerEl !== component.trigger
      const referenceRect = this.triggerEl?.getBoundingClientRect()
      const triggerRect = component.trigger?.getBoundingClientRect()

      let isInFrame = false
      if (balBrowser.hasWindow) {
        isInFrame = !!window.frameElement
      }

      computePosition(this.triggerEl, component.containerEl, {
        placement: this.placement,
        middleware: [
          isInFrame ? undefined : shift(),
          flip(),
          offset(this.arrow ? 16 : this.offset),
          arrow({
            element: component.arrowEl,
            padding: 4,
          }),
        ],
      }).then(({ x, y, middlewareData, placement }) => {
        if (component.containerEl) {
          Object.assign(component.containerEl.style, {
            left: `${x}px`,
            top: `${y}px`,
          })

          const side = placement.split('-')[0]

          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[side] as string

          if (middlewareData.arrow && component.arrowEl) {
            const arrowPosition = middlewareData.arrow

            if (isNavMetaDesktopPopup) {
              const diff = referenceRect.right - triggerRect.right - 4
              Object.assign(component.arrowEl.style, {
                right: `${diff + triggerRect.width / 2}px`,
                left: '',
                top: y != null && arrowPosition.y != null ? `${arrowPosition.y}px` : '',
                bottom: '',
                [staticSide]: `${-4}px`,
              })
            } else {
              Object.assign(component.arrowEl.style, {
                left: x != null && arrowPosition.x != null ? `${arrowPosition.x}px` : '',
                top: y != null && arrowPosition.y != null ? `${arrowPosition.y}px` : '',
                right: '',
                bottom: '',
                [staticSide]: `${-4}px`,
              })
            }
          }
        }
      })
      return true
    }
    return false
  }

  async dismiss(component: PopupComponentInterface): Promise<boolean> {
    if (component.containerEl && component.arrowEl && this.triggerEl) {
      if (this.cleanup) {
        this.cleanup()
      }

      this.triggerEl.classList.remove('bal-popup-variant-popover-trigger')

      this.hideBackdropElement(component)
      this.hideContainerElement(component)
      this.hideArrowElement(component)

      return true
    }
    return false
  }
}

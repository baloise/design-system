import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  State,
  Watch,
  Method,
  EventEmitter,
  Event,
} from '@stencil/core'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { BEM } from '../../utils/bem'
import { balBrowser } from '../../utils/browser'
import { balDevice } from '../../utils/device'
import { showContainerElement, showArrowElement, hideContainerElement, hideArrowElement } from './bal-tooltip.util'
import { computePosition, offset, arrow, flip, autoUpdate, shift } from '@floating-ui/dom'

@Component({
  tag: 'bal-tooltip',
  styleUrl: 'bal-tooltip.sass',
  shadow: true,
})
export class Tooltip implements ComponentInterface, Loggable {
  private tooltipId = `bal-to-${tooltipIds++}`

  @Element() el!: HTMLElement

  private containerEl: HTMLDivElement | undefined
  private contentEl: HTMLDivElement | undefined
  private arrowEl: HTMLDivElement | undefined
  private trigger: Element | undefined
  private cleanup?: () => void

  log!: LogInstance

  @Logger('bal-tooltip')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Id of the reference element default is the trigger element.
   */
  @Prop() reference = ''

  /**
   * If set it turns a tooltip into a fullscreen or a drawer on touch devices
   */
  @Prop() placement: BalProps.BalTooltipPlacement = 'bottom'

  /**
   * Offset form trigger to tooltip.
   */
  @Prop() offset = 0

  /**
   * @internal
   */
  @Prop() demo = false

  /**
   * Internal active state
   */
  @State() presented = false
  /**
   * Defines the width of the content
   */
  @Prop() contentWidth?: number
  @Watch('contentWidth')
  contentWidthChanged(newValue?: number, oldValue?: number) {
    if (newValue !== oldValue) {
      if (newValue === undefined) {
        this.el.style.removeProperty('--bal-tooltip-max-width')
      } else {
        this.el.style.setProperty('--bal-tooltip-max-width', `${this.contentWidth}px`)
      }
    }
  }

  /**
   * Emitted before the animation starts
   */
  @Event() balWillAnimate!: EventEmitter<BalEvents.BalTooltipWillAnimateDetail>

  /**
   * Emitted after the animation has finished
   */
  @Event() balDidAnimate!: EventEmitter<BalEvents.BalTooltipDidAnimateDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  // componentDidRender() {
  //   if (this.demo) {
  //     this.present()
  //   }
  // }

  componentDidLoad(): void {
    this.contentWidthChanged(this.contentWidth, 0)

    if (!balDevice.hasTouchScreen) {
      let showEvents: string[] = []
      let hideEvents: string[] = []

      showEvents = ['mouseenter', 'focus']
      hideEvents = ['mouseleave', 'blur']

      showEvents.forEach(event => {
        if (this.triggerElement) {
          this.triggerElement.addEventListener(event, () => this.present())
        }
      })

      hideEvents.forEach(event => {
        if (this.triggerElement) {
          this.triggerElement.addEventListener(event, () => this.dismiss())
        }
      })
    }

    if (this.demo) {
      this.present()
    }
  }

  /**
   * INTERNAL METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal
   */
  @Method()
  async present(): Promise<boolean> {
    //
    // identify trigger element or the the closest trigger available
    if (!this.trigger && balBrowser.hasDocument) {
      const firstTrigger = Array.from(document.querySelectorAll(`[id="${this.reference}"]`))[0]
      this.trigger = firstTrigger
    }

    if (this.trigger && this.containerEl && this.arrowEl) {
      this.balWillAnimate.emit()
      //
      // get placement type of the trigger
      const triggerVariantAttr = this.trigger.attributes.getNamedItem('bal-tooltip-placement')
      if (triggerVariantAttr) {
        this.placement = triggerVariantAttr.value as BalProps.BalTooltipPlacement
      } else {
        this.placement = this.placement
      }

      //
      // show all required elements
      showContainerElement(this.containerEl)
      showArrowElement(this.arrowEl)
      this.trigger.classList.add('bal-tooltip-trigger')
      this.presented = true

      this.cleanup = autoUpdate(
        this.trigger,
        this.containerEl,
        () => {
          this.update()
        },
        {
          ancestorScroll: true,
          ancestorResize: true,
          elementResize: false,
          layoutShift: true,
          animationFrame: true,
        },
      )

      this.balDidAnimate.emit()

      return true
    }
    return false
  }

  /**
   * @internal
   */
  @Method()
  async dismiss(): Promise<boolean> {
    if (this.containerEl && this.arrowEl && this.trigger) {
      this.balWillAnimate.emit()

      if (this.cleanup) {
        this.cleanup()
      }

      this.trigger.classList.remove('bal-tooltip-trigger')

      hideContainerElement(this.containerEl)
      hideArrowElement(this.arrowEl)
      this.presented = false
      this.balDidAnimate.emit()

      return true
    }
    return false
  }

  /**
   * @internal
   */
  @Method()
  async update(): Promise<boolean> {
    if (this.trigger && this.containerEl && this.arrowEl) {
      this.balWillAnimate.emit()

      let isInFrame = false
      if (balBrowser.hasWindow) {
        isInFrame = !!window.frameElement
      }

      computePosition(this.trigger, this.containerEl, {
        placement: this.placement,
        middleware: [
          isInFrame ? undefined : shift(),
          flip(),
          offset(8),
          arrow({
            element: this.arrowEl,
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

        if (this.containerEl) {
          Object.assign(this.containerEl.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
        }

        if (middlewareData.arrow && this.arrowEl) {
          const arrowPosition = middlewareData.arrow
          Object.assign(this.arrowEl.style, {
            left: x != null && arrowPosition.x != null ? `${arrowPosition.x}px` : '',
            top: y != null && arrowPosition.y != null ? `${arrowPosition.y}px` : '',
            right: '',
            bottom: '',
            [staticSide]: `${-4}px`,
          })
        }
      })
      this.balDidAnimate.emit()

      return true
    }
    return false
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get triggerElement(): HTMLElement | null {
    return document.querySelector(`[id="${this.reference}"]`)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('tooltip')
    const containerBlock = block.element('container')
    const arrowBlock = block.element('arrow')
    const innerBlock = block.element('inner')
    const innerContentBlock = innerBlock.element('content')

    return (
      <Host
        class={{
          ...block.class(),
        }}
        role="dialog"
        aria-hidden={`${this.presented !== true}`}
        aria-modal={`${this.presented === true}`}
        aria-presented={`${this.presented === true}`}
      >
        <div
          class={{
            ...containerBlock.class(),
          }}
          ref={containerEl => (this.containerEl = containerEl)}
        >
          <div
            class={{
              ...arrowBlock.class(),
            }}
            ref={arrowEl => (this.arrowEl = arrowEl)}
          ></div>
          <bal-stack
            layout="vertical"
            class={{
              ...innerBlock.class(),
            }}
          >
            <div
              class={{
                ...innerContentBlock.class(),
              }}
              ref={contentEl => (this.contentEl = contentEl)}
              data-test="bal-tooltip-content"
            >
              <slot></slot>
            </div>
          </bal-stack>
        </div>
      </Host>
    )
  }
}

let tooltipIds = 0

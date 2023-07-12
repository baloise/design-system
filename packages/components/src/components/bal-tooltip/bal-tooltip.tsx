import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  State,
  // Listen,
  Watch,
  Method,
  EventEmitter,
  Event,
} from '@stencil/core'
// import { isEscapeKey } from '@baloise/web-app-utils'
import { BEM } from '../../utils/bem'
// import { balBrowser } from '../../utils/browser'
// import { stopEventBubbling } from '../../utils/form-input'
import { PopupComponentInterface, TooltipVariantRenderer } from './variants'
// import { debounce } from '../../utils/helpers'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { VariantRenderer } from './variants/variant.renderer'
// import { balBrowser } from '../../utils/browser'
// import { focusableQueryString } from '../../utils/focus-visible'

@Component({
  tag: 'bal-tooltip',
  styleUrls: {
    css: 'bal-tooltip.sass',
  },
})
export class Tooltip implements ComponentInterface, PopupComponentInterface, Loggable {
  private tooltipId = `bal-to-${tooltipIds++}`

  private tooltipVariantRenderer = new VariantRenderer(new TooltipVariantRenderer())

  @Element() el!: HTMLElement
  containerEl: HTMLDivElement | undefined
  contentEl: HTMLDivElement | undefined
  arrowEl: HTMLDivElement | undefined

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
   * If set it turns a popover into a fullscreen or a drawer on touch devices
   */
  @Prop() placement: BalProps.BalTooltipPlacement = 'bottom'
  // test
  /**
   * If `true`, it shows a little indicator to the trigger element.
   */
  @Prop() arrow = false

  /**
   * Offset form trigger to tooltip.
   */
  @Prop() offset = 0

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
        this.el.style.removeProperty('--bal-tooltip-variant-popover-max-width')
      } else {
        this.el.style.setProperty('--bal-tooltip-variant-popover-max-width', `${this.contentWidth}px`)
      }
    }
  }

  /**
   * Emitted when the accordion has opened or closed
   */
  @Event() balChange!: EventEmitter<BalEvents.BalTooltipChangeDetail>

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

  componentDidLoad(): void {
    this.contentWidthChanged(this.contentWidth, 0)
    let showEvents: string[] = []
    let hideEvents: string[] = []

    showEvents = ['mouseenter', 'focus']
    hideEvents = ['mouseleave', 'blur']
    console.log('reference', this.triggerElement)

    showEvents.forEach(event => {
      if (this.triggerElement) {
        this.triggerElement.addEventListener(event, () => this._present())
      }
    })

    hideEvents.forEach(event => {
      if (this.triggerElement) {
        this.triggerElement.addEventListener(event, () => this._dismiss())
      }
    })
  }

  private get triggerElement(): HTMLElement | null {
    return document.querySelector(`#${this.reference}`)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal
   */
  @Method()
  async _present(): Promise<boolean> {
    console.log('_present')
    // if (balBrowser.hasDocument) {
    //   this.lastFocus = (document.activeElement as HTMLElement) || undefined
    // }

    // if (this.lastVariantRenderer) {
    //   await this.lastVariantRenderer.dismiss(this)
    //   this.presented = true
    // }

    // this.lastVariantRenderer = this.tooltipVariantRenderer
    const result = await this.tooltipVariantRenderer.present(this)

    // this.focusFirstDescendant()
    return result
  }

  /**
   * @internal
   */
  @Method()
  async _dismiss(): Promise<boolean> {
    const result = await this.tooltipVariantRenderer.dismiss(this)
    // this.lastVariantRenderer = undefined

    // if (this.lastFocus && this.lastFocus.focus) {
    //   this.lastFocus?.focus()
    // }
    return result
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

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
        aria-labelledby={`${this.tooltipId}-heading`}
      >
        <div
          class={{
            ...containerBlock.class(),
            ...containerBlock.modifier(`tooltip`).class(),
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
            px="medium"
            py="medium"
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

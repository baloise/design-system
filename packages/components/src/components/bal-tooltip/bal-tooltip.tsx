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
import { TooltipComponentInterface, MainVariantRenderer } from './variants'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { VariantRenderer } from './variants/variant.renderer'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-tooltip',
  styleUrls: {
    css: 'bal-tooltip.sass',
  },
  shadow: true,
})
export class Tooltip implements ComponentInterface, TooltipComponentInterface, Loggable {
  private tooltipId = `bal-to-${tooltipIds++}`

  private tooltipVariantRenderer = new VariantRenderer(new MainVariantRenderer())

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
   * If set it turns a tooltip into a fullscreen or a drawer on touch devices
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

  componentDidLoad(): void {
    this.contentWidthChanged(this.contentWidth, 0)

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

  /**
   * INTERNAL METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal
   */
  @Method()
  async present(): Promise<boolean> {
    this.presented = true
    return await this.tooltipVariantRenderer.present(this)
  }

  /**
   * @internal
   */
  @Method()
  async dismiss(): Promise<boolean> {
    this.presented = false
    return await this.tooltipVariantRenderer.dismiss(this)
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

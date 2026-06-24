import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, dsBrowser, OneOf } from '@utils'
import {
  TOOLTIP_PLACEMENTS,
  type TooltipPlacement,
  type TooltipDidAnimateDetail,
  type TooltipWillAnimateDetail,
} from './tooltip.interfaces'

let tooltipIds = 0

/**
 * Tooltip displays contextual information when users hover over, focus on, or tap a trigger element.
 *
 * @slot - The tooltip content text.
 * @part container - The floating tooltip container element.
 * @part content - The inner content wrapper element.
 */
@Component({
  tag: 'ds-tooltip',
  styleUrl: 'tooltip.host.scss',
  shadow: true,
})
export class Tooltip implements DsComponentInterface {
  private tooltipId = `ds-tooltip-${tooltipIds++}`
  private containerEl: HTMLDivElement | undefined
  private cleanup?: () => void

  log!: LogInstance

  @Logger('tooltip')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * Internal presented state
   */
  @State() presented = false

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Id of the reference element. Defaults to the trigger element.
   */
  @Prop()
  readonly reference: string = ''

  /**
   * Preferred placement of the tooltip relative to the trigger.
   */
  @Prop()
  @OneOf(TOOLTIP_PLACEMENTS)
  readonly placement: TooltipPlacement = 'bottom'

  /**
   * Offset in pixels from the trigger element to the tooltip.
   */
  @Prop()
  readonly offset: number = 8

  /**
   * Defines the maximum width of the tooltip content in pixels.
   */
  @Prop()
  readonly contentWidth: number | undefined = undefined

  /**
   * When true, the tooltip is shown immediately on load without user interaction.
   */
  @Prop()
  readonly open: boolean = false

  @Watch('contentWidth')
  contentWidthChanged(newValue: number | undefined) {
    if (newValue === undefined) {
      this.el.style.removeProperty('--tooltip-max-width')
    } else {
      this.el.style.setProperty('--tooltip-max-width', `${newValue}px`)
    }
  }

  /**
   * Emitted before the animation starts.
   */
  @Event() dsWillAnimate!: EventEmitter<TooltipWillAnimateDetail>

  /**
   * Emitted after the animation has finished.
   */
  @Event() dsDidAnimate!: EventEmitter<TooltipDidAnimateDetail>

  componentDidLoad(): void {
    this.contentWidthChanged(this.contentWidth)

    const trigger = this.triggerElement
    if (!trigger) return

    trigger.setAttribute('aria-describedby', this.tooltipId)

    trigger.addEventListener('mouseenter', () => this.present())
    trigger.addEventListener('focus', () => this.present())
    trigger.addEventListener('mouseleave', () => this.dismiss())
    trigger.addEventListener('blur', () => this.dismiss())

    if (this.open) {
      this.present()
    }
  }

  disconnectedCallback(): void {
    if (this.cleanup) {
      this.cleanup()
    }

    const trigger = this.triggerElement
    if (trigger) {
      trigger.removeAttribute('aria-describedby')
    }
  }

  /**
   * INTERNAL METHODS
   * ------------------------------------------------------
   */

  /**
   * Shows the tooltip and positions it relative to the trigger element.
   */
  @Method()
  async present(): Promise<boolean> {
    const trigger = this.triggerElement
    if (!trigger || !this.containerEl) return false

    this.dsWillAnimate.emit(true)

    this.presented = true

    this.cleanup = autoUpdate(trigger, this.containerEl, () => this.update(), {
      ancestorScroll: true,
      ancestorResize: true,
      elementResize: false,
      layoutShift: true,
      animationFrame: false,
    })

    this.dsDidAnimate.emit(true)
    return true
  }

  /**
   * Hides the tooltip and cleans up the position updater.
   */
  @Method()
  async dismiss(): Promise<boolean> {
    if (!this.containerEl) return false

    this.dsWillAnimate.emit(false)

    if (this.cleanup) {
      this.cleanup()
      this.cleanup = undefined
    }

    this.presented = false

    this.dsDidAnimate.emit(false)
    return true
  }

  /**
   * Recomputes the tooltip position using floating-ui.
   */
  @Method()
  async update(): Promise<boolean> {
    const trigger = this.triggerElement
    if (!trigger || !this.containerEl) return false

    const { x, y, placement } = await computePosition(trigger, this.containerEl, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: [
        dsBrowser.hasWindow && !window.frameElement ? shift() : undefined,
        flip(),
        offset(this.offset),
      ].filter(Boolean) as any[],
    })

    Object.assign(this.containerEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    })

    this.containerEl.dataset['placement'] = placement.split('-')[0]

    return true
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get triggerElement(): HTMLElement | null {
    if (!dsBrowser.hasDocument) return null
    return document.querySelector(`[id="${this.reference}"]`)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host id={this.tooltipId} role="tooltip" aria-hidden={`${!this.presented}`}>
        <div part="container" ref={el => (this.containerEl = el)}>
          <div part="content" data-testid="ds-tooltip-content">
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }
}

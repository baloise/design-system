import {
  Component,
  h,
  Host,
  Listen,
  Method,
  Prop,
  Watch,
  Element,
  Event,
  EventEmitter,
  State,
  ComponentInterface,
} from '@stencil/core'
import { createPopper, Instance } from '@popperjs/core'
import { BEM } from '../../utils/bem'
import { balBrowser } from '../../utils/browser'
import { OffsetModifier } from '@popperjs/core/lib/modifiers/offset'
import { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../utils/breakpoints'

export interface PopoverPresentOptions {
  force: boolean
}

@Component({
  tag: 'bal-popover',
  styleUrl: 'bal-popover.sass',
})
export class Popover implements ComponentInterface, Loggable, BalBreakpointObserver {
  private popoverId = `bal-po-${PopoverIds++}`
  private popperInstance!: Instance
  private backdropElement?: HTMLDivElement

  @Element() element!: HTMLElement

  @State() isTouch = balBreakpoints.isTouch
  @State() isInMainNav = false
  @State() backdropHeight = 0

  log!: LogInstance

  @Logger('bal-popover')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the popover automatically opens on a click
   */
  @Prop() autoTrigger = false

  /**
   * If `true` the popover has max-width on tablet and desktop. On mobile it uses the whole viewport.
   */
  @Prop() hint = false

  /**
   * If `true` the popover shows on hover
   */
  @Prop() hover = false

  /**
   * If `true` a little arrow is added, which points to the trigger element
   */
  @Prop() arrow = false

  /**
   * If `true` a backdrop is added
   */
  @Prop() backdrop = false

  /**
   * If `true` the popover is shown as a tooltip
   */
  @Prop() tooltip = false

  /**
   * Define the offset of the popover content.
   */
  @Prop() offsetX = 0

  /**
   * Define the offset of the popover content.
   */
  @Prop() offsetY = 0

  /**
   * Define padding of the overflow
   */
  @Prop() padding = 0

  /**
   * Define the position of the popover content.
   */
  @Prop() position: BalProps.BalPopoverPlacement = 'bottom-start'

  /**
   * If `true` the popover content is open.
   */
  @Prop({ mutable: true, reflect: true }) active = false

  /**
   * If `true` there will be no backdrop
   */
  @Prop() mobileTop = false

  /**
   * Update the native input element when the value changes
   */
  @Watch('active')
  protected async activeChanged(newValue: boolean, oldValue: boolean) {
    if (newValue === true && newValue !== oldValue) {
      this.present({ force: true })
    } else {
      this.dismiss({ force: true })
    }
  }

  /**
   * Listen when the popover opens or closes. Returns the current value.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalPopoverChangeDetail>

  /**
   * Emitted before the animation starts
   */
  @Event() balWillAnimate!: EventEmitter<BalEvents.BalPopoverWillAnimateDetail>

  /**
   * Emitted after the animation has finished
   */
  @Event() balDidAnimate!: EventEmitter<BalEvents.BalPopoverDidAnimateDetail>

  /**
   * @internal - Use this to close unused popovers.
   */
  @Event() balPopoverPrepare!: EventEmitter<string>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentWillLoad() {
    this.backdropHeight = this.getBackdropHeight()
  }

  componentDidLoad() {
    this.isInMainNav = this.footMobileNav !== null

    if (this.triggerElement && this.menuElement) {
      this.popperInstance = createPopper(this.triggerElement, this.menuElement, {
        placement: this.tooltip ? 'bottom' : this.position,
        modifiers: [this.modifierOffset, this.modifierPreventOverflow],
      })
      let showEvents: string[] = []
      let hideEvents: string[] = []

      if (this.autoTrigger) {
        showEvents = ['click']
      }

      if (this.tooltip) {
        showEvents = ['mouseenter', 'focus']
        hideEvents = ['mouseleave', 'blur']
      }

      showEvents.forEach(event => {
        if (this.triggerElement) {
          if (event === 'click') {
            this.triggerElement.addEventListener(event, () => this.toggle())
          } else {
            this.triggerElement.addEventListener(event, () => this.present())
          }
        }
      })

      hideEvents.forEach(event => {
        if (this.triggerElement) {
          this.triggerElement.addEventListener(event, () => this.dismiss())
        }
      })
    }
  }

  componentDidRenderTimer?: NodeJS.Timeout
  componentDidRender() {
    if (this.popperInstance) {
      this.popperInstance.setOptions((options: any) => ({
        ...options,
        placement: this.tooltip ? 'bottom' : this.position,
        modifiers: [
          ...options.modifiers.filter((m: any) => m.name !== 'offset' && m.name !== 'preventOverflow'),
          this.modifierOffset,
          this.modifierPreventOverflow,
        ],
      }))
      this.updatePopper()
    }

    // Bug fix for https://github.com/baloise/design-system/issues/551
    if (balBrowser.isSafari && !this.isTouch) {
      clearTimeout(this.componentDidRenderTimer)
      this.componentDidRenderTimer = setTimeout(() => {
        const triggerWidth = this.element?.clientWidth
        if (triggerWidth) {
          this.element.style.maxWidth = `${triggerWidth}px`
        } else {
          this.element.style.maxWidth = `initial`
        }
      })
    }
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balPopoverPrepare', { target: 'body' })
  handlePopoverPrepare(ev: CustomEvent<string>) {
    const popoverId = ev.detail
    if (this.popoverId !== popoverId) {
      this.dismiss()
    }
  }

  @Listen('click', { target: 'document' })
  async clickOnOutside(ev: UIEvent) {
    if (this.active) {
      if (!this.element.contains(ev.target as Node)) {
        this.active = false
      }

      if (this.backdropElement?.isEqualNode(ev.target as Node)) {
        this.active = false
      }
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyUp(ev: KeyboardEvent) {
    if (this.active && (ev.key === 'Escape' || ev.key === 'Esc')) {
      ev.preventDefault()
      this.dismiss()
    }
  }

  @Listen('keyup', { target: 'document' })
  async tabOutside(ev: KeyboardEvent) {
    if (ev.key === 'Tab' && !this.element.contains(document.activeElement) && this.active) {
      await this.toggle()
    }
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isTouch = breakpoints.touch
    this.isInMainNav = this.footMobileNav !== null
    this.backdropHeight = this.getBackdropHeight()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Open the popover
   */
  @Method()
  async present(options: PopoverPresentOptions = { force: false }) {
    if (!this.active || options.force) {
      this.menuElement?.setAttribute('data-show', '')
      this.menuElement?.setAttribute('aria-hidden', 'false')
      if (this.menuInnerElement) {
        this.menuInnerElement.scrollTo(0, 0)
      }
      this.balPopoverPrepare.emit(this.popoverId)
      this.balWillAnimate.emit(this.active)
      this.active = true
      this.popperInstance.setOptions((options: any) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
      }))
      this.updatePopper()

      this.balChange.emit(this.active)
      this.balDidAnimate.emit(this.active)
    }
  }

  /**
   * Closes the popover
   */
  @Method()
  async dismiss(options: PopoverPresentOptions = { force: false }) {
    if (this.active || options.force) {
      this.menuElement?.removeAttribute('data-show')
      this.menuElement?.setAttribute('aria-hidden', 'true')
      this.balWillAnimate.emit(this.active)
      this.active = false
      this.popperInstance.setOptions((options: any) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
      }))
      this.updatePopper()

      this.balChange.emit(this.active)
      this.balDidAnimate.emit(this.active)
    }
  }

  /**
   * Open or closes the popover
   */
  @Method()
  async toggle(options: PopoverPresentOptions = { force: false }) {
    if (this.active) {
      await this.dismiss(options)
    } else {
      await this.present(options)
    }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get footMobileNav(): HTMLElement | null {
    return this.element.closest('[slot="meta-mobile-foot"]') as HTMLElement
  }

  private get modifierOffset(): Partial<OffsetModifier> {
    return {
      name: 'offset',
      options: {
        offset: [this.offsetX, this.offsetY + (this.tooltip || this.arrow ? 8 : 0)],
      },
    }
  }

  private get modifierPreventOverflow(): Partial<PreventOverflowModifier> {
    return {
      name: 'preventOverflow',
      options: {
        padding: this.arrow || this.tooltip ? 8 : this.padding,
        altAxis: true,
      },
    }
  }

  private get triggerElement(): HTMLElement | null {
    return this.element.querySelector('[bal-popover-trigger]')
  }

  private get menuElement(): HTMLElement | null {
    return this.element.querySelector('bal-popover-content')
  }

  private get menuInnerElement(): HTMLElement | null {
    return this.element.querySelector('.bal-popover__content__inner')
  }

  private getBackdropHeight() {
    if (balBrowser.hasWindow) {
      return this.isInMainNav ? (window.innerHeight - (this.isTouch ? 64 : 48)) / 16 : window.innerHeight / 16
    }
    return 0
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updatePopper() {
    this.popperInstance.update()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('popover')

    return (
      <Host
        aria-presented={this.active ? 'true' : null}
        data-id={this.popoverId}
        class={{
          ...block.class(),
          ...block.modifier('active').class(this.active),
          ...block.modifier('tooltip').class(this.tooltip),
          ...block.modifier('arrow').class(this.arrow),
          ...block.modifier('hint').class(this.hint),
          ...block.modifier('backdrop').class(this.backdrop),
        }}
      >
        {!this.mobileTop && (
          <div
            ref={el => {
              this.backdropElement = el
            }}
            class={{
              ...block.element('backdrop').class(this.backdrop && this.active),
            }}
            style={{
              '--bal-popover-backdrop-height': `${this.backdropHeight}rem`,
            }}
          ></div>
        )}
        <slot></slot>
      </Host>
    )
  }
}

let PopoverIds = 0

import { Component, h, Host, Listen, Method, Prop, Watch, Element, Event, EventEmitter, State } from '@stencil/core'
import { createPopper, Instance } from '@popperjs/core'
import { Props } from '../../types'
import { Events } from '../../types'
import { BEM } from '../../utils/bem'
import { isBrowser } from '../../utils/browser'
import { OffsetModifier } from '@popperjs/core/lib/modifiers/offset'
import { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow'
import { isPlatform } from '../../utils/platform'
import { ResizeHandler } from '../../utils/resize'

export interface PopoverPresentOptions {
  force: boolean
}

@Component({
  tag: 'bal-popover',
})
export class Popover {
  private popoverId = `bal-po-${PopoverIds++}`
  private popperInstance!: Instance
  private backdropElement?: HTMLDivElement

  @Element() element!: HTMLElement

  @State() isTouch = isPlatform('touch')
  @State() isInMainNav = false
  @State() backdropHeight = 0

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
  @Prop() position: Props.BalPopoverPlacement = 'bottom-start'

  /**
   * If `true` the popover content is open.
   */
  @Prop({ mutable: true, reflect: true }) value = false

  /**
   * If `true` there will be no backdrop
   */
  @Prop() mobileTop = false

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected async valueChanged(newValue: boolean, oldValue: boolean) {
    if (newValue === true && newValue !== oldValue) {
      this.present({ force: true })
    } else {
      this.dismiss({ force: true })
    }
  }

  /**
   * Listen when the popover opens or closes. Returns the current value.
   */
  @Event() balChange!: EventEmitter<Events.BalPopoverChangeDetail>

  /**
   * @internal - Use this to close unused popovers.
   */
  @Event() balPopoverPrepare!: EventEmitter<string>

  @Listen('balPopoverPrepare', { target: 'body' })
  handlePopoverPrepare(event: CustomEvent<string>) {
    const popoverId = event.detail
    if (this.popoverId !== popoverId) {
      this.dismiss()
    }
  }

  @Listen('click', { target: 'document' })
  async clickOnOutside(event: UIEvent) {
    if (this.value) {
      if (!this.element.contains(event.target as Node)) {
        this.value = false
      }

      if (this.backdropElement?.isEqualNode(event.target as Node)) {
        this.value = false
      }
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyUp(event: KeyboardEvent) {
    if (this.value && (event.key === 'Escape' || event.key === 'Esc')) {
      event.preventDefault()
      this.dismiss()
    }
  }

  @Listen('keyup', { target: 'document' })
  async tabOutside(event: KeyboardEvent) {
    if (event.key === 'Tab' && !this.element.contains(document.activeElement) && this.value) {
      await this.toggle()
    }
  }

  resizeWidthHandler = ResizeHandler()

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.resizeWidthHandler(() => {
      this.isTouch = isPlatform('touch')
      this.isInMainNav = this.footMobileNav !== null
      this.backdropHeight = this.getBackdropHeight()
    })
  }

  componentDidRenderTimer?: NodeJS.Timer
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

    // Bug fix for https://github.com/baloise-incubator/design-system/issues/551
    if (isBrowser('Safari') && !this.isTouch) {
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

  private get footMobileNav(): HTMLElement | null {
    return this.element.closest('[slot="meta-mobile-foot"]') as HTMLElement
  }

  componentDidLoad() {
    this.isInMainNav = this.footMobileNav !== null
    this.isTouch = isPlatform('touch')
    this.backdropHeight = this.getBackdropHeight()
    if (this.triggerElement && this.menuElement) {
      this.popperInstance = createPopper(this.triggerElement, this.menuElement, {
        placement: this.tooltip ? 'bottom' : this.position,
        modifiers: [this.modifierOffset, this.modifierPreventOverflow],
      })
      let showEvents: string[] = []
      let hideEvents: string[] = []

      if (this.tooltip) {
        showEvents = ['mouseenter', 'focus']
        hideEvents = ['mouseleave', 'blur']
      }

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
  }

  /**
   * Open the popover
   */
  @Method()
  async present(options: PopoverPresentOptions = { force: false }) {
    if (!this.value || options.force) {
      this.menuElement?.setAttribute('data-show', '')
      this.menuElement?.setAttribute('aria-hidden', 'false')
      this.balPopoverPrepare.emit(this.popoverId)
      this.value = true
      this.popperInstance.setOptions((options: any) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
      }))
      this.updatePopper()

      this.balChange.emit(this.value)
    }
  }

  /**
   * Closes the popover
   */
  @Method()
  async dismiss(options: PopoverPresentOptions = { force: false }) {
    if (this.value || options.force) {
      this.menuElement?.removeAttribute('data-show')
      this.menuElement?.setAttribute('aria-hidden', 'true')
      this.value = false
      this.popperInstance.setOptions((options: any) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
      }))
      this.updatePopper()

      this.balChange.emit(this.value)
    }
  }

  /**
   * Open or closes the popover
   */
  @Method()
  async toggle(options: PopoverPresentOptions = { force: false }) {
    if (this.value) {
      await this.dismiss(options)
    } else {
      await this.present(options)
    }
  }

  private updatePopper() {
    this.popperInstance.update()
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

  private getBackdropHeight() {
    return this.isInMainNav ? (window.innerHeight - (this.isTouch ? 64 : 48)) / 16 : window.innerHeight / 16
  }

  render() {
    const block = BEM.block('popover')

    return (
      <Host
        aria-presented={this.value ? 'true' : null}
        data-id={this.popoverId}
        class={{
          ...block.class(),
          ...block.modifier('active').class(this.value),
          ...block.modifier('tooltip').class(this.tooltip),
          ...block.modifier('arrow').class(this.arrow),
          ...block.modifier('hint').class(this.hint),
          ...block.modifier('backdrop').class(this.backdrop),
        }}
      >
        <slot></slot>
        {!this.mobileTop && (
          <div
            ref={el => {
              this.backdropElement = el
            }}
            class={{
              ...block.element('backdrop').class(this.backdrop && this.value),
            }}
            style={{
              '--bal-popover-backdrop-height': `${this.backdropHeight}rem`,
            }}
          ></div>
        )}
      </Host>
    )
  }
}

let PopoverIds = 0

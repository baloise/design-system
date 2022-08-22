import { Component, h, Host, Listen, Method, Prop, Watch, Element, Event, EventEmitter } from '@stencil/core'
import { createPopper, Instance } from '@popperjs/core'
import { Props } from '../../types'
import { Events } from '../../events'
import { BEM } from '../../utils/bem'
import { OffsetModifier } from '@popperjs/core/lib/modifiers/offset'
import { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow'

export interface PopoverPresentOptions {
  force: boolean
  noEmit: boolean
}

@Component({
  tag: 'bal-popover',
})
export class Popover {
  private didInit = false
  private popoverId = `bal-po-${PopoverIds++}`
  private popperInstance!: Instance
  private backdropElement?: HTMLDivElement
  private body!: HTMLBodyElement

  @Element() element!: HTMLElement

  /**
   * If `true` the popover has max-width on tablet and desktop. On mobile it uses the whole viewport.
   */
  @Prop() hint = false

  /**
   * If `true` the popover shows on hover
   */
  @Prop() hover = false

  /**
   * If `true` an little arrow is added, which points to the trigger element
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
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected async valueChanged(newValue: boolean, oldValue: boolean) {
    if (newValue === true && newValue !== oldValue) {
      this.present({ force: true, noEmit: true })
    } else {
      this.dismiss({ force: true, noEmit: true })
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
    if (!this.element.contains(event.target as Node) && this.value) {
      await this.toggle()
    }

    if (this.backdropElement?.isEqualNode(event.target as Node)) {
      await this.dismiss()
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
  }

  componentDidLoad() {
    if (this.triggerElement && this.menuElement) {
      this.body = document.querySelector('body') as HTMLBodyElement
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
  async present(options: PopoverPresentOptions = { force: false, noEmit: false }) {
    if (!this.value || options.force) {
      await this.toggleScrollingBody()
      this.menuElement?.setAttribute('data-show', '')
      this.menuElement?.setAttribute('aria-hidden', 'false')
      this.balPopoverPrepare.emit(this.popoverId)
      this.value = true
      this.popperInstance.setOptions((options: any) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
      }))
      this.updatePopper()

      if (!options.noEmit) {
        this.balChange.emit(this.value)
      }
    }
  }

  /**
   * Closes the popover
   */
  @Method()
  async dismiss(options: PopoverPresentOptions = { force: false, noEmit: false }) {
    if (this.value || options.force) {
      await this.toggleScrollingBody()
      this.menuElement?.removeAttribute('data-show')
      this.menuElement?.setAttribute('aria-hidden', 'true')
      this.value = false
      this.popperInstance.setOptions((options: any) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
      }))
      this.updatePopper()

      if (!options.noEmit) {
        this.balChange.emit(this.value)
      }
    }
  }

  /**
   * Open or closes the popover
   */
  @Method()
  async toggle(options: PopoverPresentOptions = { force: false, noEmit: false }) {
    if (this.value) {
      await this.dismiss(options)
    } else {
      await this.present(options)
    }
  }

  /**
   * Toggles the scrolling on the body element
   */
  @Method()
  async toggleScrollingBody() {
    if (this.value) {
      await this.blockScrollingBody()
    } else {
      await this.allowScrollingBody()
    }
  }

  /**
   * Allows the scrolling on the body element
   */
  @Method()
  async allowScrollingBody() {
    console.log('ALLOW SCROLL ON BODY', this.body)
    this.body.style.position = 'relative'
    this.body.style.width = 'auto'
    this.body.style.overflowY = 'auto'
  }

  /**
   * Blocks the scrolling on the body element
   */
  @Method()
  async blockScrollingBody() {
    console.log('BLOCK SCROLL ON BODY', this.body)
    this.body.style.position = 'fixed'
    this.body.style.width = '100%'
    this.body.style.overflowY = 'hidden'
  }

  private updatePopper() {
    this.popperInstance.update()

    // to trigger a popper rerender
    /*window.scrollTo(window.scrollX, window.scrollY - 1)
    window.scrollTo(window.scrollX, window.scrollY + 1)*/
  }

  private get modifierOffset(): Partial<OffsetModifier> {
    return {
      name: 'offset',
      options: {
        offset: [this.offsetX, this.offsetY + (this.tooltip || this.arrow ? 8 : 4)],
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
        }}
      >
        <slot></slot>
        <div
          ref={el => {
            this.backdropElement = el
          }}
          class={{ ...block.element('backdrop').class(this.backdrop && this.value) }}
        ></div>
      </Host>
    )
  }
}

let PopoverIds = 0

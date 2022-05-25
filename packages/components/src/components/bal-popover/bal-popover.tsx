import { Component, h, Host, Listen, Method, Prop, Watch, Element, Event, EventEmitter } from '@stencil/core'
import { createPopper, Instance } from '@popperjs/core'
import { debounceEvent } from '../../helpers/helpers'
import { Props } from '../../types'
import { Events } from '../../events'

@Component({
  tag: 'bal-popover',
})
export class Popover {
  private didInit = false
  private popoverId = `bal-po-${PopoverIds++}`
  private popperInstance!: Instance

  @Element() element!: HTMLElement

  /**
   * If `true` the field spans over the whole width.
   */
  @Prop() offsetX = 0

  /**
   * If `true` the field spans over the whole width.
   */
  @Prop() offsetY = 0

  /**
   * If `true` the field spans over the whole width.
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
    if (this.didInit && newValue !== oldValue) {
      this.balChange.emit(newValue)
    }
  }

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
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
  handlePopoverPrepare(popoverId: string) {
    if (this.popoverId !== popoverId) {
      this.dismiss()
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyUp(event: KeyboardEvent) {
    if (this.value && (event.key === 'Escape' || event.key === 'Esc')) {
      event.preventDefault()
      this.dismiss()
    }
  }

  connectedCallback() {
    this.debounceChanged()
  }

  componentDidLoad() {
    this.didInit = true
    if (this.value !== undefined) {
      this.valueChanged(this.value, false)
    }
  }

  /**
   * Open the popover
   */
  @Method()
  async present() {
    if (!this.value) {
      this.balPopoverPrepare.emit(this.popoverId)
      this.value = true
      this.balChange.emit(this.value)
    }
  }

  /**
   * Closes the popover
   */
  @Method()
  async dismiss() {
    if (this.value) {
      this.value = false
      this.balChange.emit(this.value)
    }
  }

  /**
   * Open or closes the popover
   */
  @Method()
  async toggle() {
    if (this.value) {
      await this.dismiss()
    } else {
      await this.present()
    }
    this.balChange.emit(this.value)
  }

  /**
   * Returns the `HTMLDivElement` of the menu element
   */
  async getMenuElement(): Promise<HTMLElement | null> {
    return this.menuElement
  }

  @Listen('keyup', { target: 'document' })
  async tabOutside(event: KeyboardEvent) {
    if (event.key === 'Tab' && !this.element.contains(document.activeElement) && this.value) {
      await this.toggle()
    }
  }

  @Listen('click', { target: 'document' })
  async clickOnOutside(event: UIEvent) {
    if (!this.element.contains(event.target as Node) && this.value) {
      await this.toggle()
    }
  }

  get triggerElement(): HTMLElement | null {
    return this.element.querySelector('[bal-popover-trigger]')
  }

  get menuElement(): HTMLElement | null {
    return this.element.querySelector('bal-popover-content')
  }

  componentDidRender() {
    if (this.popperInstance) {
      this.popperInstance.forceUpdate()
    }
  }

  componentWillLoad() {
    if (this.triggerElement && this.menuElement) {
      this.popperInstance = createPopper(this.triggerElement, this.menuElement, {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [this.offsetX, this.offsetY],
            },
          },
        ],
      })
    }
  }

  render() {
    return (
      <Host data-id={this.popoverId} class={{ 'is-active': this.value }} aria-presented={this.value ? 'true' : null}>
        <slot></slot>
      </Host>
    )
  }
}

let PopoverIds = 0

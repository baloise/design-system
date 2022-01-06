import { Component, h, Host, Listen, Method, Prop, Element, Event, EventEmitter } from '@stencil/core'
import { createPopper, Instance, Placement } from '@popperjs/core'

@Component({
  tag: 'bal-popover',
})
export class Popover {
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
  @Prop() position: Placement = 'bottom-start'

  /**
   * If `true` the popover content is open.
   */
  @Prop({ mutable: true, reflect: true }) isActive = false

  /**
   * Listen when the popover opens or closes. Returns the current `isActive` value.
   */
  @Event({ eventName: 'balCollapse' }) balCollapse!: EventEmitter<boolean>

  /**
   * @internal - Use this to close unuesed popovers.
   */
  @Event({ eventName: 'balPopoverPrepare' }) balPopoverPrepare!: EventEmitter<string>

  @Listen('balPopoverPrepare', { target: 'body' })
  handlePopoverPrepare(popoverId: string) {
    if (this.popoverId !== popoverId) {
      this.close()
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyUp(event: KeyboardEvent) {
    if (this.isActive && (event.key === 'Escape' || event.key === 'Esc')) {
      event.preventDefault()
      this.close()
    }
  }

  /**
   * Open the popover
   */
  @Method()
  async open() {
    if (!this.isActive) {
      this.balPopoverPrepare.emit(this.popoverId)
      this.isActive = true
      this.balCollapse.emit(this.isActive)
    }
  }

  /**
   * Closes the popover
   */
  @Method()
  async close() {
    if (this.isActive) {
      this.isActive = false
      this.balCollapse.emit(this.isActive)
    }
  }

  /**
   * Open or closes the popover
   */
  @Method()
  async toggle() {
    if (this.isActive) {
      await this.close()
    } else {
      await this.open()
    }
    this.balCollapse.emit(this.isActive)
  }

  /**
   * Returns the `HTMLDivElement` of the menu element
   */
  async getMenuElement(): Promise<HTMLElement | null> {
    return this.menuElement
  }

  @Listen('keyup', { target: 'document' })
  async tabOutside(event: KeyboardEvent) {
    if (event.key === 'Tab' && !this.element.contains(document.activeElement) && this.isActive) {
      await this.toggle()
    }
  }

  @Listen('click', { target: 'document' })
  async clickOnOutside(event: UIEvent) {
    if (!this.element.contains(event.target as Node) && this.isActive) {
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
      <Host data-id={this.popoverId} class={{ 'is-active': this.isActive }}>
        <slot></slot>
      </Host>
    )
  }
}

let PopoverIds = 0

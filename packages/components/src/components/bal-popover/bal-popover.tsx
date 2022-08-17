import { Component, h, Host, Listen, Method, Prop, Watch, Element, Event, EventEmitter } from '@stencil/core'
import { createPopper, Instance } from '@popperjs/core'
import { Props } from '../../types'
import { Events } from '../../events'
import { BEM } from '../../utils/bem'

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

  @Element() element!: HTMLElement

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
      this.popperInstance.forceUpdate()
    }
  }

  componentDidLoad() {
    if (this.triggerElement && this.menuElement) {
      this.popperInstance = createPopper(this.triggerElement, this.menuElement, {
        placement: this.tooltip ? 'bottom' : this.position,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [this.offsetX, this.offsetY + (this.tooltip || this.arrow ? 8 : 4)],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              padding: this.arrow || this.tooltip ? 8 : 0,
              altAxis: true,
            },
          },
        ],
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
      this.menuElement?.setAttribute('data-show', '')
      this.balPopoverPrepare.emit(this.popoverId)
      this.value = true
      this.popperInstance.setOptions((options: any) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
      }))
      this.popperInstance.update()

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
      this.menuElement?.removeAttribute('data-show')
      this.value = false
      this.popperInstance.setOptions((options: any) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
      }))
      this.popperInstance.update()

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
   * Returns the `HTMLDivElement` of the menu element
   */
  async getMenuElement(): Promise<HTMLElement | null> {
    return this.menuElement
  }

  get triggerElement(): HTMLElement | null {
    return this.element.querySelector('[bal-popover-trigger]')
  }

  get menuElement(): HTMLElement | null {
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

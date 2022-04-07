import {
  Component,
  h,
  Host,
  Prop,
  Element,
  EventEmitter,
  Event,
  Watch,
  ComponentInterface,
  Method,
  Listen,
} from '@stencil/core'
import { stopEventBubbling } from '../../../../helpers/form-input.helpers'
import { findItemLabel, inheritAttributes, isDescendant } from '../../../../helpers/helpers'
import { Props } from '../../../../props'

@Component({
  tag: 'bal-radio-group',
})
export class RadioGroup implements ComponentInterface {
  private inputId = `bal-rg-${radioGroupIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  @Element() el!: HTMLElement

  /**
   * Defines the layout of the radio button
   */
  @Prop() interface: Props.BalRadioGroupInterface = 'radio'

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component can be used on dark background
   */
  @Prop() inverted = false

  /**
   * Displays the checkboxes vertically
   */
  @Prop() vertical = false

  /**
   * If `true`, the user cannot interact with the radios.
   */
  @Prop() disabled?: boolean = undefined

  /**
   * If `true`, the controls will be vertically on mobile devices.
   */
  @Prop() verticalOnMobile = false

  @Watch('disabled')
  disabledChanged(value: boolean | undefined) {
    if (value !== undefined) {
      this.radios.forEach(radio => {
        radio.disabled = value
      })
    }
  }

  /**
   * The value of the control.
   */
  @Prop({ mutable: true }) value: number | string | boolean = ''

  @Watch('value')
  valueChanged(value: number | string | boolean, oldValue: number | string | boolean) {
    if (value !== oldValue) {
      this.sync()
    }
  }

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<number | string | boolean>

  @Listen('balChange', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (isDescendant(this.el, ev.target as HTMLElement)) {
      stopEventBubbling(ev)
    }
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
    this.sync()
    this.disabledChanged(this.disabled)
  }

  private get radios(): HTMLBalRadioElement[] {
    return Array.from(this.el.querySelectorAll('bal-radio'))
  }

  /** @internal */
  @Method()
  async setValue(value: number | string | boolean) {
    this.value = value
  }

  private sync() {
    this.radios.forEach((radio: HTMLBalRadioElement) => {
      radio.interface = this.interface
      radio.inverted = this.inverted
      radio.checked = radio.value === this.value
    })
  }

  private onClick = (ev: Event) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }
    ev.preventDefault()

    const selectedRadio = ev.target && (ev.target as HTMLElement).closest('bal-radio')
    if (selectedRadio) {
      if (selectedRadio.disabled) {
        ev.stopPropagation()
        return
      }
      const currentValue = this.value
      const newValue = selectedRadio.value
      if (newValue !== currentValue) {
        this.value = newValue
        this.balChange.emit(this.value)
      }
    }
  }

  render() {
    const label = findItemLabel(this.el)
    return (
      <Host
        role="radiogroup"
        aria-labelledby={label?.id}
        aria-disabled={this.disabled ? 'true' : null}
        onClick={this.onClick}
        class={{
          [`bal-${this.interface}`]: true,
          'is-vertical-mobile': this.verticalOnMobile,
          'is-vertical': this.vertical,
        }}
        {...this.inheritedAttributes}
      >
        <div class="fg-2">
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let radioGroupIds = 0

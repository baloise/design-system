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
} from '@stencil/core'
import { findItemLabel } from '../../../../helpers/helpers'

@Component({
  tag: 'bal-radio-group',
})
export class RadioGroup implements ComponentInterface {
  private inputId = `bal-rg-${radioGroupIds++}`

  @Element() el!: HTMLElement

  /**
   * Defines the layout of the radio button
   */
  @Prop() interface: 'radio' | 'select-button' = 'radio'

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component can be used on dark background
   */
  @Prop() inverted: boolean = false

  /**
   * If `true`, the user cannot interact with the radios.
   */
  @Prop() disabled?: boolean = undefined

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
  @Prop({ mutable: true }) value: string = ''

  @Watch('value')
  valueChanged(value: string, oldValue: string) {
    if (value !== oldValue) {
      this.sync()
    }
    setTimeout(() => this.balChange.emit(value))
  }

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<string>

  componentWillLoad() {
    this.sync()
    this.disabledChanged(this.disabled)
  }

  private get radios(): HTMLBalRadioElement[] {
    return Array.from(this.el.querySelectorAll('bal-radio'))
  }

  /** @internal */
  @Method()
  async setValue(value: string) {
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
      }
    }
  }

  render() {
    const label = findItemLabel(this.el)
    return (
      <Host role="radiogroup" aria-labelledby={label?.id} onClick={this.onClick} class={`bal-${this.interface}`}>
        <slot></slot>
      </Host>
    )
  }
}

let radioGroupIds = 0

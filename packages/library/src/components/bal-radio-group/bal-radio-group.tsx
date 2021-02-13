import { Component, h, Host, Prop, Element, EventEmitter, Event, Watch, ComponentInterface } from '@stencil/core'
import { findItemLabel } from '../../helpers/helpers'

@Component({
  tag: 'bal-radio-group',
  styleUrl: 'bal-radio-group.scss',
  shadow: false,
  scoped: true,
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
   * The value of the control.
   */
  @Prop({ mutable: true }) value: string = ''

  @Watch('value')
  valueChanged(value: string, oldValue: string) {
    if (value !== oldValue) {
      this.sync()
    }
    this.balChange.emit(value)
  }

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<string>

  componentWillLoad() {
    this.sync()
  }

  private get radios(): HTMLBalRadioElement[] {
    return Array.from(this.el.querySelectorAll('bal-radio'))
  }

  private sync() {
    this.radios.forEach((item: any) => {
      item.interface = this.interface
      item.inverted = this.inverted
      if (item.value === this.value) {
        item.checked = true
      } else {
        item.checked = false
      }
    })
  }

  private onClick = (ev: Event) => {
    const selectedRadio = ev.target && (ev.target as HTMLElement).closest('bal-radio')
    if (selectedRadio && !selectedRadio.disabled) {
      const currentValue = this.value
      const newValue = selectedRadio.value
      if (newValue !== currentValue) {
        this.value = newValue
      }
    }
  }

  render() {
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    return (
      <Host role="radiogroup" aria-labelledby={label ? labelId : null} onClick={this.onClick} class={`bal-${this.interface}`}>
        <slot></slot>
      </Host>
    )
  }
}

let radioGroupIds = 0

import { Component, h, Host, Prop, Element, EventEmitter, Event, Watch, ComponentInterface } from '@stencil/core'

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
    if (selectedRadio) {
      if (selectedRadio.disabled) {
        ev.preventDefault()
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
    return (
      <Host role="radiogroup" onClick={this.onClick} class={`bal-${this.interface}`}>
        <slot></slot>
      </Host>
    )
  }
}

let radioGroupIds = 0

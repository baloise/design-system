import { Component, h, Host, Prop, Element, EventEmitter, Event, Watch } from '@stencil/core'

@Component({
  tag: 'bal-radio-group',
  styleUrl: 'bal-radio-group.scss',
  shadow: false,
  scoped: true,
})
export class RadioGroup {
  @Element() element!: HTMLElement

  /**
   * Defines the layout of the radio button
   */
  @Prop() interface: 'radio' | 'select-button' = 'radio'

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
  @Event({ eventName: 'balChange' }) balChange!: EventEmitter<string>

  componentWillLoad() {
    this.sync()
  }

  private get children(): HTMLBalRadioElement[] {
    return Array.from(this.element.querySelectorAll('bal-radio'))
  }

  private sync() {
    this.children.forEach((item: any) => {
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
    return (
      <Host role="radiogroup" onClick={this.onClick} class={`bal-${this.interface}`}>
        <slot></slot>
      </Host>
    )
  }
}

import { Component, h, Host, Prop, Element, Watch, Method } from '@stencil/core'

@Component({
  tag: 'bal-field',
  styleUrl: 'bal-field.scss',
  shadow: false,
  scoped: false,
})
export class Field {
  @Element() element!: HTMLElement

  /**
   * If `true` the component takes the whole width
   */
  @Prop() expanded: boolean = false

  /**
   * If `true` the component gets a invalid style. Only use this if there is no live validation.
   */
  @Prop() invalid: boolean = false

  /**
   * If `true` the component gets a invalid style. Only use this if there is no live validation.
   */
  @Prop() touched: boolean = false

  /**
   * If `true` the field loses opacity
   */
  @Prop() disabled: boolean = false

  /**
   * If `true` the field can be used on blue background.
   */
  @Prop() inverted: boolean = false

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading: boolean = false

  @Watch('inverted')
  @Watch('disabled')
  @Watch('expanded')
  @Watch('touched')
  @Watch('invalid')
  watchInputHandler() {
    this.updateChildInput()
  }

  @Watch('loading')
  @Watch('inverted')
  @Watch('touched')
  @Watch('invalid')
  @Watch('disabled')
  watchFieldHandler() {
    this.updateChildFieldControl()
  }

  @Watch('inverted')
  @Watch('touched')
  @Watch('invalid')
  watchFieldMessageHandler() {
    this.updateChildFieldMessage()
  }

  componentWillLoad() {
    this.updateChildInput()
    this.updateChildFieldMessage()
    this.updateChildFieldControl()
  }

  @Method()
  async reset() {
    this.touched = false
    this.invalid = false
  }

  updateChildInput() {
    const inputs = this.element.querySelectorAll('bal-input, bal-select, bal-datepicker')
    inputs.forEach((input: any) => {
      input.disabled = this.disabled
      input.inverted = this.inverted
      input.expanded = this.expanded
      input.touched = this.touched
      input.invalid = this.invalid
    })
  }

  updateChildFieldControl() {
    const controls = this.element.querySelectorAll('bal-field-control')
    controls.forEach((control: any) => {
      control.loading = this.loading
      control.inverted = this.inverted
      control.touched = this.touched
      control.invalid = this.invalid
      control.disabled = this.disabled

      const selects = this.element.querySelectorAll('bal-select')
      selects.forEach((select: any) => {
        select.loading = this.loading
      })
    })
  }

  updateChildFieldMessage() {
    const messages = this.element.querySelectorAll('bal-field-message')
    messages.forEach((message: any) => {
      message.inverted = this.inverted
      message.color = this.touched && this.invalid ? 'danger' : ''
    })
  }

  render() {
    return (
      <Host
        class={{
          'is-expanded': this.expanded,
          'is-invalid': this.invalid,
          'is-disabled': this.disabled,
          'is-inverted': this.inverted,
        }}
      >
        <div
          class={{
            'form': true,
            'is-inverted': this.inverted,
            'is-disabled': this.disabled,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}

import { Component, h, Host, Prop, Element, Watch } from '@stencil/core'

@Component({
  tag: 'bal-field',
})
export class Field {
  @Element() element!: HTMLElement

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true` the field loses opacity
   */
  @Prop() disabled = false

  /**
   * If `true` the field can be used on blue background.
   */
  @Prop() inverted = false

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading = false

  @Watch('inverted')
  @Watch('disabled')
  @Watch('invalid')
  watchInputHandler() {
    this.updateChildInput()
  }

  @Watch('loading')
  @Watch('inverted')
  @Watch('invalid')
  watchFieldHandler() {
    this.updateChildFieldControl()
  }

  componentWillLoad() {
    this.updateChildInput()
    this.updateChildFieldControl()
  }

  updateChildInput() {
    const inputs = this.element.querySelectorAll<HTMLBalInputElement | HTMLBalDatepickerElement | HTMLBalSelectElement>(
      'bal-input, bal-select, bal-datepicker',
    )
    inputs.forEach(input => {
      input.disabled = this.disabled
      input.inverted = this.inverted
      input.invalid = this.invalid
    })
  }

  updateChildFieldControl() {
    const controls = this.element.querySelectorAll<HTMLBalFieldControlElement>('bal-field-control')
    controls.forEach(control => {
      control.loading = this.loading
      control.inverted = this.inverted
      control.invalid = this.invalid

      const selects = this.element.querySelectorAll<HTMLBalSelectElement>('bal-select')
      selects.forEach(select => {
        select.loading = this.loading
        select.invalid = this.invalid
      })
    })
  }

  render() {
    return (
      <Host
        class={{
          'is-invalid': this.invalid,
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

import { Component, h, Host, Prop, Element, Watch } from '@stencil/core'

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
  watchInputHandler() {
    this.updateChildInput()
  }

  @Watch('loading')
  @Watch('inverted')
  watchFieldHandler() {
    this.updateChildFieldControl()
  }

  componentWillLoad() {
    this.updateChildInput()
    this.updateChildFieldControl()
  }

  updateChildInput() {
    const inputs = this.element.querySelectorAll('bal-input, bal-select, bal-datepicker')
    inputs.forEach((input: any) => {
      input.disabled = this.disabled
      input.inverted = this.inverted
      input.expanded = this.expanded
    })
  }

  updateChildFieldControl() {
    const controls = this.element.querySelectorAll('bal-field-control')
    controls.forEach((control: any) => {
      control.loading = this.loading
      control.inverted = this.inverted

      const selects = this.element.querySelectorAll('bal-select')
      selects.forEach((select: any) => {
        select.loading = this.loading
      })
    })
  }

  render() {
    return (
      <Host
        class={{
          'is-expanded': this.expanded,
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

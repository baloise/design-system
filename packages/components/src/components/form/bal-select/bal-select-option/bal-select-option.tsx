import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-select-option',
})
export class SelectOption implements ComponentInterface {
  /**
   * Label will be shown in the input element when it got selected
   */
  @Prop({ reflect: true }) label?: string

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop() disabled = false

  /**
   * The value of the select option. This value will be returned by the parent `<bal-select>` element.
   */
  @Prop({ reflect: true }) value?: string

  /**
   * @internal
   * ID of the option.
   */
  @Prop({ reflect: true }) for = `bal-selopt-${selectOptionIds++}`

  render() {
    return (
      <Host style={{ display: 'none' }}>
        <slot></slot>
      </Host>
    )
  }
}

let selectOptionIds = 0

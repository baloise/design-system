import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-select-option',
})
export class SelectOption implements ComponentInterface {
  private inputId = `bal-selopt-${selectOptionIds++}`

  /**
   * Label will be shown in the input element when it got selected
   */
  @Prop() label: string | undefined

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop() disabled = false

  /**
   * The value of the select option. This value will be returned by the parent `<bal-select>` element.
   */
  @Prop() value: string | undefined

  render() {
    return (
      <Host id={this.inputId} style={{ display: 'none' }}>
        <slot></slot>
      </Host>
    )
  }
}

let selectOptionIds = 0

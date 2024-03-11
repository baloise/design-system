import { Component, h, Host, Method, Prop, State } from '@stencil/core'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../../utils/form'

@Component({
  tag: 'bal-field-message',
})
export class FieldMessage implements BalAriaFormLinking {
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  /**
   * Defines the color of the message.
   */
  @Prop() color: BalProps.BalFieldMessageColor = ''

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() invalid = false

  /**
   * If `true` the component gets a valid green style.
   */
  @Prop() valid = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm) {
    this.ariaForm = { ...ariaForm }
  }

  render() {
    return (
      <Host
        id={this.ariaForm.messageId}
        class={{
          'bal-field-message': true,
          'help': true,
          'is-danger': this.invalid,
          'is-success': this.valid,
          'is-disabled': this.disabled || this.readonly,
          [`is-${this.color}`]: !!this.color,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

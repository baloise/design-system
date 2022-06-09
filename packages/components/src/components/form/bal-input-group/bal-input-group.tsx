import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-input-group',
})
export class InputGroup implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  render() {
    const block = BEM.block('input-group')

    return (
      <Host
        class={{
          ...block.class(),
          'is-danger': this.invalid,
          'is-disabled': this.disabled || this.readonly,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

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
   * If `true` the component is disabled.
   */
  @Prop() disabled = false

  render() {
    return (
      <Host
        class={{
          'bal-input-group': true,
          'is-danger': this.invalid,
          'is-disabled': this.disabled,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

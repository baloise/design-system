import { Component, h, Prop, Host, ComponentInterface } from '@stencil/core'

@Component({
  tag: 'bal-button-group',
})
export class ButtonGroup implements ComponentInterface {
  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() position: 'right' | 'center' | '' = ''

  render() {
    return (
      <Host
        class={{
          'field': true,
          'is-grouped': true,
          'is-grouped-right': this.position === 'right',
          'is-grouped-centered': this.position === 'center',
        }}
      >
        <slot />
      </Host>
    )
  }
}

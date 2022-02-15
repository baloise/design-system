import { Component, h, Host, ComponentInterface, Prop } from '@stencil/core'

@Component({
  tag: 'bal-checkbox-group',
})
export class CheckboxGroup implements ComponentInterface {
  /**
   * Displays the checkboxes vertically
   */
  @Prop() vertical = false

  render() {
    return (
      <Host class={{ 'is-vertical': this.vertical }}>
        <div>
          <slot></slot>
        </div>
      </Host>
    )
  }
}

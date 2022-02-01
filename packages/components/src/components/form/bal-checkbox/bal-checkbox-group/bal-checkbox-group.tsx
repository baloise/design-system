import { Component, h, Host, ComponentInterface } from '@stencil/core'

@Component({
  tag: 'bal-checkbox-group',
})
export class CheckboxGroup implements ComponentInterface {
  render() {
    return (
      <Host>
        <div>
          <slot></slot>
        </div>
      </Host>
    )
  }
}

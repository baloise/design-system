import { Component, h, ComponentInterface, Host } from '@stencil/core'

@Component({
  tag: 'bal-form-grid',
})
export class FormGrid implements ComponentInterface {
  render() {
    return (
      <Host class="columns is-multiline my-0 py-0">
        <slot></slot>
      </Host>
    )
  }
}

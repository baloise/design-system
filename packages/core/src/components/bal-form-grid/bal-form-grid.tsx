import { Component, ComponentInterface, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-form-grid',
  styleUrl: 'bal-form-grid.scss',
})
export class FormGrid implements ComponentInterface {
  render() {
    return (
      <Host class={`bal-form-grid grid is-multiline my-none py-none`}>
        <slot></slot>
      </Host>
    )
  }
}

import { Component, h, ComponentInterface, Host } from '@stencil/core'

@Component({
  tag: 'bal-form-grid',
  styleUrl: 'bal-form-grid.sass',
})
export class FormGrid implements ComponentInterface {
  render() {
    return (
      <Host class="bal-form-grid columns is-multiline my-none py-none">
        <slot></slot>
      </Host>
    )
  }
}

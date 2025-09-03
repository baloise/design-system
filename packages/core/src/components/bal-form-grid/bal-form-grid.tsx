import { Component, ComponentInterface, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-form-grid',
  styleUrl: 'bal-form-grid.sass',
})
export class FormGrid implements ComponentInterface {
  render() {
    return (
      <Host class={`bal-form-grid grid is-multiline my-none py-none`}>
        <slot />
      </Host>
    )
  }
}

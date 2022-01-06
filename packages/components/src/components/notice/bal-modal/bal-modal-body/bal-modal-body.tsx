import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-modal-body',
  scoped: false,
  shadow: false,
})
export class ModalBody {
  render() {
    return (
      <Host class="modal-body p-4">
        <slot />
      </Host>
    )
  }
}

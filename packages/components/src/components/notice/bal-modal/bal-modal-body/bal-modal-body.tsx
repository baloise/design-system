import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-modal-body',
  scoped: false,
  shadow: false,
})
export class ModalBody {
  render() {
    return (
      <Host class="modal-card-body">
        <div class="content">
          <slot />
        </div>
      </Host>
    )
  }
}

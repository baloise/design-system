import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-modal-footer',
  scoped: false,
  shadow: false,
})
export class ModalFooter {
  render() {
    return (
      <Host class="modal-card-foot">
        <div class="modal-card-foot-container">
          <slot />
        </div>
      </Host>
    )
  }
}

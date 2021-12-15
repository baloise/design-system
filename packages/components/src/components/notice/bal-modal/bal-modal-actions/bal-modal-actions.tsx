import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-modal-actions',
})
export class ModalActions {
  render() {
    return (
      <Host>
        <div class="buttons is-row-reverse">
          <slot />
        </div>
      </Host>
    )
  }
}

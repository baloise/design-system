import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-modal-header',
  scoped: false,
  shadow: false,
})
export class ModalHeader {
  render() {
    return (
      <Host class="modal-card-head">
        <p class="modal-card-title">
          <bal-text class="title is-size-2">
            <slot></slot>
          </bal-text>
        </p>
      </Host>
    )
  }
}

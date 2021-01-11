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
        <p class="modal-card-title title is-size-2">
          <bal-text>
            <slot></slot>
          </bal-text>
        </p>
      </Host>
    )
  }
}

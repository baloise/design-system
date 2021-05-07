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
        <h2 class="modal-card-title title is-size-2 has-text-blue has-no-margin">
          <slot></slot>
        </h2>
      </Host>
    )
  }
}

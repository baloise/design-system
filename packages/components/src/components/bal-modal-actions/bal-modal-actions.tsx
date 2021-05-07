import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-modal-actions',
  styleUrl: 'bal-modal-actions.scss',
  scoped: true,
  shadow: false,
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

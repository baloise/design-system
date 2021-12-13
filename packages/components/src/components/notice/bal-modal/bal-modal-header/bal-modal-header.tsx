import { Component, Host, h, Element } from '@stencil/core'

@Component({
  tag: 'bal-modal-header',
  scoped: false,
  shadow: false,
})
export class ModalHeader {
  @Element() el!: HTMLElement

  get parentModal(): HTMLBalModalElement | null {
    return this.el.closest('bal-modal')
  }

  closeHandler = () => {
    if (this.parentModal) {
      this.parentModal.dismiss(undefined, 'model-close')
    }
  }

  render() {
    return (
      <Host class="modal-card-head">
        <h3 class="modal-card-title title is-size-3 has-text-blue m-0">
          <slot></slot>
        </h3>
        <button
          class={{
            'modal-close': true,
          }}
          aria-label="close"
          onClick={this.closeHandler}
        ></button>
      </Host>
    )
  }
}

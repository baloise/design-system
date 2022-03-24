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
        <div>
          <h4 class="modal-card-title title is-size-4 has-text-blue m-0">
            <slot></slot>
          </h4>
        </div>
        <bal-close class="data-test-modal-close" size="large" onClick={this.closeHandler}></bal-close>
      </Host>
    )
  }
}

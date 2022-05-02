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
      <Host class="bal-modal__header">
        <div class="bal-modal__header__title">
          <h4 class="title is-size-4 m-0">
            <slot></slot>
          </h4>
        </div>
        <bal-close
          class="bal-modal__header__close data-test-modal-close"
          size="medium"
          onClick={this.closeHandler}
        ></bal-close>
      </Host>
    )
  }
}

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
          <h2 class="title is-size-2 m-0">
            <slot></slot>
          </h2>
        </div>
        <bal-close
          class={{
            'bal-modal__header__close': true,
            'data-test-modal-close': true,
            'bal-modal__header--is-closable': !!this.parentModal?.isClosable,
          }}
          onClick={this.closeHandler}
        ></bal-close>
      </Host>
    )
  }
}

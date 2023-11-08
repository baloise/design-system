import { Component, Element, h, Host } from '@stencil/core'

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
          <bal-heading level="h2" space="none">
            <slot></slot>
          </bal-heading>
        </div>
        {this.parentModal?.isClosable ? (
          <bal-close class="bal-modal__header__close data-test-modal-close" onClick={this.closeHandler}></bal-close>
        ) : (
          ''
        )}
      </Host>
    )
  }
}

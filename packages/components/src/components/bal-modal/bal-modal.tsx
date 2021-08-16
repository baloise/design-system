import { Component, Host, h, State, Method, Listen, Prop } from '@stencil/core'

@Component({
  tag: 'bal-modal',
  styleUrl: 'bal-modal.scss',
  scoped: false,
  shadow: false,
})
export class Modal {
  @State() isActive = false

  /**
   * Marks this modal as card-style modal, i.e. having visual lines separating head, body, and foot.
   */
  @Prop() card = false

  /**
   * If `true` the modal does not run with a background overlay.
   */
  @Prop() noOverlay = false

  /**
   * Opens the modal.
   */
  @Method()
  async open(): Promise<void> {
    this.isActive = true
  }

  /**
   * Closes the modal.
   */
  @Method()
  async close(): Promise<void> {
    this.isActive = false
  }

  @Listen('keyup', { target: 'body' })
  async handleKeyUp(event: KeyboardEvent) {
    if (this.isActive) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault()
        this.close()
      }
    }
  }

  render() {
    return (
      <Host>
        <div class={['modal', 'is-clipped', this.isActive ? 'is-active' : ''].join(' ')}>
          <div
            class={{
              'modal-background': true,
              'is-hidden': this.noOverlay,
            }}
          ></div>
          <div class={['modal-card box', this.card ? '' : 'no-border'].join(' ')}>
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }
}

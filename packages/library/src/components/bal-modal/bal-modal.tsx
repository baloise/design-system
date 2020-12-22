import { Component, Host, h, State, Method, Listen, Prop } from '@stencil/core'

@Component({
  tag: 'bal-modal',
  styleUrl: 'bal-modal.scss',
  scoped: true,
  shadow: false,
})
export class Modal {
  @State() isActive = false

  /**
   * Marks this modal as card-style modal, i.e. having visual lines separating head, body, and foot.
   */
  @Prop() card = false

  @Method()
  async open(): Promise<void> {
    this.isActive = true
  }

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
          <div class="modal-background"></div>
          <div class={['modal-card box', this.card ? '' : 'no-border'].join(' ')}>
            <header class="modal-card-head">
              <p class="modal-card-title">
                <slot name="head" />
              </p>
            </header>
            <section class="modal-card-body">
              <div class="content"><slot /></div>
              
            </section>
            <footer class="modal-card-foot">
              <div class="modal-card-foot-container">
                <slot name="foot" />
              </div>
            </footer>
          </div>
        </div>
      </Host>
    )
  }
}

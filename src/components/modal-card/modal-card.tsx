import { Component, Host, h, State, Method, Listen } from "@stencil/core";

@Component({
  tag: "bal-modal-card",
  styleUrl: "modal-card.scss",
  shadow: true,
})
export class ModalCard {

  @State() isActive = false;

  @Method()
  async open(): Promise<void> {
    this.isActive = true;
  }

  @Method()
  async close(): Promise<void> {
    this.isActive = false;
  }

  @Listen("keyup", { target: "body" })
  async handleKeyUp(event: KeyboardEvent) {
    if (this.isActive) {
      if (event.key === "Escape" || event.key === "Esc") {
        event.preventDefault();
        this.close();
      }
    }
  }

  render() {
    return (
      <Host>
        <div class={[
          "modal",
          "is-clipped",
          this.isActive ? "is-active" : "",
        ].join(" ")}>
          <div class="modal-background"></div>
          <div class="modal-card box">
            <header class="modal-card-head">
              <p class="modal-card-title">
                <slot name="head" />
              </p>
            </header>
            <section class="modal-card-body">
              <slot />
            </section>
            <footer class="modal-card-foot">
              <div class="modal-card-foot-container">
                <slot name="foot" />
              </div>
            </footer>
          </div>
        </div>
      </Host>
    );
  }

}

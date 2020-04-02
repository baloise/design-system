import {Component, Host, h, State, Method, Listen} from "@stencil/core";

@Component({
  tag: "bal-modal",
  styleUrl: "modal.scss",
  shadow: true,
})
export class Modal {

  @State() isActive = false;

  @Method()
  async open(): Promise<void> {
    this.isActive = true;
  }

  @Method()
  async close(): Promise<void> {
    this.isActive = false;
  }

  @Listen("keyup", {target: "body"})
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
          <div class="modal-content">
            <div class="box">
              <div class="section">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}

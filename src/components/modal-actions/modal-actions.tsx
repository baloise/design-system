import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "bal-modal-actions",
  styleUrl: "modal-actions.scss",
  shadow: true,
})
export class ModalActions {

  render() {
    return (
      <Host>
        <div class="buttons is-row-reverse">
          <slot />
        </div>
      </Host>
    );
  }

}

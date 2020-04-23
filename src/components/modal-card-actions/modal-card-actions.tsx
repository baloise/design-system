import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "bal-modal-card-actions",
  styleUrl: "modal-card-actions.scss",
  shadow: true,
})
export class ModalCardActions {

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

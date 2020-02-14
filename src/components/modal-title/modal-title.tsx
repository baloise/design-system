import {Component, Host, h} from "@stencil/core";

@Component({
  tag: "bal-modal-title",
  styleUrl: "modal-title.scss",
  shadow: true,
})
export class ModalTitle {

  render() {
    return (
      <Host>
        <h2 class="subtitle is-2">
          <slot/>
        </h2>
      </Host>
    );
  }

}

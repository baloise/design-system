import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "bal-spinner",
  styleUrl: "spinner.scss",
  shadow: true,
})
export class Spinner {
  render() {
    return (
      <Host>
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </Host>
    );
  }
}

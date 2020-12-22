import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "bal-list-item-content",
  shadow: false,
  scoped: false,
})
export class ListItemContent {
  render() {
    return (
      <Host class="bal-list-item-content">
        <slot></slot>
      </Host>
    );
  }
}

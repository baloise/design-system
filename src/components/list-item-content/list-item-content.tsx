import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "bal-list-item-content",
  styleUrl: "list-item-content.scss",
  shadow: false,
  scoped: false,
})
export class ListItemContent {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}

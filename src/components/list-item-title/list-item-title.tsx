import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "bal-list-item-title",
  styleUrl: "list-item-title.scss",
  scoped: false,
  shadow: false,
})
export class ListItemTitle {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}

import { Component, Host, h } from "@stencil/core"

@Component({
  tag: "bal-card-title",
  styleUrl: "card-title.scss",
  shadow: false,
  scoped: false,
})
export class CardTitle {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}

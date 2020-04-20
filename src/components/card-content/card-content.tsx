import { Component, Host, h } from "@stencil/core"

@Component({
  tag: "bal-card-content",
  styleUrl: "card-content.scss",
  shadow: false,
  scoped: false,
})
export class CardContent {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}

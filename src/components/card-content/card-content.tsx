import { Component, Host, h } from "@stencil/core"

@Component({
  tag: "bal-card-content",
  shadow: false,
  scoped: false,
})
export class CardContent {
  render() {
    return (
      <Host class="bal-card-content">
        <slot></slot>
      </Host>
    )
  }
}

import { Component, Host, h } from "@stencil/core"

@Component({
  tag: "bal-card-title",
  shadow: false,
  scoped: false,
})
export class CardTitle {
  render() {
    return (
      <Host class="bal-card-title" role="heading">
        <slot></slot>
      </Host>
    )
  }
}

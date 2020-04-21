import { Component, Host, h } from "@stencil/core"

@Component({
  tag: "bal-card-heading",
  shadow: false,
  scoped: false,
})
export class CardHeading {
  render() {
    return (
      <Host class="bal-card-heading">
        <slot></slot>
      </Host>
    )
  }
}

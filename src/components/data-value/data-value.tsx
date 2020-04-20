import { Component, Host, h } from "@stencil/core"

@Component({
  tag: "bal-data-value",
  styleUrl: "data-value.scss",
  shadow: false,
  scoped: false,
})
export class DataValue {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}

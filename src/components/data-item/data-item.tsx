import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-data-item",
  shadow: false,
  scoped: false,
})
export class DataItem {
  /**
   * If `true` the item gets a lighter font color.
   */
  @Prop()
  disabled = false

  render() {
    return (
      <Host
        class={["bal-data-item", this.disabled ? "is-disabled" : ""].join(" ")}
      >
        <slot></slot>
      </Host>
    )
  }
}

import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-list-item-icon",
  shadow: false,
  scoped: false,
})
export class ListItemIcon {
  /**
   * If `true` the icon is on the right side of the list item. Default is the left side.
   */
  @Prop()
  right = false

  render() {
    return (
      <Host
        class={["bal-list-item-icon", this.right ? "is-right" : ""].join(" ")}
      >
        <slot></slot>
      </Host>
    )
  }
}

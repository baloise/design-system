import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-list-item",
  shadow: false,
  scoped: false,
})
export class ListItem {
  /**
   * If `true` the list item can be hovered
   */
  @Prop()
  disabled = false

  /**
   * If `true` the list item has a selected theme
   */
  @Prop()
  selected = false

  render() {
    return (
      <Host
        role="listitem"
        class={[
          "bal-list-item",
          this.disabled ? "is-disabled" : "",
          this.selected ? "is-selected" : "",
        ].join(" ")}
      >
        <slot></slot>
      </Host>
    )
  }
}

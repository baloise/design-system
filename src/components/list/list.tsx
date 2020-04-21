import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-list",
  shadow: false,
  scoped: false,
})
export class List {
  /**
   * If `true` the list item can be hovered
   */
  @Prop()
  disabled = false

  /**
   * If `true` the list can be used on a dark backround
   */
  @Prop()
  inverted = false

  /**
   * If `true` each list item has a bottom border
   */
  @Prop()
  border = false

  render() {
    return (
      <Host
        role="listbox"
        class={[
          "bal-list",
          this.disabled ? "is-disabled" : "",
          this.inverted ? "is-inverted" : "",
          this.border ? "has-border" : "",
        ].join(" ")}
      >
        <slot></slot>
      </Host>
    )
  }
}

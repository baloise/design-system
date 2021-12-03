import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-card-content",
  shadow: false,
  scoped: false,
})
export class CardContent {
  /**
   * If `true` the card text color becomes white.
   */
  @Prop() inverted = false

  render() {
    return (
      <Host class={[
        "bal-card-content",
        this.inverted ? "inverted" : ""
      ].join(" ")}>
        <slot></slot>
      </Host>
    )
  }
}

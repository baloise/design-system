import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-card",
  shadow: false,
  scoped: false,
})
export class BalCard {
  /**
   * If `true` a light blue border is added to the card.
   */
  @Prop()
  border = false
  /**
   * If `true` the card loses its shadow.
   */
  @Prop()
  flat = false
  /**
   * If `true` the card loses its border radius.
   */
  @Prop()
  square = false
  /**
   * If `true` the card background color becomes blue.
   */
  @Prop()
  inverted = false

  render() {
    return (
      <Host
        class={[
          "bal-card",
          this.square ? "is-square" : "",
          this.border ? "has-border" : "",
          this.flat ? "is-flat" : "",
          this.inverted ? "is-inverted" : ""
        ].join(" ")}
      >
        <slot></slot>
      </Host>
    )
  }
}

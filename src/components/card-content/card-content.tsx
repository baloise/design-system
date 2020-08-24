import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-card-content",
  shadow: false,
  scoped: false,
})
export class CardContent {
  @Prop() inverted: boolean

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

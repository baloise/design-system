import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-card-title",
  shadow: false,
  scoped: false,
})
export class CardTitle {
  @Prop() inverted = false

  render() {
    return (
      <Host class={[
        "bal-card-title",
        this.inverted ? "inverted" : ""
      ].join(' ')} role="heading">
        <slot></slot>
      </Host>
    )
  }
}

import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-card-actions",
  styleUrl: "card-actions.scss",
  shadow: false,
  scoped: false,
})
export class CardActions {

  @Prop()
  right = false

  render() {
    return (
      <Host class={[this.right ? "is-right" : ""].join(" ")}>
        <slot></slot>
      </Host>
    )
  }
}

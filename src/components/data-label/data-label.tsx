import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-data-label",
  styleUrl: "data-label.scss",
  shadow: false,
  scoped: false,
})
export class DataLabel {

  /**
   * If `true` an asterix is added after the label.
   */
  @Prop()
  required = false

  render() {
    return (
      <Host>
        <slot></slot>
        {this.required ? "*" : ""}
      </Host>
    )
  }
}

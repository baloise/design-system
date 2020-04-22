import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "bal-card-button",
  shadow: false,
  scoped: false,
})
export class CardButton {
  /**
   * Name of the icon like `edit`.
   */
  @Prop()
  icon = ""

  render() {
    return (
      <Host class="bal-card-button">
        <bal-button expanded light bottem-rounded>
          {this.icon ? <bal-icon class="icon" name={this.icon}></bal-icon> : ""}
          <span class="label">
            <slot></slot>
          </span>
        </bal-button>
      </Host>
    )
  }
}

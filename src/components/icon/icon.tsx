import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "bal-icon",
  styleUrl: "icon.scss",
  scoped: true,
  shadow: false,
})
export class Icon {

  /**
   * The name of the icon without the bal-icon prefix.
   */
  @Prop()
  name = "";

  /**
   * Defines the size of the icon.
   */
  @Prop()
  size: "small" | "medium" | "large" | "" = "";

  @Prop()
  isFont = false;

  @Prop()
  isRight = false;

  @Prop()
  isLeft = false;

  get sizeCssClass() {
    if (this.size && this.size.length > 0) {
      return `is-${this.size}`;
    }
    return "";
  }

  get iconCssClass() {
    if (this.isFont) {
      return `icon-${this.name}`;
    }
    return `bal-icon-${this.name}`;
  }

  render() {
    return (
      <Host>
        <span class={[
          "icon",
          this.isRight ? "is-right" : "",
          this.isLeft ? "is-left" : "",
          this.sizeCssClass,
        ].join(" ")}>
          <i class={[
          this.iconCssClass,
          this.isFont ? "font" : "svg",
        ].join(" ")}></i>
        </span>
      </Host>
    );
  }

}

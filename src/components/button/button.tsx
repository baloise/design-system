import {Component, h, Host, Prop} from "@stencil/core";

@Component({
  tag: "bal-button",
  styleUrl: "button.scss",
  shadow: true,
})
export class Button {
  /**
   * The theme type of the button. Given by bulma our css framework.
   */
  @Prop() type:
    | "is-primary"
    | "is-info"
    | "is-success"
    | "is-warning"
    | "is-danger"
    | "is-link" = "is-primary";

  /**
   * Size of the button
   */
  @Prop() size:
    | "is-small"
    | "" = "";

  /**
   * If `true` the width of the buttons is limited
   */
  @Prop() isSquare: boolean;

  /**
   * If `true` the button is disabled
   */
  @Prop() disabled: boolean;

  /**
   * If `true` the button has a light color
   */
  @Prop() light: boolean;

  /**
   * If `true` the button has a full width
   */
  @Prop() expanded: boolean;

  /**
   * If `true` the button is outlined
   */
  @Prop() outlined: boolean;

  /**
   * If `true` the button is inverted
   */
  @Prop() inverted: boolean;

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop() loading: boolean;

  render() {
    return (
      <Host class={this.expanded ? "is-fullwidth" : ""}>
        <button
          class={[
            "button",
            this.type,
            this.size,
            this.light ? "is-light" : "",
            this.inverted ? "is-inverted" : "",
            this.outlined ? "is-outlined" : "",
            this.expanded ? "is-fullwidth" : "",
            this.loading ? "is-loading" : "",
            this.isSquare ? "is-square" : "",
          ].join(" ")}
          disabled={this.disabled}>
          {this.loading ? (
            <bal-spinner class="is-small is-inverted" />
          ) : (
            ""
          )}
          <span style={{display: this.loading ? "none" : "inline-block"}}>
            <slot/>
          </span>
        </button>
      </Host>
    );
  }
}

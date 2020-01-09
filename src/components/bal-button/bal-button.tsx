import {Component, h, Prop} from "@stencil/core";

@Component({
  tag: "bal-button",
  styleUrl: "bal-button.scss",
  shadow: true,
})
export class BalButton {
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
      <button
        class={[
          "button",
          this.type,
          this.light ? "is-light" : "",
          this.inverted ? "is-inverted" : "",
          this.outlined ? "is-outlined" : "",
          this.expanded ? "is-fullwidth" : "",
        ].join(" ")}
        disabled={this.disabled}>
        {this.loading ? (
          <bal-spinner class="is-small is-inverted"></bal-spinner>
        ) : (
          ""
        )}
        <span style={{display: this.loading ? "none" : "inline-block"}}>
            <slot/>
          </span>
      </button>
    );
  }
}

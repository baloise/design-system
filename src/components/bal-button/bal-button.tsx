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
    | "is-info is-outlined is-fullwidth"
    | "is-link" = "is-primary";

  /**
   * If `true` the button is disabled
   */
  @Prop() disabled: boolean;
  @Prop() light: boolean;
  @Prop() fullwidth: boolean;
  @Prop() outlined: boolean;
  @Prop() inverted: boolean;

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop() loading: boolean;

  render() {
    return (
        <button class={`button ${this.type} ${this.inverted ? 'is-inverted':''} ${this.outlined ? 'is-outlined':''} ${this.light ? 'is-light':''} ${this.fullwidth ? 'is-fullwidth':''}`} disabled={this.disabled}>
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

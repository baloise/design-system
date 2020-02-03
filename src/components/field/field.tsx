import {Component, Host, h, Prop} from "@stencil/core";

@Component({
  tag: "bal-field",
  styleUrl: "field.scss",
})
export class Field {

  /**
   * Label text
   */
  @Prop() label: string = "";

  /**
   * If `true` a asterix (*) is added to the label text
   */
  @Prop() required: boolean = false;

  /**
   * Validation message text
   */
  @Prop() validationMessage: string = "";

  /**
   * Baloise icon for the right side of the input
   */
  @Prop() iconRight: string = "";

  /**
   * Baloise icon for the left side of the input
   */
  @Prop() iconLeft: string = "";

  get buildIconLeftTemplate() {
    if (this.iconLeft) {
      return (
        <bal-icon name={this.iconLeft} isLeft={true} size="small"/>
      );
    }
    return ("");
  }

  get buildIconRightTemplate() {
    if (this.iconRight) {
      return (
        <bal-icon name={this.iconRight} isRight={true} size="small"/>
      );
    }
    return ("");
  }

  render() {
    return (
      <Host>
        <div class="form">
          <label class="label">{this.label}{this.required === true ? "*" : ""}</label>
          <div
            class={"control" + (this.iconLeft ? " has-icons-left" : "") + (this.iconRight ? " has-icons-right" : "")}>
            <slot></slot>
            {this.buildIconLeftTemplate}
            {this.buildIconRightTemplate}
          </div>
          <p class="help is-danger">{this.validationMessage}</p>
        </div>
      </Host>
    );
  }

}

import {Component, h, Host, Prop} from "@stencil/core";

@Component({
  tag: "bal-tag",
  styleUrl: "tag.scss",
  shadow: true,
})
export class Tag {
  /**
   * The theme type of the tag. Given by bulma our css framework.
   */
  @Prop() type:
    | "is-primary"
    | "is-info"
    | "is-success"
    | "is-warning"
    | "is-danger"
    | "is-light" = "is-light";

  constructor() {
    console.log("constructor");
  }

  componentWillLoad() {
    console.log("componentWillLoad");
  }

  componentDidLoad() {
    console.log("componentDidLoad");
  }

  render() {
    console.log("render");
    return (
      <Host>
        <span class={`tag ${this.type}`}><slot/></span>
      </Host>
    );
  }

}

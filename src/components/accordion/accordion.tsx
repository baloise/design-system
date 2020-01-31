import {Component, Host, h, Prop, State, Watch, Method} from "@stencil/core";

@Component({
  tag: "bal-accordion",
  shadow: true,
})
export class Accordion {

  @State() isCollapsed: boolean = true;

  /**
   * Type defines the theme of the accordion toggle
   */
  @Prop() type:
    | "is-primary"
    | "is-info" = "is-primary";

  /**
   * Controls if the accordion is collapsed or not
   */
  @Prop() collapsed: boolean = true;

  @Watch("collapsed")
  validateCollapsed(newValue: boolean) {
    this.isCollapsed = newValue;
  }

  /**
   * Open the accordion
   */
  @Method()
  async open() {
    this.isCollapsed = false;
  }

  /**
   * Close the accordion
   */
  @Method()
  async close() {
    this.isCollapsed = true;
  }

  /**
   * Triggers the accordion
   */
  @Method()
  async toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  componentWillLoad() {
    this.isCollapsed = this.collapsed;
  }

  render() {
    return (
      <Host class="accordion">
        <bal-button expanded={true}
                    light={true}
                    inverted={true}
                    type={this.type}
                    onClick={() => this.toggle()}>
          <span style={!this.isCollapsed && {display: "none"}}>
            <slot name="trigger-open">Open me!</slot>
          </span>
          <span style={this.isCollapsed && {display: "none"}}>
            <slot name="trigger-close">Close me!</slot>
          </span>
        </bal-button>
        <div style={this.isCollapsed && {display: "none"}}>
          <slot></slot>
        </div>
      </Host>
    );
  }

}

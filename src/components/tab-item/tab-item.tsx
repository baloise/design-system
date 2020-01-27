import {Component, Host, h, Prop, Method, State, Watch} from "@stencil/core";

export interface TabItemOptions {
  value: string;
  label: string;
  active: boolean;
}

@Component({
  tag: "bal-tab-item",
  styleUrl: "tab-item.scss",
  shadow: true,
})
export class TabItem {

  @State() isContentHidden = true;

  /**
   * This is the key of the tab.
   */
  @Prop() value: string = "";

  /**
   * Label for the tab.
   */
  @Prop() label: string = "";

  /**
   * Tell's if the tab is active and the content is visible.
   */
  @Prop() active: boolean = false;

  @Watch("active")
  activatedHandler(newActive: boolean) {
    this.isContentHidden = !newActive;
  }

  /**
   * Options of the tab like label, value etc.
   */
  @Method()
  async getOptions(): Promise<TabItemOptions> {
    return {
      value: this.value,
      label: this.label,
      active: this.active,
    };
  }

  /**
   * Sets the tab active.
   */
  @Method()
  async setActive(active: boolean): Promise<void> {
    this.active = active;
  }

  componentWillLoad() {
    this.isContentHidden = !this.active;
  }

  render() {
    return (
      <Host>
        <div style={this.isContentHidden && {display: "none"}}>
          <slot/>
        </div>
      </Host>
    );
  }

}

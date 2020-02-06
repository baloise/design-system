import {Component, Host, h, Prop, Method, State, Watch, Event, EventEmitter} from "@stencil/core";

export interface TabItemOptions {
  value: string;
  label: string;
  active: boolean;
  disabled: boolean;
  hasBubble: boolean;
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
   * If `true` a small red bubble is added to the tab.
   */
  @Prop() bubble: boolean = false;

  /**
   * If `true` the tab is disabled.
   */
  @Prop() disabled: boolean = false;

  /**
   * Tell's if the tab is active and the content is visible.
   */
  @Prop() active: boolean = false;

  @Watch("active")
  activatedHandler(newActive: boolean) {
    this.isContentHidden = !newActive;
  }

  /**
   * Emitted when the tabs get rendered.
   */
  @Event({eventName: "balTabChanged"}) tabChanged: EventEmitter;

  get options() {
    return {
      value: this.value,
      label: this.label,
      active: this.active,
      disabled: this.disabled,
      hasBubble: this.bubble,
    };
  }

  /**
   * Options of the tab like label, value etc.
   */
  @Method()
  async getOptions(): Promise<TabItemOptions> {
    return this.options;
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
    this.tabChanged.emit(this.options);
    return (
      <Host>
        <div style={this.isContentHidden && {display: "none"}}>
          <slot/>
        </div>
      </Host>
    );
  }

}

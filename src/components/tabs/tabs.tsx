import {Component, Host, h, Element, State, Event, EventEmitter, Method} from "@stencil/core";
import {TabItemOptions} from "../tab-item/tab-item";

@Component({
  tag: "bal-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class Tabs {
  @Element() element!: HTMLElement;

  @State() tabsOptions: TabItemOptions[] = [];

  /**
   * Emitted when the changes has finished.
   */
  @Event({eventName: "balTabsDidChange"}) tabsDidChange: EventEmitter<TabItemOptions>;

  /**
   * Select a tab by the value of the tab item.
   */
  @Method()
  async select(value: string) {
    this.tabs.forEach(t => t.setActive(t.value === value));
    this.readTabItems();
  }

  componentWillLoad() {
    this.readTabItems();
  }

  private readTabItems() {
    Promise.all(this.tabs.map(value => value.getOptions()))
      .then(tabsOptions => {
        this.tabsOptions = tabsOptions;
      });
  }

  private get tabs() {
    return Array.from(this.element.querySelectorAll("bal-tab-item"));
  }

  private async onSelectTab(tab: TabItemOptions) {
    await this.select(tab.value);
    this.tabsDidChange.emit(tab);
  }

  render() {
    return (
      <Host>
        <div class={[
          "tabs",
          "is-fullwidth",
        ].join(" ")}>
          <ul>
            {this.tabsOptions.map((tab) =>
              <li class={tab.active ? "is-active" : ""}>
                <a onClick={() => this.onSelectTab(tab)}>{tab.label}</a>
              </li>,
            )}
          </ul>
        </div>
        <slot/>
      </Host>
    );
  }

}

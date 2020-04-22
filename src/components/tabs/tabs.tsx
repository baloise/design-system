import {
  Component,
  Host,
  h,
  Element,
  State,
  Event,
  EventEmitter,
  Method,
  Prop,
  Listen,
} from "@stencil/core"
import { TabItemOptions } from "../tab-item/tab-item"

@Component({
  tag: "bal-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class Tabs {
  @Element() element!: HTMLElement

  @State() tabsOptions: TabItemOptions[] = []

  /**
   * If `true` the field expands over the whole width.
   */
  @Prop() expanded = false

  /**
   * If `true` the the padding gets reduced.
   */
  @Prop() dense = false

  /**
   * If you want the rounded tab style.
   */
  @Prop() rounded = false

  /**
   * Emitted when the changes has finished.
   */
  @Event({ eventName: "balTabsDidChange" }) tabsDidChange: EventEmitter<
    TabItemOptions
  >

  /**
   * Dropdown a tab by the value of the tab item.
   */
  @Method()
  async select(value: string) {
    this.tabs.forEach((t) => t.setActive(t.value === value))
    this.readTabItems()
  }

  componentWillLoad() {
    this.readTabItems()
  }

  @Listen("balTabChanged")
  tabChanged() {
    this.readTabItems()
  }

  private readTabItems() {
    Promise.all(this.tabs.map((value) => value.getOptions())).then(
      (tabsOptions) => {
        this.tabsOptions = tabsOptions
      },
    )
  }

  private get tabs() {
    return Array.from(this.element.querySelectorAll("bal-tab-item"))
  }

  private async onSelectTab(tab: TabItemOptions) {
    if (!tab.disabled) {
      await this.select(tab.value)
      this.tabsDidChange.emit(tab)
    }
  }

  render() {
    return (
      <Host>
        <div
          class={[
            "tabs",
            this.rounded ? "is-rounded" : "",
            this.dense ? "is-dense" : "",
            this.expanded ? "is-fullwidth" : "",
          ].join(" ")}
        >
          <ul>
            {this.tabsOptions.map((tab) => (
              <li
                class={[
                  tab.active ? "is-active" : "",
                  tab.disabled ? "is-disabled" : "",
                ].join(" ")}
              >
                <a onClick={() => this.onSelectTab(tab)}>{tab.label}</a>
                <span
                  class="bubble"
                  style={!tab.hasBubble && { display: "none" }}
                ></span>
              </li>
            ))}
            <li class="is-right">
              <slot name="action" />
            </li>
          </ul>
        </div>
        <slot />
      </Host>
    )
  }
}

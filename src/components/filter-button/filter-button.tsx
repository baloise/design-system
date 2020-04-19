import { Component, Host, h, State, Prop, Watch, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "bal-filter-button",
  styleUrl: "filter-button.scss",
  shadow: true,
})
export class FilterButton {
  @State() isActive: boolean = false;

  /**
   * If `true` then the button is active/selected
   */
  @Prop() active: boolean = false;

  @Watch("active")
  validateCollapsed(newValue: boolean) {
    this.isActive = newValue;
  }

  /**
   * Triggers when the value of the filter-button is changed
   */
  @Event({
    eventName: "balChange",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  balChangeEventEmitter!: EventEmitter<boolean>;

  componentWillLoad() {
    this.isActive = this.active;
  }

  async toggle(): Promise<void> {
    this.isActive = !this.isActive;
    this.balChangeEventEmitter.emit(this.isActive);
  }

  render() {
    return (
      <Host>
        <bal-button
          type="is-info"
          dense
          outlined
          is-active={this.isActive}
          onClick={() => this.toggle()}
        >
          <div class="filter-button-inner">
            <div class="bal-checkbox">
              <input type="checkbox" checked={this.isActive} />
              <label>
                <slot></slot>
              </label>
            </div>
          </div>
        </bal-button>
      </Host>
    );
  }
}

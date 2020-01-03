import {Component, Host, h, State, Method, Prop, EventEmitter, Event, Listen, Element, Watch} from "@stencil/core";

export interface DropDownOption {
  label: string;
  value: any;
}

@Component({
  tag: "bal-dropdown",
  styleUrl: "bal-dropdown.scss",
  shadow: true,
})
export class BalDropdown {
  @Element() element!: HTMLElement;

  @State() dropdownIsActive = false;
  @State() selected: DropDownOption = null;

  /**
   * If `true` the field gets a line below.
   */
  @Prop() showBottomLine = true;

  /**
   * The value of the selected dropdown item.
   */
  @Prop({mutable: true, reflect: true}) value: any = null;

  @Watch("value")
  valueWatcher(newValue: any) {
    this.selectDropdownItem.emit(newValue);
  }

  @Event() dropdownSelected: EventEmitter;
  @Event() selectDropdownItem: EventEmitter;

  componentDidLoad() {
    if (this.value) {
      this.selectDropdownItem.emit(this.value);
    }
  }

  @Listen("click", {target: "document"})
  clickOnOutside(event: UIEvent) {
    if (!this.element.contains((event.target as any)) && this.dropdownIsActive) {
      this.toggle();
    }
  }

  /**
   * Open & closes the dropdown
   */
  @Method()
  async toggle() {
    this.dropdownIsActive = !this.dropdownIsActive;
  }

  /**
   * Selects a dropdown item and changes the value.
   */
  @Method()
  async selectItem(option: DropDownOption) {
    this.value = option.value;
    this.selected = option;
    this.dropdownSelected.emit(this.value);
    if (this.dropdownIsActive) {
      this.toggle();
    }
  }

  /**
   * Returns the value of the dropdown.
   */
  @Method()
  async getSelectedValue() {
    return this.value;
  }

  get dropDownTitle() {
    return this.selected && this.selected.label || "-";
  }

  render() {
    return (
      <Host>
        <div class={this.dropdownIsActive ? "dropdown is-active" : "dropdown"}>
          <div class="dropdown-trigger">
            <button class={this.showBottomLine ? "button showBottomLine" : "button"}
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    onClick={() => this.toggle()}>
              <span innerHTML={this.dropDownTitle}></span>
              <span class="icon is-small">
                <i class="bal-icon-caret-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <slot/>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

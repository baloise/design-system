import {Component, Host, h, State, Method, Prop, EventEmitter} from "@stencil/core";

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

  @Prop() options: DropDownOption[] = [
    {
      label: "bubu",
      value: "bubu",
    },
    {
      label: "lala",
      value: "lala",
    },
  ];
  @Event() optionChanged: EventEmitter;

  @State() dropdownIsActive = false;
  @State() selectedOption: DropDownOption;

  @Method()
  async toggle() {
    this.dropdownIsActive = !this.dropdownIsActive;
  }

  onOptionSelected(option: DropDownOption) {
    this.selectedOption = option;
    this.toggle();
    this.optionChanged.emit(option);
  }

  get dropDownTitle() {
    return this.selectedOption && this.selectedOption.label || "-";
  }

  render() {
    return (
      <Host>
        <div class={this.dropdownIsActive ? "dropdown is-active" : "dropdown"}>
          <div class="dropdown-trigger">
            <button class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    onClick={() => this.toggle()}>
              <span>{this.dropDownTitle}</span>
              <span class="icon is-small">
                <i class="bal-icon-caret-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              {this.options.map((option) =>
                <a class="dropdown-item" onClick={() => this.onOptionSelected(option)}>
                  {option.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

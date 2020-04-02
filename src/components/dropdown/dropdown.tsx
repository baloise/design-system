import {Component, Host, h, Method, Element, Prop, State, Event, EventEmitter, Listen, Watch} from "@stencil/core";
import {Option} from "../dropdown-option/dropdown-option.types";

@Component({
  tag: "bal-dropdown",
  styleUrl: "dropdown.scss",
  shadow: true,
})
export class Dropdown {
  @Element() element!: HTMLElement;
  inputElement!: HTMLInputElement;
  dropdownContentElement!: HTMLDivElement;

  hasNoData = false;
  isPristine = true;
  activeItemIndex = -1;

  @State() selectedOption: Option = null;

  @State() isActive = false;

  @Watch("isActive")
  async isActiveWatcher(newIsActive: boolean) {
    if (newIsActive) {
      if (this.typeahead) {
        this.activeItemIndex = 0;
        this.isPristine = true;
        const items = this.children;
        if (items.length > 0) {
          const firstVisibleItemIndex = (await this.childrenWithHiddenState).indexOf(false);
          this.activeItemIndex = firstVisibleItemIndex;
          items.forEach((child, index) =>
            child.activated = index === firstVisibleItemIndex);
        }
      } else {
        if (this.value) {
          this.activeItemIndex = (await this.childrenWithActivatedState).indexOf(true);
        }
      }
    }
  }

  /**
   * The value of the selected dropdown item.
   */
  @Prop() value: Option = null;

  @Watch("value")
  valueWatcher(newValue: Option) {
    if (newValue) {
      this.selectedOption = this.value;
      this.inputElement.value = this.value.label;
      this.updateActivatedOptions();
    }
  }

  componentWillLoad() {
    if (this.value) {
      this.selectedOption = this.value;
    }
  }

  componentDidLoad() {
    if (this.value) {
      this.inputElement.value = this.value.label;
      this.updateActivatedOptions();
    }
  }

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop()
  placeholder = "";

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop()
  readonly = false;

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop()
  disabled = false;

  @Watch("disabled")
  disabledWatcher(newValue: boolean) {
    if (newValue === true) {
      this.isActive = false;
    }
  }

  /**
   * If `true`, the use can search for the option.
   */
  @Prop()
  typeahead = false;

  /**
   * If `true`, the height of the dropdown content is fixed.
   */
  @Prop()
  fixed = true;

  /**
   * If `true`, the component uses the whole width.
   */
  @Prop()
  expanded = false;

  /**
   * Defines the trigger icon on the right site.
   */
  @Prop()
  triggerIcon = "caret-down";

  /**
   * Emitted when containing input field raises an input event.
   */
  @Event() balInput!: EventEmitter<string>;

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<Option>;

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() balBlur!: EventEmitter<void>;

  /**
   * Emitted when the toggle has focus..
   */
  @Event() balFocus!: EventEmitter<void>;

  @Listen("click", {target: "document"})
  clickOnOutside(event: UIEvent) {
    if (!this.element.contains((event.target as any)) && this.isActive) {
      this.toggle();
    }
  }

  /**
   * Selects an option.
   */
  @Method()
  async select(option: Option): Promise<void> {
    this.selectedOption = option;
    this.value = option;
    this.inputElement.value = option.label;
    this.close();
    this.balChange.emit(option);
    this.updateActivatedOptions();
  }

  /**
   * Returns the value of the dropdown.
   */
  @Method()
  async getSelected(): Promise<Option> {
    return this.selectedOption;
  }

  /**
   * Open & closes the dropdown.
   */
  @Method()
  async toggle() {
    this.isActive = !this.isActive;
  }

  /**
   * Open the dropdown menu.
   */
  @Method()
  async open() {
    this.isActive = true;
  }

  /**
   * Closes the dropdown menu.
   */
  @Method()
  async close() {
    this.isActive = false;
  }

  get children(): HTMLBalDropdownOptionElement[] {
    return Array.from(
      this.element.querySelectorAll<HTMLBalDropdownOptionElement>("bal-dropdown-option"),
    );
  }

  get childrenWithHiddenState(): Promise<boolean[]> {
    return Promise.all(this.children.map(child => child.isHidden()));
  }

  get childrenWithActivatedState(): Promise<boolean[]> {
    return Promise.all(this.children.map(child => child.activated));
  }

  get childrenWithValue(): Promise<any[]> {
    return Promise.all(this.children.map(child => child.value));
  }

  updateActivatedOptions() {
    this.children
      .forEach(child => child.activated = child.value === this.selectedOption.value);
  }

  clicked() {
    if (!this.typeahead) {
      this.toggle();
    }
  }

  async onInput(event: InputEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.balInput.emit(inputValue);
  }

  async onKeyUp(event: KeyboardEvent) {
    if (!this.disabled && ["Enter", "ArrowUp", "ArrowDown"].indexOf(event.key) < 0) {
      const inputValue = (event.target as HTMLInputElement).value;
      this.isActive = !!inputValue;
      const children = this.children;
      if (this.typeahead && children && children.length > 0) {
        children.forEach(child => child.highlight = inputValue);
      }
      this.hasNoData = (await this.childrenWithHiddenState).every(hidden => hidden === true);
    }
  }

  @Listen("keyup")
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault();
      this.isActive = false;
    }
  }

  @Listen("keydown")
  async handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Down" || event.key === "Up") {
      event.preventDefault();
      await this.focusNextItem(event.key === "ArrowDown" || event.key === "Down");
    }
    if (event.key === "Enter" && this.activeItemIndex > 0) {
      event.preventDefault();
      this.select({
        label: this.children[this.activeItemIndex].label,
        value: this.children[this.activeItemIndex].value,
      });
    }
  }

  async getNextItem(): Promise<number> {
    let hasSetIndex = false;
    let nextIndex;
    if (this.activeItemIndex >= 0) {
      nextIndex = this.activeItemIndex;
    }
    (await this.childrenWithHiddenState).forEach((isHidden, index) => {
      if (index > this.activeItemIndex && !isHidden && !hasSetIndex) {
        nextIndex = index;
        hasSetIndex = true;
      }
    });
    return nextIndex;
  }

  async getPreviousItem(): Promise<number> {
    let previousIndex = this.activeItemIndex;
    (await this.childrenWithHiddenState).forEach((isHidden, index) => {
      if (index < this.activeItemIndex && !isHidden) {
        previousIndex = index;
      }
    });
    return previousIndex;
  }

  async focusNextItem(isArrowDown: boolean) {
    const children = this.children;
    if (children && children.length > 0 && !this.disabled) {
      if (isArrowDown) {
        this.activeItemIndex = await this.getNextItem();
      } else {
        this.activeItemIndex = await this.getPreviousItem();
      }

      const scrollPuffer = this.element.offsetTop + 45;
      const activeChild = children[this.activeItemIndex] || children[0];
      const visMin = this.dropdownContentElement.scrollTop + scrollPuffer;
      const visMax = this.dropdownContentElement.scrollTop + scrollPuffer
        + this.dropdownContentElement.clientHeight - activeChild.clientHeight;

      if (activeChild.offsetTop < visMin) {
        this.dropdownContentElement.scrollTop = activeChild.offsetTop - scrollPuffer;

      } else if (activeChild.offsetTop >= visMax) {
        this.dropdownContentElement.scrollTop = (
          activeChild.offsetTop - scrollPuffer -
          this.dropdownContentElement.clientHeight +
          activeChild.clientHeight
        );
      }

      children
        .forEach((child, index) =>
          child.activated = index === this.activeItemIndex);
    }
  }

  render() {
    return (
      <Host>
        <div class={[
          "dropdown",
          this.expanded ? "is-fullwidth" : "",
          this.isActive ? "is-active" : "",
          this.fixed ? "is-fixed" : "",
          this.typeahead ? "is-typeahead" : "",
        ].join(" ")}>
          <div class="dropdown-trigger">
            <div class={[
              "control",
              this.triggerIcon && !this.typeahead ? "has-icons-right" : "",
            ].join(" ")}>
              <input class={[
                "input",
                this.isActive ? "is-focused" : "",
              ].join(" ")}
                     autocomplete="off"
                     disabled={this.disabled}
                     readOnly={this.readonly || !this.typeahead}
                     placeholder={this.placeholder}
                     onKeyUp={this.onKeyUp.bind(this)}
                     onInput={this.onInput.bind(this)}
                     onClick={this.clicked.bind(this)}
                     onBlur={this.balBlur.emit.bind(this)}
                     onFocus={this.balFocus.emit.bind(this)}
                     ref={el => this.inputElement = el as HTMLInputElement}
              />
              <bal-icon size="small"
                        name={this.triggerIcon}
                        isRight={true}
                        style={{display: this.triggerIcon && !this.typeahead ? "flex" : "none"}}/>
            </div>
          </div>
          <div class="dropdown-menu" role="menu">
            <div class="dropdown-content"
                 ref={el => this.dropdownContentElement = el as HTMLDivElement}>
              <slot/>
              <span class="no-data" style={!this.hasNoData && {display: "none"}}>
                <slot name="no-data-content">No Data</slot>
              </span>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}

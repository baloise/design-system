import {Component, Host, h, State, Element, Method, Prop, Watch, Event, EventEmitter, Listen} from "@stencil/core";

@Component({
  tag: "bal-autocomplete",
  styleUrl: "autocomplete.scss",
  shadow: true,
})
export class Autocomplete {
  @Element() element!: HTMLElement;

  inputElement!: HTMLInputElement;
  dropdownContent!: HTMLDivElement;
  hasNoData = false;
  isPristine = true;
  activeItemIndex = -1;

  @State() isActive = false;

  @Watch("isActive")
  async isActiveWatcher(newIsActive: boolean) {
    if (newIsActive) {
      this.activeItemIndex = 0;
      this.isPristine = true;
      const items = this.children;
      if (items.length > 0) {
        const firstVisibleItemIndex = (await this.childrenWithHiddenState).indexOf(false);
        this.activeItemIndex = firstVisibleItemIndex;
        items.forEach((child, index) =>
          child.activated = index === firstVisibleItemIndex);
      }
    }
  }

  /**
   * If `true` the field expands over the whole width.
   */
  @Prop() expanded: boolean = false;

  /**
   * If `true` the field is disabled
   */
  @Prop() disabled: boolean = false;

  @Watch("disabled")
  disabledWatcher(newValue: boolean) {
    if (newValue === true) {
      this.isActive = false;
    }
  }

  /**
   * The value of the autocomplete.
   */
  @Prop() value: string = "";

  @Watch("value")
  valueWatcher(newValue: string) {
    this.inputElement.value = newValue;
    this.isActive = false;
  }

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<string>;

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() balBlur!: EventEmitter<void>;

  /**
   * Emitted when the toggle has focus..
   */
  @Event() balFocus!: EventEmitter<void>;

  /**
   * Sets the given value to the input, closes the dropdown and triggers a change event.
   */
  @Method()
  async selectItem(newValue: string): Promise<void> {
    this.inputElement.value = newValue;
    this.isActive = false;
    this.balChange.emit(newValue);
  }

  componentDidLoad() {
    if (this.value) {
      this.inputElement.value = this.value;
    }
  }

  get children(): HTMLBalAutocompleteItemElement[] {
    return Array.from(
      this.element.querySelectorAll<HTMLBalAutocompleteItemElement>("bal-autocomplete-item"),
    );
  }

  get childrenWithHiddenState(): Promise<boolean[]> {
    return Promise.all(this.children.map(child => child.isHidden()));
  }

  async onKeyUp(event: KeyboardEvent) {
    if (!this.disabled && ["Enter", "ArrowUp", "ArrowDown"].indexOf(event.key) < 0) {
      const inputValue = (event.target as HTMLInputElement).value;
      this.isActive = !!inputValue;
      const children = this.children;
      if (children && children.length > 0) {
        children.forEach(child => child.highlightedValue = inputValue);
      }
      const areChildrenDisplayed = await Promise.all(children.map(child => child.isDisplayed()));
      this.hasNoData = areChildrenDisplayed.every(displayed => displayed === false);
    }
  }

  @Listen("click", {target: "document"})
  clickOnOutside(event: UIEvent) {
    if (!this.element.contains((event.target as any)) && this.isActive) {
      this.isActive = false;
    }
  }

  @Listen("keyup")
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      this.isActive = false;
    }
  }

  @Listen("keydown")
  async handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      await this.focusNextItem(event.key === "ArrowDown");
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const value = this.children[this.activeItemIndex].value;
      this.selectItem(value);
    }
  }

  async getNextItem(): Promise<number> {
    let nextIndex;
    (await this.childrenWithHiddenState).forEach((isHidden, index) => {
      if (index > this.activeItemIndex && !isHidden && nextIndex === undefined) {
        nextIndex = index;
      }
    });
    return nextIndex || this.activeItemIndex;
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

      const scrollPuffer = 156;
      const activeChild = children[this.activeItemIndex];
      const visMin = this.dropdownContent.scrollTop + scrollPuffer;
      const visMax = this.dropdownContent.scrollTop + scrollPuffer
        + this.dropdownContent.clientHeight - activeChild.clientHeight;

      if (activeChild.offsetTop < visMin) {
        this.dropdownContent.scrollTop = activeChild.offsetTop - scrollPuffer;

      } else if (activeChild.offsetTop >= visMax) {
        this.dropdownContent.scrollTop = (
          activeChild.offsetTop -
          this.dropdownContent.clientHeight +
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
        ].join(" ")}>
          <div class="dropdown-trigger">
            <div class="autocomplete control">
              <input class="input"
                     placeholder="Placeholder Text"
                     disabled={this.disabled}
                     onKeyUp={this.onKeyUp.bind(this)}
                     onFocus={() => this.balFocus.emit()}
                     onBlur={() => this.balBlur.emit()}
                     ref={el => this.inputElement = el as HTMLInputElement}
              />
            </div>
          </div>
          <div class="dropdown-menu" role="menu">
            <div class="dropdown-content"
                 ref={el => this.dropdownContent = el as HTMLDivElement}>
              <slot/>
              <span class="autocomplete-no-data" style={!this.hasNoData && {display: "none"}}>
                <slot name="no-data-content">No Data</slot>
              </span>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}

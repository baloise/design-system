import {
  Component,
  Host,
  h,
  Method,
  Element,
  Prop,
  State,
  Event,
  EventEmitter,
  Listen,
  Watch,
} from "@stencil/core"
import { Option } from "../dropdown-option/dropdown-option.types"

@Component({
  tag: "bal-dropdown",
  styleUrl: "dropdown.scss",
  shadow: true,
})
export class Dropdown {
  public static MIN_DISTANCE_TO_BROWSER_BORDER = 30

  @Element() element!: HTMLElement
  inputElement!: HTMLInputElement
  searchInputElement!: HTMLInputElement
  dropdownContentElement!: HTMLDivElement
  dropdownMenuElement!: HTMLDivElement

  hasNoData = false
  isPristine = true
  activeItemIndex = -1

  @State() selectedOption: Option | Option[] = null
  @State() hasFocus = false

  @State() maxDropdownWidth = 100
  @State() isActive = false

  @Watch("isActive")
  async isActiveWatcher(newIsActive: boolean) {
    if (newIsActive) {
      if (this.typeahead && this.preActivateFirst) {
        this.activeItemIndex = 0
        this.isPristine = true
        const items = this.children
        if (items.length > 0) {
          const firstVisibleItemIndex = (
            await this.childrenWithHiddenState
          ).indexOf(false)
          this.activeItemIndex = firstVisibleItemIndex
          items.forEach(
            (child, index) =>
              (child.selected = index === firstVisibleItemIndex),
          )
        }
      } else {
        if (this.value) {
          this.activeItemIndex = (
            await this.childrenWithActivatedState
          ).indexOf(true)
        }
      }
    }
  }

  /**
   * The value of the selected dropdown item.
   */
  @Prop() value: Option | Option[] = null

  @Watch("value")
  valueWatcher(newValue: Option | Option[]) {
    if (newValue) {
      this.selectedOption = this.value
      this.updateLabel()
      this.updateActivatedOptions()
    }
  }

  updateLabel() {
    let label = ""
    if (Array.isArray(this.value)) {
      label = this.value
        .filter((v) => v)
        .map((v) => v.label)
        .join(", ")
    } else {
      label = this.value.label
    }
    this.inputElement.value = label
  }

  componentWillLoad() {
    if (this.value) {
      this.selectedOption = this.value
    }
  }

  componentDidLoad() {
    if (this.value) {
      this.updateLabel()
      this.updateActivatedOptions()
    }

    this.dropdownMenuElement.addEventListener("mouseenter", () => {
      document.body.style.overflow = "hidden"
      document.body.style.marginRight = "15px"
    })
    this.dropdownMenuElement.addEventListener("mouseleave", () => {
      document.body.style.overflow = "auto"
      document.body.style.marginRight = "0"
    })
  }

  /**
   * TODO: Describe
   */
  @Prop() multiSelect = false

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder = ""

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() readonly = false

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() disabled = false

  @Watch("disabled")
  disabledWatcher(newValue: boolean) {
    if (newValue === true) {
      this.isActive = false
      this.fireBlurIfPossible()
    }
  }

  /**
   * If `true`, the use can search for the option.
   */
  @Prop() typeahead = false

  /**
   * If `true`, the first visible option in the dropdown will become activated for selection if nothing else has been selected before. Only works on typeahead
   */
  @Prop() preActivateFirst = true

  /**
   * If `true`, the height of the dropdown content is fixed.
   */
  @Prop() fixed = true

  /**
   * If `true`, the component uses the whole width.
   */
  @Prop() expanded = false

  /**
   * Defines the trigger icon on the right site.
   */
  @Prop() triggerIcon = "caret-down"

  /**
   * Emitted when containing input field raises an input event.
   */
  @Event() balInput!: EventEmitter<string>

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<Option>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event({
    composed: true,
    cancelable: false,
    bubbles: false,
  })
  balBlur!: EventEmitter<void>

  /**
   * Emitted when the toggle has focus..
   */
  @Event() balFocus!: EventEmitter<void>

  @Listen("keyup", { target: "document" })
  tabOutside(event: KeyboardEvent) {
    if (
      event.key === "Tab" &&
      !this.element.contains(document.activeElement) &&
      this.isActive
    ) {
      this.toggle()
    }
  }

  @Listen("click", { target: "document" })
  clickOnOutside(event: UIEvent) {
    if (!this.element.contains(event.target as any) && this.isActive) {
      this.toggle()
    }
  }

  private prepareValues(value: Option | Option[], option: Option) {
    let values = Array.isArray(value) ? value : [value]
    values = values.filter((v) => v)
    if (values.map((v) => v.value).indexOf(option.value) >= 0) {
      return values.filter((v) => v.value !== option.value)
    }
    return [...values, option]
  }

  /**
   * Selects an option.
   */
  @Method()
  async select(option: Option): Promise<void> {
    if (this.multiSelect) {
      this.value = this.prepareValues(this.value, option)
      this.selectedOption = this.prepareValues(this.selectedOption, option)

      this.value = this.value.filter((v) => v)
      this.selectedOption = this.selectedOption.filter((v) => v)
    } else {
      this.selectedOption = option
      this.value = option
    }

    this.balChange.emit(option)
    this.updateLabel()
    if (!this.multiSelect) {
      this.close()
    }
    this.updateActivatedOptions()
  }

  /**
   * Returns the value of the dropdown.
   */
  @Method()
  async getSelected(): Promise<Option | Option[]> {
    return this.selectedOption
  }

  /**
   * Open & closes the dropdown.
   */
  @Method()
  async toggle() {
    this.adjustMaxDropdownWidth()
    this.isActive = !this.isActive
    this.fireBlurIfPossible()
  }

  /**
   * Open the dropdown menu.
   */
  @Method()
  async open() {
    this.adjustMaxDropdownWidth()
    this.isActive = true
  }

  /**
   * Closes the dropdown menu.
   */
  @Method()
  async close() {
    this.isActive = false
    this.fireBlurIfPossible()
  }

  get children(): HTMLBalDropdownOptionElement[] {
    return Array.from(
      this.element.querySelectorAll<HTMLBalDropdownOptionElement>(
        "bal-dropdown-option",
      ),
    )
  }

  get childrenWithHiddenState(): Promise<boolean[]> {
    return Promise.all(this.children.map((child) => child.isHidden()))
  }

  get childrenWithActivatedState(): Promise<boolean[]> {
    return Promise.all(this.children.map((child) => child.selected))
  }

  get childrenWithValue(): Promise<any[]> {
    return Promise.all(this.children.map((child) => child.value))
  }

  get isUp(): boolean {
    const box = this.element.getBoundingClientRect()
    return window.innerHeight - box.top < window.innerHeight / 2
  }

  updateActivatedOptions() {
    this.children.forEach((child) => {
      if (Array.isArray(this.selectedOption)) {
        child.selected =
          this.selectedOption
            .filter((o) => o)
            .map((o) => o.value)
            .indexOf(child.value) >= 0
      } else {
        child.selected = child.value === this.selectedOption.value
      }
    })
  }

  clicked() {
    if (!this.typeahead || (this.typeahead && this.multiSelect)) {
      this.toggle()
    }

    if (this.typeahead && this.multiSelect) {
      setTimeout(() => this.searchInputElement.focus(), 100)
    }
  }

  async onFocus() {
    this.hasFocus = true
    this.balFocus.emit()
  }

  async onBlur() {
    this.hasFocus = false
    this.balFocus.emit()
  }

  async fireBlurIfPossible() {
    if (!this.hasFocus && !this.isActive) {
      this.balBlur.emit()
    }
  }

  async onInput(event: InputEvent) {
    const inputValue = (event.target as HTMLInputElement).value
    this.balInput.emit(inputValue)
  }

  async onKeyUp(event: KeyboardEvent) {
    if (
      !this.disabled &&
      ["Enter", "ArrowUp", "ArrowDown", "Up", "Down"].indexOf(event.key) < 0
    ) {
      const inputValue = (event.target as HTMLInputElement).value
      if (this.typeahead && !this.multiSelect) {
        this.isActive = !!inputValue
        this.adjustMaxDropdownWidth()
      }
      const children = this.children
      if (this.typeahead && children && children.length > 0) {
        children.forEach((child) => (child.highlight = inputValue))
      }
      const childrenWithHiddenState = await this.childrenWithHiddenState
      this.hasNoData =
        childrenWithHiddenState.every((hidden) => hidden === true) &&
        childrenWithHiddenState.length > 0
      this.fireBlurIfPossible()
    }
  }
  
  adjustMaxDropdownWidth() {
    const rect = this.inputElement.getBoundingClientRect()
    this.maxDropdownWidth = window.innerWidth - rect.x - Dropdown.MIN_DISTANCE_TO_BROWSER_BORDER
  }

  @Listen("keyup")
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault()
      this.isActive = false
      this.fireBlurIfPossible()
    }
  }

  @Listen("keydown")
  async handleKeyDown(event: KeyboardEvent) {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "Down" ||
      event.key === "Up"
    ) {
      event.preventDefault()
      await this.focusNextItem(
        event.key === "ArrowDown" || event.key === "Down",
      )
    }
    if (event.key === "Enter" && this.activeItemIndex >= 0) {
      event.preventDefault()
      this.select({
        label: this.children[this.activeItemIndex].label,
        value: this.children[this.activeItemIndex].value,
      })
    }
  }

  async getNextItem(): Promise<number> {
    let hasSetIndex = false
    let nextIndex
    if (this.activeItemIndex >= 0) {
      nextIndex = this.activeItemIndex
    }
    ;(await this.childrenWithHiddenState).forEach((isHidden, index) => {
      if (index > this.activeItemIndex && !isHidden && !hasSetIndex) {
        nextIndex = index
        hasSetIndex = true
      }
    })
    return nextIndex
  }

  async getPreviousItem(): Promise<number> {
    let previousIndex = this.activeItemIndex
    ;(await this.childrenWithHiddenState).forEach((isHidden, index) => {
      if (index < this.activeItemIndex && !isHidden) {
        previousIndex = index
      }
    })
    return previousIndex
  }

  async focusNextItem(isArrowDown: boolean) {
    const children = this.children
    if (children && children.length > 0 && !this.disabled) {
      if (isArrowDown) {
        this.activeItemIndex = await this.getNextItem()
      } else {
        this.activeItemIndex = await this.getPreviousItem()
      }

      const activeChild = children[this.activeItemIndex] || children[0]
      const isTop = this.dropdownMenuElement.offsetTop < 0
      const menuIsTopPuffer = isTop
        ? this.typeahead && this.multiSelect
          ? 6 * activeChild.clientHeight - 10
          : 133
        : 0

      if (isTop) {
        this.dropdownContentElement.scrollTop =
          activeChild.offsetTop +
          this.dropdownMenuElement.clientHeight -
          menuIsTopPuffer
      } else {
        this.dropdownContentElement.scrollTop =
          activeChild.offsetTop -
          this.dropdownMenuElement.clientHeight +
          menuIsTopPuffer
      }

      const isInSelected = (
        value: string | boolean | number | object,
      ): boolean => {
        if (this.selectedOption) {
          if (Array.isArray(this.selectedOption)) {
            return this.selectedOption.map((o) => o.value).indexOf(value) >= 0
          } else {
            return this.selectedOption.value === value
          }
        }
        return false
      }

      children.forEach((child, index) => {
        child.focused =
          index === this.activeItemIndex || isInSelected(child.value)
      })
    }
  }

  render() {
    return (
      <Host>
        <div
          class={[
            "dropdown",
            this.expanded ? "is-fullwidth" : "",
            this.isActive ? "is-active" : "",
            this.fixed ? "is-fixed" : "",
            this.isUp ? "is-up" : "",
            this.typeahead ? "is-typeahead" : "",
            this.multiSelect ? "is-multi-select" : "",
          ].join(" ")}
        >
          <div class="dropdown-trigger">
            <div
              class={[
                "control",
                this.triggerIcon && !this.typeahead ? "has-icons-right" : "",
              ].join(" ")}
            >
              <input
                part="input"
                class={["input", this.isActive ? "is-focused" : ""].join(" ")}
                autocomplete="off"
                disabled={this.disabled}
                readOnly={
                  this.readonly ||
                  !this.typeahead ||
                  (this.typeahead && this.multiSelect)
                }
                placeholder={this.placeholder}
                onKeyUp={this.onKeyUp.bind(this)}
                onInput={this.onInput.bind(this)}
                onClick={this.clicked.bind(this)}
                onBlur={this.onBlur.bind(this)}
                onFocus={this.onFocus.bind(this)}
                ref={(el) => (this.inputElement = el as HTMLInputElement)}
              />
              <bal-icon
                size="medium"
                name={this.triggerIcon}
                isRight={true}
                style={{
                  display:
                    this.triggerIcon && !this.typeahead ? "flex" : "none",
                }}
              />
            </div>
          </div>
          <div
            class="dropdown-menu"
            style={{maxWidth: this.maxDropdownWidth + 'px' }}
            role="menu"
            ref={(el) => (this.dropdownMenuElement = el as HTMLInputElement)}
          >
            <div class="dropdown-content">
              {this.hasNoData || (this.multiSelect && this.typeahead) ? (
                <div class="dropdown-content-search">
                  <bal-field icon-left="search">
                    <input
                      part="input"
                      class={["input"].join(" ")}
                      autocomplete="off"
                      placeholder={this.placeholder}
                      onKeyUp={this.onKeyUp.bind(this)}
                      ref={(el) =>
                        (this.searchInputElement = el as HTMLInputElement)
                      }
                    />
                  </bal-field>
                </div>
              ) : (
                ""
              )}
              <div
                class="dropdown-content-options"
                ref={(el) =>
                  (this.dropdownContentElement = el as HTMLDivElement)
                }
              >
                <slot />
              </div>
              <span
                class="no-data"
                style={!this.hasNoData && { display: "none" }}
              >
                <slot name="no-data-content">No Data</slot>
              </span>
            </div>
          </div>
        </div>
      </Host>
    )
  }
}

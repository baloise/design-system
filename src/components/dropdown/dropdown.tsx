import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core'
import { Option } from '../dropdown-option/dropdown-option.types'

@Component({
  tag: 'bal-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class Dropdown {
  public static MIN_DISTANCE_TO_BROWSER_BORDER = 30

  @Element() element!: HTMLElement
  inputElement!: HTMLInputElement
  searchInputElement!: HTMLInputElement
  dropdownContentElement!: HTMLDivElement
  dropdownMenuElement!: HTMLDivElement

  isPristine = true

  @State() selectedOption: Option<any> | Option<any>[] = null
  @State() hasFocus = false

  @State() maxDropdownWidth = 100
  @State() isActive = false

  /**
   * The value of the selected dropdown item.
   */
  @Prop() value: Option<any> | Option<any>[] = null

  @Watch('value')
  valueWatcher(newValue: Option<any> | Option<any>[]) {
    if (newValue) {
      this.selectedOption = this.value
      this.updateLabel()
      this.updateActivatedOptions()
    }
  }

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder = ''

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() readonly = false

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() disabled = false

  /**
   * If `true` the dropdown can be used on blue background.
   */
  @Prop() inverted = false

  @Watch('disabled')
  disabledWatcher(newValue: boolean) {
    if (newValue === true) {
      this.isActive = false
      this.fireBlurIfPossible()
    }
  }

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
  @Prop() triggerIcon = 'caret-down'

  /**
   * If `true` the dropdown shows the empty message
   */
  @Prop() empty = false

  /**
   * If `true` the dropdown allows multiple selection
   */
  @Prop() multiSelect = false

  /**
   * If `true`, the use can search for the option.
   */
  @Prop() typeahead = false

  /**
   * Emitted when containing input field raises an input event.
   */
  @Event() balInput!: EventEmitter<string>

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<Option<any>>

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

  @Listen('keyup', { target: 'document' })
  async tabOutside(event: KeyboardEvent) {
    if (
      event.key === 'Tab' &&
      !this.element.contains(document.activeElement) &&
      this.isActive
    ) {
      await this.toggle()
    }
  }

  @Listen('click', { target: 'document' })
  async clickOnOutside(event: UIEvent) {
    if (!this.element.contains(event.target as any) && this.isActive) {
      await this.toggle()
    }
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
  }

  /**
   * Selects an option.
   */
  @Method()
  async select(option: Option<any>): Promise<void> {
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
      await this.close()
    }
    this.updateActivatedOptions()
  }

  /**
   * Returns the value of the dropdown.
   */
  @Method()
  async getSelected(): Promise<Option<any> | Option<any>[]> {
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
        'bal-dropdown-option',
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

  async onInputClick() {
    if (!this.typeahead || (this.typeahead && this.multiSelect)) {
      await this.toggle()
    }

    if (this.typeahead && this.multiSelect) {
      setTimeout(() => this.searchInputElement.focus(), 100)
    }
  }

  onInputFocus() {
    this.hasFocus = true
    this.balFocus.emit()
  }

  onInputBlur() {
    this.hasFocus = false
    this.balFocus.emit()
  }


  async onInput(event: InputEvent) {
    const inputValue = (event.target as HTMLInputElement).value
    this.balInput.emit(inputValue)
  }

  async onKeyUp(event: KeyboardEvent) {
    if (
      !this.disabled &&
      ['Enter', 'ArrowUp', 'ArrowDown', 'Up', 'Down'].indexOf(event.key) < 0
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
      this.fireBlurIfPossible()
    }
  }

  @Listen('keyup')
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault()
      this.isActive = false
      this.fireBlurIfPossible()
    }
  }

  render() {
    return (
      <Host>
        <div
          class={[
            'dropdown',
            this.expanded ? 'is-fullwidth' : '',
            this.isActive ? 'is-active' : '',
            this.fixed ? 'is-fixed' : '',
            this.isUp ? 'is-up' : '',
            this.typeahead ? 'is-typeahead' : '',
            this.multiSelect ? 'is-multi-select' : '',
            this.inverted ? 'is-inverted' : '',
          ].join(' ')}
        >
          <div class="dropdown-trigger">
            <div
              class={[
                'control',
                this.triggerIcon && !this.typeahead ? 'has-icons-right' : '',
              ].join(' ')}
            >
              <input
                part="input"
                class={['input', this.isActive ? 'is-focused' : ''].join(' ')}
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
                onClick={this.onInputClick.bind(this)}
                onBlur={this.onInputBlur.bind(this)}
                onFocus={this.onInputFocus.bind(this)}
                ref={(el) => (this.inputElement = el as HTMLInputElement)}
              />
              <bal-icon
                size="medium"
                name={this.triggerIcon}
                isRight={true}
                style={{
                  display:
                    this.triggerIcon && !this.typeahead ? 'flex' : 'none',
                }}
                class={[this.inverted ? 'is-inverted' : ''].join(' ')}
              />
            </div>
          </div>
          <div
            class="dropdown-menu"
            style={{ maxWidth: this.maxDropdownWidth + 'px' }}
            role="menu"
            ref={(el) => (this.dropdownMenuElement = el as HTMLInputElement)}
          >
            <div class="dropdown-content">
              {this.multiSelect && this.typeahead ? (
                <div class="dropdown-content-search">
                  <bal-field icon-left="search">
                    <input
                      part="input"
                      class={['input'].join(' ')}
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
                ''
              )}
              <div
                part="content-options"
                class="dropdown-content-options"
                ref={(el) =>
                  (this.dropdownContentElement = el as HTMLDivElement)
                }
              >
                <div style={(this.empty) && { display: 'none' }}>
                  <slot/>
                </div>
              </div>
              <span
                class="is-empty"
                style={(!this.empty) && { display: 'none' }}
              >
                <slot name="is-empty">No item available</slot>
              </span>
            </div>
          </div>
        </div>
      </Host>
    )
  }

  private updateLabel() {
    let label = ''
    if (Array.isArray(this.value)) {
      label = this.value
        .filter((v) => v)
        .map((v) => v.label)
        .join(', ')
    } else {
      label = this.value.label
    }
    this.inputElement.value = label
  }

  private prepareValues(value: Option<any> | Option<any>[], option: Option<any>) {
    let values = Array.isArray(value) ? value : [value]
    values = values.filter((v) => v)
    if (values.map((v) => v.value).indexOf(option.value) >= 0) {
      return values.filter((v) => v.value !== option.value)
    }
    return [...values, option]
  }

  private fireBlurIfPossible() {
    if (!this.hasFocus && !this.isActive) {
      this.balBlur.emit()
    }
  }

  private adjustMaxDropdownWidth() {
    const rect = this.inputElement.getBoundingClientRect()
    this.maxDropdownWidth = window.innerWidth - rect.x - Dropdown.MIN_DISTANCE_TO_BROWSER_BORDER
  }

  private updateActivatedOptions(): void {
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

}


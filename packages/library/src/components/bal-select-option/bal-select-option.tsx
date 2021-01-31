import { Component, Element, h, Host, Method, Prop } from '@stencil/core'
import { BalOptionValue } from './bal-select-option.type'
import { NewBalOptionValue } from './bal-select-option.util'

@Component({
  tag: 'bal-select-option',
  styleUrl: 'bal-select-option.scss',
  shadow: false,
  scoped: true,
})
export class SelectOption {
  private inputId = `bal-selopt-${selectOptionIds++}`
  private parent!: HTMLBalSelectElement

  @Element() element!: HTMLElement

  /**
   * The value of the dropdown item. This value will be returned by the parent <bal-dropdown> element.
   */
  @Prop() value: string

  /**
   * Label will be shown in the input element when it got selected
   */
  @Prop() label: string

  /**
   * If `true` the option is hidden
   */
  @Prop() hidden = true

  /**
   * Baloise icon as a prefix
   */
  @Prop() icon = ''

  /**
   * If `true` the option is focused
   */
  @Prop() focused = false

  /**
   * If `true` the option is selected
   */
  @Prop() selected = false

  /**
   * If `true` the option has a checkbox
   */
  @Prop() checkbox = false

  /**
   * *Internal* - Used to return the options infromation
   */
  @Method()
  async getOption<T>(): Promise<BalOptionValue<T>> {
    return this.option
  }

  get option(): BalOptionValue<any> {
    return NewBalOptionValue(this.value, this.label)
  }

  connectedCallback() {
    this.parent = this.element.closest('bal-select')
    this.parent.sync()
  }

  disconnectedCallback() {
    this.parent.sync()
  }

  private onClick() {
    this.parent.select(this.option)
  }

  render() {
    return (
      <Host role="option" id={this.inputId} onClick={() => this.onClick()}>
        <button
          class={[
            'dropdown-item',
            this.selected ? 'is-selected' : '',
            this.hidden ? 'is-hidden' : '',
            this.focused ? 'is-focused' : '',
            this.icon ? 'has-icon' : '',
            this.checkbox ? 'has-checkbox' : '',
          ].join(' ')}
          tabIndex={-1}>
          <div class="select-option__content">
            <span class="checkbox" style={{ display: this.checkbox ? 'flex' : 'none' }}>
              <bal-checkbox checked={this.selected} tabindex={-1}></bal-checkbox>
            </span>
            <span class="label">
              <slot />
            </span>
          </div>
        </button>
      </Host>
    )
  }
}

let selectOptionIds = 0

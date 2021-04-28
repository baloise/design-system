import { Component, ComponentInterface, Element, h, Host, Method, Prop } from '@stencil/core'
import { BalOptionValue } from './bal-select-option.type'
import { NewBalOptionValue } from './bal-select-option.util'

@Component({
  tag: 'old-select-option',
  styleUrl: 'bal-select-option.scss',
  shadow: false,
  scoped: true,
})
export class OldSelectOption implements ComponentInterface {
  private inputId = `bal-selopt-${selectOptionIds++}`
  private parent!: HTMLBalSelectElement | null

  @Element() el!: HTMLElement

  /**
   * The value of the dropdown item. This value will be returned by the parent `<bal-dropdown>` element.
   */
  @Prop({ reflect: true }) value: string | undefined

  /**
   * Baloise icon as a prefix
   */
  @Prop() icon = ''

  /**
   * Label will be shown in the input element when it got selected
   */
  @Prop() label: string | undefined

  /**
   * If `true` the option is hidden
   */
  @Prop({ reflect: true }) hidden = true

  /**
   * If `true` the option is focused
   */
  @Prop({ reflect: true }) focused = false

  /**
   * If `true` the option is selected
   */
  @Prop({ reflect: true }) selected = false

  /**
   * If `true` the option has a checkbox
   */
  @Prop() checkbox = false

  /**
   * @internal
   * Used to return the options infromation
   */
  @Method()
  async getOption<T>(): Promise<BalOptionValue<T>> {
    return this.option
  }

  get option(): BalOptionValue<any> {
    return NewBalOptionValue(this.value as any, this.label || '')
  }

  connectedCallback() {
    this.parent = this.el.closest('bal-select')
    if (this.parent) {
      this.parent.sync()
    }
  }

  disconnectedCallback() {
    if (this.parent) {
      this.parent.sync()
    }
  }

  private onClick = () => {
    if (this.parent) {
      this.parent.select(this.option)
    }
  }

  private onChange = (ev: Event) => {
    ev.preventDefault()
    ev.stopPropagation()
  }

  render() {
    return (
      <Host role="option" id={this.inputId} onClick={this.onClick}>
        <button
          type="button"
          class={[
            'dropdown-item',
            this.selected ? 'is-selected' : '',
            this.hidden ? 'is-hidden' : '',
            this.focused ? 'is-focused' : '',
            this.icon ? 'has-icon' : '',
            this.checkbox ? 'has-checkbox' : '',
          ].join(' ')}
          tabIndex={-1}
        >
          <div class="select-option__content">
            <span class="checkbox" style={{ display: this.checkbox ? 'flex' : 'none' }}>
              <bal-checkbox checked={this.selected} tabindex={-1} onBalChange={this.onChange}></bal-checkbox>
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

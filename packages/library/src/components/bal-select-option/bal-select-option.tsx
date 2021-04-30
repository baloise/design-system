import { Component, ComponentInterface, Element, h, Host, Prop, State } from '@stencil/core'
import { BalOptionValue } from './bal-select-option.type'
import { NewBalOptionValue } from './bal-select-option.util'

export interface BalOptionController extends BalOptionValue {
  id: string
}

@Component({
  tag: 'bal-select-option',
  styleUrl: 'bal-select-option.scss',
  shadow: false,
  scoped: true,
})
export class SelectOption implements ComponentInterface {
  private inputId = `bal-selopt-${selectOptionIds++}`
  private parent!: HTMLBalSelectElement | null

  @Element() el!: HTMLElement

  @State() isConnected = false

  /**
   * Label will be shown in the input element when it got selected
   */
  @Prop() label: string | undefined

  /**
   * If `true` the option has a checkbox
   */
  @Prop() checkbox = false

  /**
   * The value of the select option. This value will be returned by the parent `<bal-select>` element.
   */
  @Prop() value: string | undefined

  /**
   * If `true` the option is hidden
   */
  @Prop({ reflect: true }) hidden = false

  /**
   * If `true` the option is focused
   */
  @Prop({ reflect: true }) focused = false

  /**
   * If `true` the option is selected
   */
  @Prop({ reflect: true }) selected = false

  get option(): BalOptionValue {
    return NewBalOptionValue(this.value as any, this.label || '')
  }

  get optionController(): BalOptionController {
    return {
      ...this.option,
      id: this.inputId,
    }
  }

  async componentDidLoad() {
    this.parent = this.el.closest('bal-select')
    if (this.parent) {
      await this.parent.optionConnected(this.optionController)
      this.isConnected = true
    }
  }

  async componentWillUpdate() {
    if (this.parent) {
      await this.parent.optionWillUpdate(this.optionController)
    }
  }

  async disconnectedCallback() {
    if (this.parent) {
      await this.parent.optionDisconnected(this.optionController)
    }
  }

  private onClick = () => {
    if (this.parent) {
      this.parent.optionSelected(this.optionController)
    }
  }

  private onChange = (ev: Event) => {
    ev.preventDefault()
    ev.stopPropagation()
  }

  render() {
    return (
      <Host
        role="option"
        id={this.inputId}
        onClick={this.onClick}
        class={{
          'is-connected': this.isConnected,
        }}
      >
        <button
          type="button"
          class={['dropdown-item', this.selected ? 'is-selected' : '', this.hidden ? 'is-hidden' : '', this.focused ? 'is-focused' : '', this.checkbox ? 'has-checkbox' : ''].join(
            ' ',
          )}
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

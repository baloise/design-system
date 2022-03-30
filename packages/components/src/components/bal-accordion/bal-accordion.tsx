import { Component, Host, h, Prop, Method, Event, EventEmitter, Watch } from '@stencil/core'
import { debounceEvent } from '../../helpers/helpers'
import { Props } from '../../types'

@Component({
  tag: 'bal-accordion',
})
export class Accordion {
  private didInit = false

  /**
   * Controls the style of the accordion
   */
  @Prop() interface: '' | 'light' = ''

  /*
   * Defines the color of the accordion.
   */
  @Prop() color: Props.BalAccordionColor = 'primary'

  /**
   * If `true` the accordion is open.
   */
  @Prop({ mutable: true, reflect: true }) value = false
  @Watch('value')
  protected async valueChanged(newValue: boolean, oldValue: boolean) {
    if (this.didInit && newValue !== oldValue) {
      this.balChange.emit(newValue)
    }
  }

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0
  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * Label of the open trigger button
   */
  @Prop() openLabel = ''

  /**
   * BalIcon of the open trigger button
   */
  @Prop() openIcon = 'plus'

  /**
   * Label of the close trigger button
   */
  @Prop() closeLabel = ''

  /**
   * BalIcon of the close trigger button
   */
  @Prop() closeIcon = 'close'

  /**
   * If `true` the accordion is used on the bottom of a card
   */
  @Prop() card = false

  /**
   * Emitted when the accordion has opened or closed
   */
  @Event() balChange!: EventEmitter<boolean>

  connectedCallback() {
    this.debounceChanged()
  }

  componentDidLoad() {
    this.didInit = true
    if (this.value !== undefined) {
      this.valueChanged(this.value, false)
    }
  }

  /**
   * Opens the accordion
   */
  @Method()
  async present() {
    this.value = true
  }

  /**
   * Closes the accordion
   */
  @Method()
  async dismiss() {
    this.value = false
  }

  /**
   * Triggers the accordion
   */
  @Method()
  async toggle() {
    this.value = !this.value
  }

  get buttonType(): Props.BalButtonColor {
    return `${this.color}-light` as Props.BalButtonColor
  }

  get label() {
    return this.value ? this.closeLabel : this.openLabel
  }

  get icon() {
    return this.value ? this.closeIcon : this.openIcon
  }

  render() {
    const label = this.value ? this.closeLabel : this.openLabel
    const icon = this.value ? this.closeIcon : this.openIcon

    return (
      <Host
        class={{
          [`bal-accordion-${this.interface}`]: this.interface !== '',
          'accordion': true,
          'mt-5': this.card,
        }}
        aria-presented={this.value ? 'true' : null}
      >
        <div
          class={{
            'is-flex': true,
            'is-flex-direction-column': this.interface === 'light',
            'is-flex-direction-column-reverse': this.interface !== 'light',
          }}
        >
          <div
            class={{
              'accordion-trigger': true,
              'px-5': this.interface !== 'light' && this.card,
              'pb-5': this.card,
            }}
          >
            <bal-button
              class={{
                'data-test-accordion-trigger': true,
              }}
              expanded={true}
              color={'info'}
              icon={this.interface !== 'light' ? icon : undefined}
              iconRight={this.interface === 'light' ? icon : undefined}
              onClick={() => this.toggle()}
            >
              {label}
            </bal-button>
          </div>
          <div
            class={{
              'accordion-content': true,
            }}
            style={{
              display: this.value ? 'block' : 'none',
            }}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }
}

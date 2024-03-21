import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  Listen,
  Event,
  EventEmitter,
  Method,
  State,
} from '@stencil/core'
import { BEM } from '../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { ariaBooleanToString } from '../../utils/aria'
import { BalElementStateInfo, BalElementStateObserver, ListenToElementStates } from '../../utils/element-states'
import { stopEventBubbling } from '../../utils/form-input'
import { BalElementStateListener } from '../../utils/element-states/element-states.listener'
import { BalOption } from '../../utils/dropdown'

@Component({
  tag: 'bal-option',
  styleUrl: 'bal-option.sass',
  shadow: false,
})
export class Option implements ComponentInterface, Loggable, BalElementStateObserver, BalOption {
  private id = `bal-option-${balOptionIds++}`

  @Element() el!: HTMLElement

  log!: LogInstance

  @Logger('bal-option')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @State() interactionState: BalElementStateInfo = BalElementStateListener.DefaultState

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Label will be shown in the input element when it got selected
   */
  @Prop() label = ''

  /**
   * The value of the select option. This value will be returned by the parent `<bal-select>` element.
   */
  @Prop() value = ''

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop() disabled = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop() multiline = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop() invalid = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop({ mutable: true }) selected = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop({ mutable: true }) focused = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop() checkbox = false

  /**
   * If `true`, the option is hidden.
   */
  @Prop() hidden = false

  /**
   * Emitted when the option gets selected or unselected
   */
  @Event() balOptionChange!: EventEmitter<BalEvents.BalOptionChangeDetail>

  /**
   * @internal
   * Emitted when a option gets focused.
   */
  @Event() balOptionFocus!: EventEmitter<BalEvents.BalOptionFocusDetail>

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('mouseenter')
  listenToMouseEnter() {
    const { label, value, selected, disabled, hidden } = this
    if (!hidden && !disabled) {
      this.balOptionFocus.emit({ label, value, selected })
    }
  }

  @ListenToElementStates()
  elementStateListener(info: BalElementStateInfo): void {
    this.interactionChildElements.forEach(element => {
      element.hovered = info.hovered
      element.pressed = info.pressed
    })
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Selects or deselects the option and informs other components
   */
  @Method() async select(selected = true): Promise<void> {
    this.selected = selected
    const { label, value } = this
    this.balOptionChange.emit({ label, value, selected })
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private get interactionChildElements(): Array<HTMLBalCheckboxElement> {
    return Array.from(this.el.querySelectorAll('bal-checkbox'))
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onClick = (ev: MouseEvent) => {
    if (this.disabled) {
      stopEventBubbling(ev)
    } else {
      this.select(!this.selected)
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('option')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('checkbox').class(this.checkbox),
          ...block.modifier('focused').class(this.focused),
          ...block.modifier('invalid').class(this.invalid),
          ...block.modifier('selected').class(this.selected),
          ...block.modifier('disabled').class(this.disabled),
          ...block.modifier('hidden').class(this.hidden),
        }}
        role="option"
        id={this.id}
        data-value={this.value}
        data-label={this.label}
        aria-label={this.label}
        aria-hidden={ariaBooleanToString(this.hidden)}
        aria-selected={ariaBooleanToString(this.selected)}
        aria-checked={ariaBooleanToString(this.selected)}
        aria-disabled={ariaBooleanToString(this.disabled)}
        aria-invalid={ariaBooleanToString(this.invalid)}
        tabIndex={-1}
        onClick={this.onClick}
      >
        <bal-stack py="small">
          {this.checkbox ? (
            <bal-checkbox
              hidden
              label-hidden
              flat
              nonSubmit
              checked={this.selected}
              disabled={this.disabled}
              invalid={this.invalid}
              tabindex={-1}
            ></bal-checkbox>
          ) : (
            ''
          )}
          <div
            class={{
              ...block.element('inner').class(),
              ...block.element('inner').modifier('multiline').class(this.multiline),
            }}
          >
            <slot></slot>
          </div>
          {this.selected && !this.checkbox ? (
            <bal-icon
              name="check"
              size="small"
              color={this.disabled ? 'grey' : this.invalid ? 'danger' : 'primary'}
            ></bal-icon>
          ) : (
            ''
          )}
        </bal-stack>
      </Host>
    )
  }
}

let balOptionIds = 0

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
} from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { preventDefault } from '../../form/bal-select/utils/utils'
import { ariaBooleanToString } from '../../../utils/aria'

@Component({
  tag: 'bal-option',
  styleUrls: {
    css: 'bal-option.sass',
  },
})
export class Option implements ComponentInterface, Loggable {
  private id = `bal-option-${balOptionIds++}`

  @Element() el!: HTMLElement

  log!: LogInstance

  @Logger('bal-option')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Label will be shown in the input element when it got selected
   */
  @Prop({ reflect: true }) label = ''

  /**
   * The value of the select option. This value will be returned by the parent `<bal-select>` element.
   */
  @Prop({ reflect: true }) value = ''

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop({ reflect: true }) multiline = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop({ reflect: true }) invalid = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop({ reflect: true, mutable: true }) selected = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop({ reflect: true, mutable: true }) focused = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop({ reflect: true }) checkbox = false

  /**
   * If `true`, the option is hidden.
   */
  @Prop({ reflect: true }) hidden = false

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
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled) {
      ev.preventDefault()
      ev.stopPropagation()
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
        data-testid="bal-select-option"
        data-value={this.value}
        data-label={this.label}
        aria-label={this.label}
        aria-hidden={ariaBooleanToString(this.hidden)}
        aria-selected={ariaBooleanToString(this.selected)}
        aria-disabled={ariaBooleanToString(this.disabled)}
        tabIndex={-1}
        onClick={this.handleClick}
      >
        <bal-stack px="small" py="small">
          {this.checkbox ? (
            <bal-checkbox
              hidden
              label-hidden
              flat
              checked={this.selected}
              disabled={this.disabled}
              invalid={this.invalid}
              tabindex={-1}
              onBalChange={preventDefault}
            ></bal-checkbox>
          ) : (
            ''
          )}
          <div
            class={{
              ...block.element('inner').class(),
              ...block.element('inner').modifier('focused').class(this.focused),
              ...block.element('inner').modifier('invalid').class(this.invalid),
              ...block.element('inner').modifier('selected').class(this.selected),
              ...block.element('inner').modifier('disabled').class(this.disabled),
              ...block.element('inner').modifier('multiline').class(this.multiline),
              'is-flex-grow-1': true,
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

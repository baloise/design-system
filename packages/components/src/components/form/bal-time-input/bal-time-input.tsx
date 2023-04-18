import {
  Component,
  ComponentInterface,
  Element,
  Event,
  h,
  Host,
  Listen,
  Method,
  State,
  Prop,
  EventEmitter,
  Watch,
} from '@stencil/core'
import isNil from 'lodash.isnil'
import { Events } from '../../../types'
import {
  attachComponentToConfig,
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  defaultConfig,
  detachComponentToConfig,
} from '../../../utils/config'
import {
  FormInput,
  inputListenOnClick,
  inputHandleReset,
  inputSetFocus,
  inputSetBlur,
  getInputTarget,
  inputHandleFocus,
  inputHandleBlur,
  inputHandleChange,
  stopEventBubbling,
} from '../../../utils/form-input'
import { debounceEvent, findItemLabel } from '../../../utils/helpers'
import { inheritAttributes } from '../../../utils/attributes'
import { ACTION_KEYS, NUMBER_KEYS, isCtrlOrCommandKey } from '../../../utils/constants/keys.constant'
import { BEM } from '../../../utils/bem'
import { i18nTime } from './bal-time-input.i18n'

@Component({
  tag: 'bal-time-input',
  styleUrls: {
    css: 'bal-time-input.sass',
  },
})
export class TimeInput implements ComponentInterface, BalConfigObserver, FormInput<string | undefined> {
  private inputId = `bal-time-input-${timeInputIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  nativeInput?: HTMLInputElement
  inputValue = this.value
  initialValue = ''

  @Element() el!: HTMLElement

  @State() focused = false
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string = undefined

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<Events.BalInputTimeInputDetail>

  /**
   * Emitted when the value has changed.
   */
  @Event() balChange!: EventEmitter<Events.BalInputTimeChangeDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<KeyboardEvent>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(event: UIEvent) {
    inputListenOnClick(this, event)
  }

  private resetHandlerTimer?: NodeJS.Timer

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    const formElement = event.target as HTMLElement
    if (formElement?.contains(this.el)) {
      inputHandleReset(this, this.initialValue, this.resetHandlerTimer)
    }
  }

  connectedCallback() {
    this.debounceChanged()
    attachComponentToConfig(this)
    this.initialValue = this.value || ''
  }

  componentDidLoad() {
    this.inputValue = this.value
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  configChanged(state: BalConfigState): void {
    this.language = state.language
    this.region = state.region

    if (!this.focused && this.nativeInput) {
      this.nativeInput.value = this.getFormattedValue()
    }
  }

  /**
   * Sets focus on the native `input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    inputSetFocus(this)
  }

  /**
   * Sets blur on the native `input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    inputSetBlur(this)
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  async getInputElement() {
    return this.nativeInput!
  }

  private getAllowedKeys() {
    return [...NUMBER_KEYS, ...ACTION_KEYS, ':']
  }

  private getRawValue(): string {
    const value = (this.value || '').toString()
    return value
  }

  private getFormattedValue(): string {
    return this.getRawValue()
  }

  private onInput = (ev: InputEvent) => {
    const input = getInputTarget(ev)

    if (input) {
      this.inputValue = input.value
    }

    this.balInput.emit(this.inputValue)
  }

  private onFocus = (event: FocusEvent) => {
    inputHandleFocus(this, event)
  }

  private onBlur = (ev: FocusEvent) => {
    inputHandleBlur(this, ev)

    const input = ev.target as HTMLInputElement | null
    if (input) {
      input.value = this.getFormattedValue()
      inputHandleChange(this)
    }
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (!isNil(event) && !isCtrlOrCommandKey(event)) {
      if (!this.getAllowedKeys().includes(event.key)) {
        return stopEventBubbling(event)
      }
    }
  }

  render() {
    const value = this.focused ? this.getRawValue() : this.getFormattedValue()
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    const block = BEM.block('time-input')
    const native = block.element('native')

    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          ...block.class(),
        }}
      >
        <bal-input-group disabled={this.disabled || this.readonly} invalid={this.invalid}>
          <input
            type="time"
            class={{
              'input': true,
              'is-disabled': this.disabled || this.readonly,
              'is-danger': this.invalid,
              'has-focus': this.focused,
              'show-placeholder': !this.focused && (this.value === '' || this.value === undefined),
              'has-value': this.value !== '' && this.value !== undefined,
              ...native.class(),
            }}
            ref={input => (this.nativeInput = input)}
            id={this.inputId}
            aria-labelledby={label ? labelId : null}
            name={this.name}
            disabled={this.disabled}
            readonly={this.readonly}
            required={this.required}
            placeholder={`${i18nTime[this.language].hours}:${i18nTime[this.language].minutes}`}
            value={value}
            onInput={ev => this.onInput(ev as InputEvent)}
            onFocus={e => this.onFocus(e)}
            onBlur={e => this.onBlur(e)}
            onKeyDown={e => this.onKeydown(e)}
            onKeyPress={e => this.balKeyPress.emit(e)}
            {...this.inheritedAttributes}
          />
          <bal-icon
            is-right
            color={this.disabled || this.readonly ? 'grey' : this.invalid ? 'danger' : 'primary'}
            name="clock"
          />
        </bal-input-group>
      </Host>
    )
  }
}

let timeInputIds = 0

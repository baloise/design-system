import {
  Component,
  h,
  Host,
  Prop,
  Element,
  EventEmitter,
  Event,
  Method,
  ComponentInterface,
  State,
  Listen,
} from '@stencil/core'
import { isDescendant } from '../../../utils/helpers'
import { BEM } from '../../../utils/bem'
import { FOCUS_KEYS } from '../../../utils/focus-visible'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { BalRadioOption } from './bal-radio.type'
import { inheritAttributes } from '../../../utils/attributes'
import { stopEventBubbling } from '../../../utils/form-input'
import { isSpaceKey } from '@baloise/web-app-utils'
import { BalElementStateInfo } from '../../../utils/element-states'

@Component({
  tag: 'bal-radio',
  styleUrls: {
    css: '../bal-checkbox/radio-checkbox.sass',
  },
})
export class Radio implements ComponentInterface, BalElementStateInfo, Loggable {
  private inputId = `bal-rb-${radioIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private keyboardMode = true
  nativeInput!: HTMLInputElement

  @Element() el!: HTMLBalRadioElement

  log!: LogInstance

  @Logger('bal-radio')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @State() checked = false
  @State() focused = false
  @State() buttonTabindex?: number

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * the value of the radio.
   */
  @Prop() value?: any | null

  /**
   * Label of the radio item.
   */
  @Prop() label = ''

  /**
   * If `true` the radio is invisible, but sill active
   */
  @Prop() invisible = false

  /**
   * If `true` the radio has no label
   */
  @Prop() labelHidden = false

  /**
   * If `true` the control is no padding
   */
  @Prop() flat = false

  /**
   * Defines the layout of the radio button
   */
  @Prop() interface: BalProps.BalRadioInterface = 'radio'

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true`, the value will not be send with a form submit
   */
  @Prop() hidden = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * @internal
   */
  @Prop() hovered = false

  /**
   * @internal
   */
  @Prop() pressed = false

  /**
   * Emitted when the toggle has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalRadioFocusDetail>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalRadioBlurDetail>

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalRadioChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    if (this.value === undefined) {
      this.value = this.inputId
    }

    const radioButton = this.radioButton
    const radioGroup = this.radioGroup

    if (radioButton || radioGroup) {
      this.updateState()
    }

    if (radioGroup) {
      radioGroup.addEventListener('balInput', this.updateState)
    }

    this.el.addEventListener('keydown', this.onKeydown)
    this.el.addEventListener('touchstart', this.onPointerDown)
    this.el.addEventListener('mousedown', this.onPointerDown)
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  disconnectedCallback() {
    const radioGroup = this.radioGroup
    if (radioGroup) {
      radioGroup.removeEventListener('balInput', this.updateState)
    }

    this.el.removeEventListener('keydown', this.onKeydown)
    this.el.removeEventListener('touchstart', this.onPointerDown)
    this.el.removeEventListener('mousedown', this.onPointerDown)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (
      (this.disabled || this.readonly) &&
      ev.target &&
      (ev.target === this.el || isDescendant(this.el, ev.target as HTMLElement))
    ) {
      stopEventBubbling(ev)
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /** @internal */
  @Method()
  async setFocus(ev: any) {
    ev.stopPropagation()
    ev.preventDefault()

    this.nativeInput.focus()
    this.focused = true
  }

  /** @internal */
  @Method()
  async setButtonTabindex(value: number) {
    if (this.radioButton) {
      this.buttonTabindex = -1
    } else {
      this.buttonTabindex = value
    }
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  async getInputElement(): Promise<HTMLInputElement | undefined> {
    return Promise.resolve(this.nativeInput)
  }

  /**
   * Options of the tab like label, value etc.
   */
  @Method()
  async getOption(): Promise<BalRadioOption> {
    return this.option
  }

  /**
   * @internal
   * Options of the tab like label, value etc.
   */
  @Method()
  async updateState() {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this.value
    }

    if (this.radioButton) {
      this.buttonTabindex = -1

      if (this.radioButton.setChecked) {
        this.radioButton.setChecked(this.checked)
      }
    }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get radioButton(): HTMLBalRadioButtonElement | null {
    return this.el.closest('bal-radio-button')
  }

  private get radioGroup(): HTMLBalRadioGroupElement | null {
    return this.el.closest('bal-radio-group')
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private get option() {
    return {
      name: this.name,
      value: this.value,
      label: this.label,
      labelHidden: this.labelHidden,
      flat: this.flat,
      interface: this.interface,
      disabled: this.disabled,
      readonly: this.readonly,
      required: this.required,
      hidden: this.hidden,
      invisible: this.invisible,
      invalid: this.invalid,
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onKeypress = (ev: KeyboardEvent) => {
    if (isSpaceKey(ev)) {
      const element = ev.target as HTMLAnchorElement
      if (element.href) {
        return
      }

      if (element.nodeName === 'INPUT' && !this.disabled && !this.readonly) {
        this.checked = !this.checked
        this.balChange.emit(this.checked)
        ev.preventDefault()
      } else {
        stopEventBubbling(ev)
      }
    }
  }

  private onClick = (ev: MouseEvent) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    if (element.nodeName !== 'INPUT' && !this.disabled && !this.readonly) {
      this.checked = !this.checked
      this.nativeInput?.focus()
      this.balChange.emit(this.checked)
      ev.preventDefault()
    } else {
      stopEventBubbling(ev)
    }
  }

  private onFocus = (event: FocusEvent) => {
    if (this.disabled || this.readonly) {
      this.focused = false
      return stopEventBubbling(event)
    }

    this.balFocus.emit(event)

    if (this.keyboardMode) {
      this.focused = true
    }
  }

  private onBlur = (event: FocusEvent) => {
    if (this.disabled || this.readonly) {
      return stopEventBubbling(event)
    }

    this.balBlur.emit(event)
    this.focused = false
  }

  private onPointerDown = () => (this.keyboardMode = false)

  private onKeydown = (ev: any) => (this.keyboardMode = FOCUS_KEYS.includes(ev.key))

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('radio-checkbox')
    const inputEl = block.element('input')
    const labelEl = block.element('label')
    const labelTextEl = labelEl.element('text')

    const focused = this.focused && this.buttonTabindex !== -1

    const value = typeof this.value === 'boolean' ? JSON.stringify(this.value) : this.value

    const inputAttributes = this.inheritedAttributes
    if (this.buttonTabindex !== undefined) {
      inputAttributes.tabIndex = this.buttonTabindex
    }

    const LabelTag = this.labelHidden ? 'span' : 'label'
    return (
      <Host
        role="radio"
        aria-checked={`${this.checked}`}
        aria-disabled={this.disabled ? 'true' : null}
        aria-hidden={this.disabled ? 'true' : null}
        aria-focused={focused ? 'true' : null}
        class={{
          'bal-focused': focused,
          ...block.class(),
          ...block.modifier('radio').class(),
          ...block.modifier('select-button').class(this.interface === 'select-button'),
          ...block.modifier('invalid').class(this.invalid),
          ...block.modifier('checked').class(this.checked),
          ...block.modifier('flat').class(this.flat),
          ...block.modifier('disabled').class(this.disabled || this.readonly),
          ...block.modifier('hovered').class(this.hovered),
          ...block.modifier('pressed').class(this.pressed),
          ...block.modifier('invisible').class(this.invisible),
        }}
        onKeypress={this.onKeypress}
        onClick={this.onClick}
      >
        <input
          class={{
            ...inputEl.class(),
            ...inputEl.modifier('select-button').class(this.interface === 'select-button'),
          }}
          data-testid="bal-radio-input"
          type="radio"
          id={this.inputId}
          name={this.name}
          value={value}
          checked={this.checked}
          aria-checked={`${this.checked}`}
          disabled={this.disabled}
          readonly={this.readonly}
          required={this.required}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          ref={inputEl => (this.nativeInput = inputEl as HTMLInputElement)}
          aria-labelledby={!this.labelHidden ? this.inputId : ''}
          {...inputAttributes}
        />
        {!this.invisible ? (
          <LabelTag
            class={{
              ...labelEl.class(),
              ...labelEl.modifier('checked').class(this.checked),
              ...labelEl.modifier('radio').class(),
            }}
            data-testid="bal-radio-label"
            htmlFor={this.inputId}
            {...inputAttributes}
          >
            <span
              class={{
                ...labelTextEl.class(),
                ...labelTextEl.modifier('hidden').class(this.labelHidden),
              }}
              data-testid="bal-radio-text"
            >
              {this.label}
              <slot></slot>
            </span>
          </LabelTag>
        ) : (
          ''
        )}
      </Host>
    )
  }
}

let radioIds = 0

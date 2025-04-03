import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core'
import { ariaBooleanToString } from '../../utils/aria'
import { inheritAttributes } from '../../utils/attributes'
import { BEM } from '../../utils/bem'
import { FOCUS_KEYS } from '../../utils/focus-visible'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { FormInput, inputSetBlur, inputSetFocus, stopEventBubbling } from '../../utils/form-input'
import { isDescendant } from '../../utils/helpers'
import { isSpaceKey } from '../../utils/keyboard'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { BalCheckboxOption } from './bal-checkbox.type'

@Component({
  tag: 'bal-checkbox',
  styleUrl: 'bal-checkbox.sass',
})
export class Checkbox implements ComponentInterface, FormInput<any>, Loggable, BalAriaFormLinking {
  private inputId = `bal-cb-${checkboxIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private keyboardMode = true
  nativeInput?: HTMLInputElement

  @Element() el!: HTMLBalCheckboxElement

  @State() hasLabel = true
  @State() focused = false
  @State() buttonTabindex?: number
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  /**
   * Track focus state
   * If `true` checkbox needs to remain focused
   */
  @State() wasFocused = false

  log!: LogInstance

  @Logger('bal-checkbox')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * Label of the radio item.
   */
  @Prop() label = ''

  /**
   * If `true` the radio is invisible, but sill active
   */
  @Prop() invisible = false

  /**
   * If `true` the checkbox has no label
   */
  @Prop() labelHidden = false

  /**
   * If `true` the control is no padding
   */
  @Prop() flat = false

  /**
   * If `true` the control is displayed as inline
   */
  @Prop() inline = false

  /**
   * Defines the layout of the checkbox button
   */
  @Prop() interface: BalProps.BalCheckboxInterface = 'checkbox'

  /**
   * A DOMString representing the value of the checkbox. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the checkbox's name.
   */
  @Prop() value: string | number = 'on'

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true }) checked = false
  private initialValue = false

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
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * If `true`, the value will not be send with a form submit
   */
  @Prop() nonSubmit = false

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
  @Event() balFocus!: EventEmitter<BalEvents.BalCheckboxFocusDetail>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalCheckboxBlurDetail>

  /**
   * Emitted when the value property has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalCheckboxChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    const groupEl = this.group
    const checkboxButton = this.checkboxButton

    if (checkboxButton || groupEl) {
      this.updateState()
    }

    if (groupEl) {
      groupEl.addEventListener('balChange', () => this.updateState())
    }

    this.initialValue = this.checked

    this.el.addEventListener('keydown', this.onKeydown)
    this.el.addEventListener('touchstart', this.onPointerDown)
    this.el.addEventListener('mousedown', this.onPointerDown)
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  disconnectedCallback() {
    if (this.group) {
      this.group.removeEventListener('balChange', () => this.updateState())
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

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.checked = this.initialValue
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets the focus on the checkbox input element.
   */
  @Method()
  async setFocus() {
    inputSetFocus<any>(this)
  }

  /**
   * Sets blur on the native `input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    inputSetBlur<any>(this)
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement | undefined> {
    return Promise.resolve(this.nativeInput)
  }

  /**
   * Options of the tab like label, value etc.
   */
  @Method()
  async getOption(): Promise<BalCheckboxOption> {
    return this.option
  }

  /** @internal */
  @Method()
  async setButtonTabindex(value: number) {
    if (this.checkboxButton) {
      this.buttonTabindex = -1
    } else {
      this.buttonTabindex = value
    }
  }

  /**
   * @internal
   * Options of the tab like label, value etc.
   */
  @Method()
  async updateState() {
    if (this.group && this.group.control && Array.isArray(this.group.value)) {
      const newChecked = this.group.value.includes(this.value)
      if (newChecked !== this.checked) {
        this.checked = newChecked
      }
    }

    if (this.checkboxButton) {
      this.buttonTabindex = -1

      if (this.checkboxButton.setChecked) {
        this.checkboxButton.setChecked(this.checked)
      }
    }
  }

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  get option() {
    return {
      name: this.name,
      value: this.value,
      checked: this.checked,
      label: this.label,
      labelHidden: this.labelHidden,
      flat: this.flat,
      interface: this.interface,
      disabled: this.disabled,
      readonly: this.readonly,
      required: this.required,
      nonSubmit: this.nonSubmit,
      invisible: this.invisible,
      invalid: this.invalid,
    }
  }

  get group(): HTMLBalCheckboxGroupElement | null {
    return this.el.closest('bal-checkbox-group')
  }

  get checkboxButton(): HTMLBalCheckboxButtonElement | null {
    return this.el.closest('bal-checkbox-button')
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private setChecked = (state: boolean) => {
    const isChecked = (this.checked = state)

    this.checked = isChecked
    this.balChange.emit(isChecked)
  }

  private onChange = (ev: Event) => {
    ev.preventDefault()
    this.setChecked(!this.checked)
    this.setFocus()
  }

  private onClick = (ev: MouseEvent) => {
    if (this.wasFocused) {
      this.focused = true
    }

    this.setChecked(!this.checked)
  }

  private onFocus = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) {
      this.focused = false
      return stopEventBubbling(ev)
    }

    this.balFocus.emit(ev)

    if (this.keyboardMode) {
      this.focused = true
      this.wasFocused = true
    }
  }

  private onBlur = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) {
      return stopEventBubbling(ev)
    }

    this.balBlur.emit(ev)
    this.focused = false
  }

  private onPointerDown = () => (this.keyboardMode = false)

  private onKeydown = (ev: any) => {
    if (!isSpaceKey(ev)) {
      this.wasFocused = false
    }
    this.keyboardMode = FOCUS_KEYS.includes(ev.key)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('radio-checkbox')
    const inputEl = block.element('input')
    const labelEl = block.element('label')
    const iconEl = block.element('icon')
    const labelTextEl = labelEl.element('text')

    const focused = this.focused && this.buttonTabindex !== -1

    const inputAttributes = this.inheritedAttributes
    if (this.buttonTabindex !== undefined) {
      inputAttributes.tabIndex = this.buttonTabindex
    }

    const id = this.ariaForm.controlId || this.inputId
    const labelId = this.ariaForm.labelId || null
    const LabelTag = this.nonSubmit ? 'span' : 'label'

    return (
      <Host
        aria-checked={`${this.checked}`}
        aria-disabled={ariaBooleanToString(this.disabled)}
        aria-invalid={this.invalid === true ? 'true' : 'false'}
        aria-hidden={ariaBooleanToString(this.disabled || this.nonSubmit)}
        aria-focused={focused ? 'true' : null}
        aria-labelledby={labelId}
        aria-describedby={this.ariaForm.messageId}
        class={{
          'bal-focused': focused,
          ...block.class(),
          ...block.modifier('checkbox').class(),
          ...block.modifier('select-button').class(this.interface === 'select-button'),
          ...block.modifier('switch').class(this.interface === 'switch'),
          ...block.modifier('focused').class(this.focused),
          ...block.modifier('invalid').class(this.invalid),
          ...block.modifier('checked').class(this.checked),
          ...block.modifier('invisible').class(this.invisible),
          ...block.modifier('flat').class(this.flat),
          ...block.modifier('disabled').class(this.disabled || this.readonly),
          ...block.modifier('hovered').class(this.hovered),
          ...block.modifier('pressed').class(this.pressed),
          ...block.modifier('inline').class(this.inline),
        }}
        onClick={this.onClick}
      >
        <LabelTag class={{ ...labelEl.class() }}>
          {this.nonSubmit ? (
            ''
          ) : (
            <input
              id={id}
              type="checkbox"
              data-testid="bal-checkbox-input"
              name={this.name}
              value={this.value}
              checked={this.checked}
              required={this.required}
              disabled={this.disabled || this.nonSubmit}
              readonly={this.readonly}
              class={{
                ...inputEl.class(),
                ...inputEl.modifier('select-button').class(this.interface === 'select-button'),
              }}
              aria-hidden={ariaBooleanToString(this.nonSubmit)}
              onChange={ev => this.onChange(ev)}
              onFocus={ev => this.onFocus(ev)}
              onBlur={ev => this.onBlur(ev)}
              ref={inputEl => (this.nativeInput = inputEl)}
              {...inputAttributes}
            />
          )}
          <div class={{ ...iconEl.class() }}></div>
          <div class={{ ...labelEl.class() }}>
            <slot></slot>
          </div>
        </LabelTag>
        {/* <input
          class={{
            ...inputEl.class(),
            ...inputEl.modifier('select-button').class(this.interface === 'select-button'),
          }}
          checked={this.checked}
          disabled={this.disabled || this.nonSubmit}
          readonly={this.readonly}
          required={this.required}
          onChange={_ => this.toggleChecked()}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          ref={inputEl => (this.nativeInput = inputEl)}
          {...inputAttributes}
        />
        {!this.invisible ? (
          <LabelTag
            class={{
              ...labelEl.class(),
              ...labelEl.modifier('checkbox').class(),
              ...labelEl.modifier('checked').class(this.checked),
              ...labelEl.modifier('hidden').class(this.labelHidden),
              ...labelEl.modifier('flat').class(this.flat),
              ...labelEl.modifier('switch').class(this.interface === 'switch'),
            }}
            {...labelAttributes}
            data-testid="bal-checkbox-label"
          >
            {this.interface === 'switch' ? (
              <bal-icon
                class={{ ...iconEl.class() }}
                name="check"
                color="white"
                size="x-small"
                aria-hidden="true"
              ></bal-icon>
            ) : (
              ''
            )}
            <span
              class={{
                ...labelTextEl.class(),
                ...labelTextEl.modifier('hidden').class(this.labelHidden),
                ...labelTextEl.modifier('flat').class(this.flat),
              }}
              data-testid="bal-checkbox-text"
            >
              {this.label}
              <slot></slot>
            </span>
          </LabelTag>
        ) : (
          ''
        )} */}
      </Host>
    )
  }
}

let checkboxIds = 0

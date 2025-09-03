import { isSpaceKey } from '@baloise/web-app-utils'
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
  Watch,
} from '@stencil/core'
import { ariaBooleanToString } from '../../utils/aria'
import { inheritAttributes } from '../../utils/attributes'
import { BEM } from '../../utils/bem'
import { BalElementStateInfo, ListenToElementStates } from '../../utils/element-states'
import { FOCUS_KEYS } from '../../utils/focus-visible'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { inputSetBlur, inputSetFocus, stopEventBubbling } from '../../utils/form-input'
import { isDescendant } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { BalRadioOption } from './bal-radio.type'

@Component({
  tag: 'bal-radio',
  styleUrl: 'bal-radio.sass',
})
export class Radio implements ComponentInterface, BalElementStateInfo, Loggable, BalAriaFormLinking {
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

  /**
   * Track focus state
   * If `true` checkbox needs to remain focused
   */
  @State() wasFocused = false

  @State() checked = false
  @State() focused = false
  @State() buttonTabindex?: number
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  outerElementState: BalElementStateInfo = {
    hovered: false,
    pressed: false,
  }
  innerElementState: BalElementStateInfo = {
    hovered: false,
    pressed: false,
  }
  @State() mergedElementState: BalElementStateInfo = {
    hovered: false,
    pressed: false,
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
   * the value of the radio.
   */
  @Prop() value?: any | null

  /**
   * Label of the radio item.
   */
  @Prop() label = ''

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
  @Prop() nonSubmit = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * @internal
   */
  @Prop() hovered = false
  @Watch('hovered')
  hoveredChanged() {
    this.innerElementState = {
      hovered: this.hovered,
      pressed: this.pressed,
    }
    this.mergeElementState()
  }

  /**
   * @internal
   */
  @Prop() pressed = false
  @Watch('pressed')
  pressedChanged() {
    this.innerElementState = {
      hovered: this.hovered,
      pressed: this.pressed,
    }
    this.mergeElementState()
  }

  /**
   * Defines the color of the tile radio.
   */
  @Prop() color?: BalProps.BalRadioTileColor

  /**
   * @internal
   */
  @Prop() colSize: BalProps.BalRadioGroupColumns = 1

  /**
   * @internal
   */
  @Prop() colSizeTablet: BalProps.BalRadioGroupColumns = 1

  /**
   * @internal
   */
  @Prop() colSizeMobile: BalProps.BalRadioGroupColumns = 1

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
    this.hoveredChanged()

    if (this.value === undefined) {
      this.value = this.inputId
    }

    if (this.group) {
      this.updateState()
      this.group.addEventListener('balChange', this.updateState)
    }

    this.el.addEventListener('keydown', this.onKeydown)
    this.el.addEventListener('touchstart', this.onPointerDown)
    this.el.addEventListener('mousedown', this.onPointerDown)
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  componentWillRender(): Promise<void> | void {
    this.interactionChildElements.forEach(el => {
      el.disabled = this.disabled || this.readonly
      el.invalid = this.invalid
      el.checked = this.checked
    })
  }

  disconnectedCallback() {
    if (this.group) {
      this.group.removeEventListener('balChange', this.updateState)
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

  @ListenToElementStates()
  elementStateListener(info: BalElementStateInfo) {
    this.outerElementState = info
    this.mergeElementState()
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

  /** @internal */
  @Method()
  async setButtonTabindex(value: number) {
    this.buttonTabindex = value
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
    if (this.group) {
      const newChecked = this.group.value === this.value
      if (newChecked !== this.checked) {
        this.checked = newChecked
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

  private get group(): HTMLBalRadioGroupElement | null {
    return this.el.closest('bal-radio-group')
  }

  private get interactionChildElements(): Array<HTMLBalRadioIconElement> {
    return Array.from(this.el.querySelectorAll('bal-radio-icon, bal-icon')) as Array<HTMLBalRadioIconElement>
  }

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
      nonSubmit: this.nonSubmit,
      invalid: this.invalid,
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private mergeElementState() {
    this.mergedElementState = {
      hovered: this.outerElementState.hovered || this.innerElementState.hovered,
      pressed: this.outerElementState.pressed || this.innerElementState.pressed,
    }

    this.interactionChildElements.forEach(el => {
      ;(el as BalElementStateInfo).hovered = this.mergedElementState.hovered
      ;(el as BalElementStateInfo).pressed = this.mergedElementState.pressed
    })
  }

  private setChecked = (state: boolean) => {
    this.checked = state
    this.balChange.emit(this.checked)
  }

  private toggleChecked = (ev: Event) => {
    ev.preventDefault()

    this.setFocus()
    this.checked = true
    this.setChecked(this.checked)
  }

  private onClick = (ev: MouseEvent) => {
    if (this.disabled) {
      return
    }

    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    if (this.wasFocused) {
      this.focused = true
    }

    this.toggleChecked(ev)
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
    const block = BEM.block('radio')
    const inputEl = block.element('input')
    const labelEl = block.element('label')
    const labelTextEl = labelEl.element('text')
    const labelIconEl = labelEl.element('icon')

    const focused = this.focused && this.buttonTabindex !== -1

    const value = typeof this.value === 'boolean' ? JSON.stringify(this.value) : this.value

    const hasFormControl = !this.nonSubmit
    const id = this.ariaForm.controlId || this.inputId
    const labelId = this.ariaForm.labelId || null
    const LabelTag = hasFormControl ? 'label' : 'span'

    const inputAttributes = this.inheritedAttributes
    if (this.buttonTabindex !== undefined) {
      inputAttributes.tabIndex = this.buttonTabindex
    }

    if (this.labelHidden) {
      inputAttributes['aria-labelledby'] = labelId
    }

    return (
      <Host
        aria-checked={`${this.checked}`}
        aria-disabled={ariaBooleanToString(this.disabled)}
        aria-invalid={this.invalid === true ? 'true' : 'false'}
        aria-hidden={this.disabled ? 'true' : null}
        aria-focused={focused ? 'true' : null}
        aria-labelledby={labelId}
        aria-describedby={this.ariaForm.messageId}
        class={{
          'bal-focused': focused,
          ...block.class(),
          ...block.modifier('button').class(this.interface === 'button'),
          ...block.modifier('tile').class(this.interface === 'tile'),
          ...block.modifier(`tile-color-${this.color}`).class(this.interface === 'tile' && !!this.color),
          ...block.modifier('invalid').class(this.invalid),
          ...block.modifier('checked').class(this.checked),
          ...block.modifier('flat').class(this.flat),
          ...block.modifier('disabled').class(this.disabled || this.readonly),
          ...block.modifier('hovered').class(this.hovered),
          ...block.modifier('pressed').class(this.pressed),
          ...block.modifier(`column-${this.colSize}`).class(this.interface === 'tile' && this.colSize > 1),
          ...block
            .modifier(`column-tablet-${this.colSizeTablet}`)
            .class(this.interface === 'tile' && this.colSizeTablet > 1),
          ...block
            .modifier(`column-mobile-${this.colSizeMobile}`)
            .class(this.interface === 'tile' && this.colSizeMobile > 1),
        }}
        onClick={this.onClick}
      >
        <LabelTag
          class={{
            ...labelEl.class(),
          }}
          data-testid="bal-radio-label"
        >
          {hasFormControl ? (
            <input
              id={id}
              type="radio"
              data-testid="bal-radio-input"
              name={this.name}
              value={value}
              checked={this.checked}
              required={this.required}
              disabled={this.disabled || this.nonSubmit}
              readonly={this.readonly}
              class={{
                ...inputEl.class(),
              }}
              aria-hidden={ariaBooleanToString(this.nonSubmit)}
              aria-invalid={this.invalid === true ? 'true' : 'false'}
              aria-describedby={this.ariaForm.messageId}
              onChange={ev => this.toggleChecked(ev)}
              onFocus={ev => this.onFocus(ev)}
              onBlur={ev => this.onBlur(ev)}
              ref={inputEl => (this.nativeInput = inputEl)}
              {...inputAttributes}
            />
          ) : (
            ''
          )}
          {this.interface !== 'tile' ? (
            <div class={{ ...labelIconEl.class() }}>
              <bal-radio-icon
                checked={this.checked}
                disabled={this.disabled || this.readonly}
                invalid={this.invalid}
                inverted={this.interface === 'button' && this.checked}
                hovered={this.mergedElementState.hovered}
                pressed={this.mergedElementState.pressed}
              />
            </div>
          ) : (
            ''
          )}
          <div class={{ ...labelTextEl.class(), ...labelTextEl.modifier('hidden').class(this.labelHidden) }}>
            <slot />
          </div>
        </LabelTag>
        {/* <input
          class={{
            ...inputEl.class(),
            ...inputEl.modifier('button').class(this.interface === 'button'),
          }}
          data-testid="bal-radio-input"
          type="radio"
          id={id}
          aria-labelledby={labelId}
          aria-describedby={this.ariaForm.messageId}
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          aria-disabled={ariaBooleanToString(this.disabled)}
          aria-checked={`${this.checked}`}
          name={this.name}
          value={value}
          checked={this.checked}
          disabled={this.disabled || this.nonSubmit}
          readonly={this.readonly}
          required={this.required}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          ref={inputEl => (this.nativeInput = inputEl as HTMLInputElement)}
          {...inputAttributes}
        />
        <LabelTag
          class={{
            ...labelEl.class(),
            ...labelEl.modifier('checked').class(this.checked),
            ...labelEl.modifier('hidden').class(this.labelHidden),
            ...labelEl.modifier('flat').class(this.flat),
          }}
          {...labelAttributes}
          data-testid="bal-radio-label"
        >
          <span
            class={{
              ...labelTextEl.class(),
              ...labelTextEl.modifier('hidden').class(this.labelHidden),
              ...labelTextEl.modifier('flat').class(this.flat),setButtonTabindex
            }}
            data-testid="bal-radio-text"
          >
            {this.label}
            <slot />
          </span>
        </LabelTag> */}
      </Host>
    )
  }
}

let radioIds = 0

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

  log!: LogInstance

  @Logger('bal-checkbox')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @State() hasLabel = true
  @State() focused = false
  @State() buttonTabindex?: number
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  /**
   * Track focus state
   * If `true` checkbox needs to remain focused
   */
  @State() wasFocused = false

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
   * Label of the radio item.
   */
  @Prop() label = ''

  /**
   * If `true` the checkbox has no label
   */
  @Prop() labelHidden = false

  /**
   * If `true` the control is no padding
   */
  @Prop() flat = false

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
   * Defines the color of the tile checkbox.
   */
  @Prop() color?: BalProps.BalCheckboxTileColor

  /**
   * @internal
   */
  @Prop() colSize: BalProps.BalCheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop() colSizeTablet: BalProps.BalCheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop() colSizeMobile: BalProps.BalCheckboxGroupColumns = 1

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
    this.hoveredChanged()

    if (this.group) {
      this.updateState()
      this.group.addEventListener('balChange', () => this.updateState())
    }

    this.initialValue = this.checked

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

  /**
   * @internal
   */
  @Method()
  async updateState() {
    if (this.group && this.group.control && Array.isArray(this.group.value)) {
      const newChecked = this.group.value.includes(this.value)
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

  private get group(): HTMLBalCheckboxGroupElement | null {
    return this.el.closest('bal-checkbox-group')
  }

  private get interactionChildElements(): Array<HTMLBalCheckElement | HTMLBalSwitchElement> {
    return Array.from(this.el.querySelectorAll('bal-check, bal-switch, bal-icon')) as Array<
      HTMLBalCheckElement | HTMLBalSwitchElement
    >
  }

  private get option() {
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
      invalid: this.invalid,
    }
  }

  /**
   * EVENT HANDLERS
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
    this.setChecked(!this.checked)
  }

  private onClick = (ev: MouseEvent) => {
    if (this.disabled) {
      return
    }

    const element = ev.target as HTMLAnchorElement
    if (element && element.href) {
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
    const block = BEM.block('checkbox')
    const inputEl = block.element('input')
    const labelEl = block.element('label')
    const labelTextEl = labelEl.element('text')
    const labelIconEl = labelEl.element('icon')

    const focused = this.focused && this.buttonTabindex !== -1

    const inputAttributes = this.inheritedAttributes
    if (this.buttonTabindex !== undefined) {
      inputAttributes.tabIndex = this.buttonTabindex
    }

    const hasFormControl = !this.nonSubmit

    const id = this.ariaForm.controlId || this.inputId
    const labelId = this.ariaForm.labelId || null
    const LabelTag = hasFormControl ? 'label' : 'span'
    const Icon = this.interface === 'switch' ? 'bal-switch' : 'bal-check'

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
          ...block.modifier('button').class(this.interface === 'button'),
          ...block.modifier('switch').class(this.interface === 'switch'),
          ...block.modifier('tile').class(this.interface === 'tile'),
          ...block.modifier(`tile-color-${this.color}`).class(this.interface === 'tile' && !!this.color),
          ...block.modifier('focused').class(this.focused),
          ...block.modifier('invalid').class(this.invalid),
          ...block.modifier('checked').class(this.checked),
          ...block.modifier('flat').class(this.flat),
          ...block.modifier('disabled').class(this.disabled || this.readonly),
          ...block.modifier('hovered').class(this.mergedElementState.hovered),
          ...block.modifier('pressed').class(this.mergedElementState.pressed),
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
        >
          {hasFormControl ? (
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
              }}
              aria-hidden={ariaBooleanToString(this.nonSubmit)}
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
              <Icon
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
            <slot></slot>
          </div>
        </LabelTag>
      </Host>
    )
  }
}

let checkboxIds = 0

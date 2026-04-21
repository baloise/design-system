import {
  AttachInternals,
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'ds-checkbox',
  styleUrl: 'checkbox.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Checkbox implements ComponentInterface, Loggable {
  private inputId = `ds-cb-${checkboxIds++}`
  nativeInput?: HTMLInputElement

  @Element() el!: HTMLDsCheckboxElement

  log!: LogInstance
  @Logger('checkbox')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @AttachInternals() internals!: ElementInternals

  @State() focused = false

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
   * Defines the position of the label, either before or after the radio input. Default is after.
   */
  @Prop() labelPosition: DS.CheckboxLabelPosition = 'right'

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
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * Defines the color of the tile checkbox.
   */
  @Prop() color?: DS.CheckboxTileColor

  /**
   * Defines the layout of the input
   */
  @Prop() tile = false

  /**
   * @internal
   */
  @Prop() cols: DS.CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop() colsTablet: DS.CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop() colsMobile: DS.CheckboxGroupColumns = 1

  /**
   * Emitted when the toggle has focus.
   */
  @Event() dsFocus!: EventEmitter<DS.CheckboxFocusDetail>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() dsBlur!: EventEmitter<DS.CheckboxBlurDetail>

  /**
   * Emitted when the value property has changed.
   */
  @Event() dsChange!: EventEmitter<DS.CheckboxChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  // connectedCallback() {
  //   this.hoveredChanged()

  //   if (this.group) {
  //     this.updateState()
  //     this.group.addEventListener('dsChange', () => this.updateState())
  //   }

  //   this.initialValue = this.checked

  //   this.el.addEventListener('keydown', this.onKeydown)
  //   this.el.addEventListener('touchstart', this.onPointerDown)
  //   this.el.addEventListener('mousedown', this.onPointerDown)
  // }

  // componentWillLoad() {
  //   this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  // }

  // componentWillRender(): Promise<void> | void {
  //   this.interactionChildElements.forEach(el => {
  //     el.disabled = this.disabled || this.readonly
  //     el.invalid = this.invalid
  //     el.checked = this.checked
  //   })
  // }

  // disconnectedCallback() {
  //   if (this.group) {
  //     this.group.removeEventListener('dsChange', () => this.updateState())
  //   }

  //   this.el.removeEventListener('keydown', this.onKeydown)
  //   this.el.removeEventListener('touchstart', this.onPointerDown)
  //   this.el.removeEventListener('mousedown', this.onPointerDown)
  // }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  // @Listen('click', { capture: true, target: 'document' })
  // listenOnClick(ev: UIEvent) {
  //   if (
  //     (this.disabled || this.readonly) &&
  //     ev.target &&
  //     (ev.target === this.el || isDescendant(this.el, ev.target as HTMLElement))
  //   ) {
  //     stopEventBubbling(ev)
  //   }
  // }

  // @Listen('reset', { capture: true, target: 'document' })
  // resetHandler(ev: UIEvent) {
  //   const formElement = ev.target as HTMLElement
  //   if (formElement?.contains(this.el)) {
  //     this.checked = this.initialValue
  //   }
  // }

  // @ListenToElementStates()
  // elementStateListener(info: BalElementStateInfo) {
  //   this.outerElementState = info
  //   this.mergeElementState()
  // }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets the focus on the checkbox input element.
   */
  // @Method()
  // async setFocus() {
  //   inputSetFocus<any>(this)
  // }

  /**
   * Sets blur on the native `input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  // @Method()
  // async setBlur() {
  //   inputSetBlur<any>(this)
  // }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  // @Method()
  // getInputElement(): Promise<HTMLInputElement | undefined> {
  //   return Promise.resolve(this.nativeInput)
  // }

  /**
   * Options of the tab like label, value etc.
   */
  // @Method()
  // async getOption(): Promise<CheckboxOption> {
  //   return this.option
  // }

  /**
   * @internal
   */
  // @Method()
  // async updateState() {
  //   if (this.group && this.group.control && Array.isArray(this.group.value)) {
  //     const newChecked = this.group.value.includes(this.value)
  //     if (newChecked !== this.checked) {
  //       this.checked = newChecked
  //     }
  //   }
  // }

  /**
   * @internal
   */
  // @Method()
  // async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
  //   this.ariaForm = { ...ariaForm }
  // }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  // private get group(): HTMLDsCheckboxGroupElement | null {
  //   return this.el.closest('ds-checkbox-group')
  // }

  // private get interactionChildElements(): Array<HTMLDsCheckElement | HTMLDsSwitchElement> {
  //   return Array.from(this.el.querySelectorAll('ds-check, ds-switch, ds-icon')) as Array<
  //     HTMLDsCheckElement | HTMLDsSwitchElement
  //   >
  // }

  // private get option() {
  //   return {
  //     name: this.name,
  //     value: this.value,
  //     checked: this.checked,
  //     label: this.label,
  //     labelHidden: this.labelHidden,
  //     flat: this.flat,
  //     interface: this.interface,
  //     disabled: this.disabled,
  //     readonly: this.readonly,
  //     required: this.required,
  //     nonSubmit: this.nonSubmit,
  //     invalid: this.invalid,
  //   }
  // }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  // private mergeElementState() {
  //   this.mergedElementState = {
  //     hovered: this.outerElementState.hovered || this.innerElementState.hovered,
  //     pressed: this.outerElementState.pressed || this.innerElementState.pressed,
  //   }

  //   this.interactionChildElements.forEach(el => {
  //     ;(el as BalElementStateInfo).hovered = this.mergedElementState.hovered
  //     ;(el as BalElementStateInfo).pressed = this.mergedElementState.pressed
  //   })
  // }

  // private setChecked = (state: boolean) => {
  //   this.checked = state
  //   this.dsChange.emit(this.checked)
  // }

  // private toggleChecked = (ev: Event) => {
  //   ev.preventDefault()

  //   this.setFocus()
  //   this.setChecked(!this.checked)
  // }

  // private onClick = (ev: MouseEvent) => {
  //   if (this.disabled) {
  //     return
  //   }

  //   const element = ev.target as HTMLAnchorElement
  //   if (element && element.href) {
  //     return
  //   }

  //   if (this.wasFocused) {
  //     this.focused = true
  //   }

  //   this.toggleChecked(ev)
  // }

  // private onFocus = (ev: FocusEvent) => {
  //   if (this.disabled || this.readonly) {
  //     this.focused = false
  //     return stopEventBubbling(ev)
  //   }

  //   this.dsFocus.emit(ev)

  //   if (this.keyboardMode) {
  //     this.focused = true
  //     this.wasFocused = true
  //   }
  // }

  // private onBlur = (ev: FocusEvent) => {
  //   if (this.disabled || this.readonly) {
  //     return stopEventBubbling(ev)
  //   }

  //   this.dsBlur.emit(ev)
  //   this.focused = false
  // }

  // private onPointerDown = () => (this.keyboardMode = false)

  // private onKeydown = (ev: any) => {
  //   if (!isSpaceKey(ev)) {
  //     this.wasFocused = false
  //   }
  //   this.keyboardMode = FOCUS_KEYS.includes(ev.key)
  // }

  handleChange(ev: Event): void {
    this.checked = (ev.target as HTMLInputElement).checked
    this.dsChange.emit(this.checked)
    this.internals.setFormValue(this.checked ? (this.value as string) : null)
  }

  private onFocus = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) return
    this.focused = true
    this.dsFocus.emit(ev)
  }

  private onBlur = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) return
    this.focused = false
    this.dsBlur.emit(ev)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  componentWillLoad() {
    this.internals.setFormValue(this.checked ? (this.value as string) : null)
  }

  render() {
    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        aria-checked={`${this.checked}`}
        aria-invalid={this.invalid ? 'true' : null}
        class={{
          'is-disabled': this.disabled || this.readonly,
          'is-invalid': this.invalid,
          'is-checked': this.checked,
          'is-tile': this.tile,
          'has-label-left': this.labelPosition === 'left',
          'has-label-top': this.labelPosition === 'top',
          [`has-cols-${this.cols}`]: this.tile && this.cols > 1,
          [`has-cols-${this.colsTablet}-tablet`]: this.tile && this.colsTablet > 1,
          [`has-cols-${this.colsMobile}-mobile`]: this.tile && this.colsMobile > 1,
        }}
      >
        <label id="label" part="label">
          <input
            type="checkbox"
            part="input"
            id={this.inputId}
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled || this.readonly}
            required={this.required}
            aria-invalid={this.invalid ? 'true' : null}
            onChange={ev => this.handleChange(ev)}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            ref={inputEl => (this.nativeInput = inputEl)}
          />
          <div id="slot" part="slot">
            <slot></slot>
          </div>
        </label>
      </Host>
    )
  }
}

let checkboxIds = 0

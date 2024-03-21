import {
  Component,
  h,
  Host,
  Prop,
  Element,
  EventEmitter,
  Event,
  Watch,
  ComponentInterface,
  Listen,
  Method,
  State,
} from '@stencil/core'
import { stopEventBubbling } from '../../../utils/form-input'
import { hasTagName, isDescendant } from '../../../utils/helpers'
import { BEM } from '../../../utils/bem'
import { BalRadioOption } from '../bal-radio.type'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { inheritAttributes } from '../../../utils/attributes'
import { BalMutationObserver, ListenToMutation } from '../../../utils/mutation'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../../utils/form'
import { BalFocusObserver, ListenToFocus } from '../../../utils/focus'

@Component({
  tag: 'bal-radio-group',
})
export class RadioGroup
  implements ComponentInterface, Loggable, BalMutationObserver, BalAriaFormLinking, BalFocusObserver
{
  private inputId = `bal-rg-${radioGroupIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private initialValue?: any | null

  log!: LogInstance

  @Logger('bal-radio-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLBalRadioGroupElement
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Steps can be passed as a property or through HTML markup.
   */
  @Prop() options?: BalRadioOption[]

  @Watch('options')
  protected async optionChanged() {
    this.onOptionChange()
    this.mutationObserverActive = this.options === undefined
  }

  /**
   * If `true`, the radios can be deselected.
   */
  @Prop() allowEmptySelection = false

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * the value of the radio group.
   */
  @Prop({ mutable: true }) value?: any | null

  @Watch('value')
  valueChanged() {
    this.onOptionChange()
  }

  /**
   * Defines the layout of the radio button
   */
  @Prop() interface?: BalProps.BalRadioGroupInterface = undefined

  /**
   * Displays the checkboxes vertically
   */
  @Prop() vertical = false

  /**
   * If `true`, the controls will be vertically on mobile devices.
   */
  @Prop() verticalOnMobile = false

  /**
   * Uses the whole width
   */
  @Prop() expanded = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() invalid?: boolean = undefined

  @Watch('invalid')
  invalidChanged(value: boolean | undefined) {
    if (value !== undefined) {
      this.getRadios().forEach(radio => {
        radio.invalid = value
      })
      this.getRadioButtons().forEach(radio => {
        radio.invalid = value
      })
    }
  }

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled?: boolean = undefined

  @Watch('disabled')
  disabledChanged(value: boolean | undefined) {
    if (value !== undefined) {
      this.getRadios().forEach(radio => {
        radio.disabled = value
      })
      this.getRadioButtons().forEach(radio => {
        radio.disabled = value
      })
    }
  }

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly?: boolean = undefined

  @Watch('readonly')
  readonlyChanged(value: boolean | undefined) {
    if (value !== undefined) {
      this.getRadios().forEach(radio => {
        radio.readonly = value
      })
      this.getRadioButtons().forEach(radio => {
        radio.readonly = value
      })
    }
  }

  /**
   * Defines the column size like the grid.
   */
  @Prop() grid: BalProps.BalRadioGroupColumns = 1

  @Watch('grid')
  columnsChanged(value: BalProps.BalRadioGroupColumns) {
    this.getRadioButtons().forEach(radioButton => (radioButton.colSize = value))
  }

  /**
   * Defines the column size for tablet and bigger like the grid.
   */
  @Prop() columnsTablet: BalProps.BalRadioGroupColumns = 1

  @Watch('columnsTablet')
  columnsTabletChanged(value: BalProps.BalRadioGroupColumns) {
    this.getRadioButtons().forEach(radioButton => (radioButton.colSizeTablet = value))
  }

  /**
   * Defines the column size for mobile and bigger like the grid.
   */
  @Prop() columnsMobile: BalProps.BalRadioGroupColumns = 1

  @Watch('columnsMobile')
  columnsMobileChanged(value: BalProps.BalRadioGroupColumns) {
    this.getRadioButtons().forEach(radioButton => (radioButton.colSizeMobile = value))
  }

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalRadioGroupChangeDetail>

  /**
   * Emitted when the toggle has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalRadioGroupFocusDetail>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalRadioGroupBlurDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.initialValue = this.value
    this.mutationObserverActive = this.options === undefined
  }

  componentWillLoad() {
    this.setRadioInterface()
    this.disabledChanged(this.disabled)
    this.readonlyChanged(this.readonly)
    this.invalidChanged(this.invalid)
    this.columnsChanged(this.grid)
    this.columnsTabletChanged(this.columnsTablet)
    this.columnsMobileChanged(this.columnsMobile)
    this.onOptionChange()

    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  hasFocus = false

  @ListenToFocus()
  focusInListener(ev: FocusEvent): void {
    this.balFocus.emit(ev)
  }

  @ListenToFocus()
  focusOutListener(ev: FocusEvent): void {
    this.balBlur.emit(ev)
  }

  mutationObserverActive = true

  @ListenToMutation({ tags: ['bal-radio-group', 'bal-radio'], attributes: false, characterData: false })
  mutationListener(): void {
    this.setRadioInterface()
    this.disabledChanged(this.disabled)
    this.readonlyChanged(this.readonly)
    this.invalidChanged(this.invalid)
    this.columnsChanged(this.grid)
    this.columnsTabletChanged(this.columnsTablet)
    this.columnsMobileChanged(this.columnsMobile)
    this.onOptionChange()
  }

  @Listen('balChange', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (isDescendant(this.el, ev.target as HTMLElement)) {
      stopEventBubbling(ev)
    }
  }

  @Listen('balFocus', { capture: true, target: 'document' })
  radioFocusListener(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'bal-radio')) {
      stopEventBubbling(ev)
    }
  }

  @Listen('balBlur', { capture: true, target: 'document' })
  radioBlurListener(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'bal-radio')) {
      stopEventBubbling(ev)
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetListener(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = this.initialValue
    }
  }

  @Listen('keydown', { target: 'document' })
  onKeydown(ev: any) {
    if (ev.target && !this.el.contains(ev.target)) {
      return
    }

    // Get all radios inside of the radio group and then
    // filter out disabled radios since we need to skip those
    const radios = this.getRadios().filter(radio => !radio.disabled)
    const targetRadio = ev.target.closest('bal-radio')

    // Only move the radio if the current focus is in the radio group
    if (targetRadio && radios.includes(targetRadio)) {
      const index = radios.findIndex(radio => radio === targetRadio)
      const current = radios[index]

      let next

      // If hitting arrow down or arrow right, move to the next radio
      // If we're on the last radio, move to the first radio
      if (['ArrowDown', 'ArrowRight'].includes(ev.code)) {
        next = index === radios.length - 1 ? radios[0] : radios[index + 1]
      }

      // If hitting arrow up or arrow left, move to the previous radio
      // If we're on the first radio, move to the last radio
      if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
        next = index === 0 ? radios[radios.length - 1] : radios[index - 1]
      }

      if (next && radios.includes(next)) {
        next.setFocus(ev)

        this.value = next.value
        this.balChange.emit(this.value)
      }

      // Update the radio group value when a user presses the
      // space bar on top of a selected radio
      if (['Space'].includes(ev.code)) {
        this.value = this.allowEmptySelection && this.value !== undefined ? undefined : current.value

        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault()
      }
    }
  }

  private onOptionChange = async () => {
    this.setRadioTabindex(this.value)
    this.setRadioChecked()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /** @internal */
  @Method()
  async setValue(value: number | string | boolean) {
    this.value = value
  }

  /**
   * Find the options properties by its value
   */
  @Method()
  async getOptionByValue(value: string) {
    const options = this.options
    if (options) {
      return options.find(option => option.value === value)
    }
    return undefined
  }

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private setRadioTabindex = (value: any | undefined) => {
    const radios = this.getRadios()

    // Get the first radio that is not disabled and the checked one
    const first = radios.find(radio => !radio.disabled)
    const checked = radios.find(radio => radio.value === value && !radio.disabled)

    if (!first && !checked) {
      return
    }

    // If an enabled checked radio exists, set it to be the focusable radio
    // otherwise we default to focus the first radio
    const focusable = checked || first

    for (const radio of radios) {
      const tabindex = radio === focusable ? 0 : -1
      radio.setButtonTabindex(tabindex)
    }
  }

  private setRadioInterface() {
    this.getRadios().forEach((radio: HTMLBalRadioElement) => {
      if (this.interface) {
        radio.interface = this.interface
      }
    })
  }

  private setRadioChecked() {
    this.getRadios().forEach((radio: HTMLBalRadioElement) => {
      if (radio.updateState) {
        radio.updateState()
      }
    })
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private getRadios(): HTMLBalRadioElement[] {
    return Array.from(this.el.querySelectorAll('bal-radio'))
  }

  private getRadioButtons(): HTMLBalRadioButtonElement[] {
    return Array.from(this.el.querySelectorAll('bal-radio-button'))
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onClick = (ev: Event) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    ev.preventDefault()

    const selectedRadio = ev.target && (ev.target as HTMLElement).closest('bal-radio')
    if (selectedRadio && !selectedRadio.disabled && !selectedRadio.readonly) {
      const currentValue = this.value
      const newValue = selectedRadio.value
      if (newValue !== currentValue) {
        this.value = newValue
      } else if (this.allowEmptySelection) {
        this.value = undefined
      }
      this.balChange.emit(this.value)
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('radio-checkbox-group')
    const innerEl = block.element('inner')

    const rawOptions = this.options || []
    const options = rawOptions.map(option => {
      if (typeof option.html === 'function') {
        return { ...option, html: option.html() }
      }
      return option
    })

    return (
      <Host
        class={{
          ...block.class(),
        }}
        role="radiogroup"
        aria-labelledby={this.ariaForm.labelId}
        aria-describedby={this.ariaForm.messageId}
        aria-disabled={this.disabled ? 'true' : null}
        onClick={this.onClick}
        {...this.inheritedAttributes}
      >
        <div
          class={{
            ...innerEl.class(),
            ...innerEl.modifier('vertical-mobile').class(this.verticalOnMobile),
            ...innerEl.modifier('vertical').class(this.vertical),
            ...innerEl.modifier('expanded').class(this.expanded),
            ...innerEl.modifier('select-button').class(this.interface === 'select-button'),
          }}
        >
          <slot></slot>
          {options.map(option => (
            <bal-radio
              key={option.value}
              name={option.name || this.name}
              value={option.value}
              labelHidden={option.labelHidden}
              flat={option.flat}
              interface={option.interface}
              disabled={option.disabled}
              readonly={option.readonly}
              required={option.required}
              nonSubmit={!!option.nonSubmit}
              invalid={option.invalid}
              innerHTML={option.html as string}
            ></bal-radio>
          ))}
        </div>
      </Host>
    )
  }
}

let radioGroupIds = 0

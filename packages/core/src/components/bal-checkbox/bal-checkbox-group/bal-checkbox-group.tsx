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
import { ariaBooleanToString } from 'packages/core/src/utils/aria'
import { areArraysEqual } from '../../../utils/array'
import { inheritAttributes } from '../../../utils/attributes'
import { BEM } from '../../../utils/bem'
import { BalFocusObserver, ListenToFocus } from '../../../utils/focus'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../../utils/form'
import { stopEventBubbling } from '../../../utils/form-input'
import { hasTagName, isDescendant } from '../../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { BalMutationObserver, ListenToMutation } from '../../../utils/mutation'
import { BalCheckboxOption } from '../bal-checkbox.type'

@Component({
  tag: 'bal-checkbox-group',
  styleUrl: 'bal-checkbox-group.sass',
})
export class CheckboxGroup
  implements ComponentInterface, Loggable, BalMutationObserver, BalAriaFormLinking, BalFocusObserver
{
  private inputId = `bal-cg-${checkboxGroupIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  log!: LogInstance

  @Logger('bal-checkbox-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLElement
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Steps can be passed as a property or through HTML markup.
   */
  @Prop() options?: BalCheckboxOption[]

  @Watch('options')
  protected async optionChanged() {
    if (this.control) {
      this.onOptionChange()
      this.mutationObserverActive = this.options === undefined
    }
  }

  /**
   * Defines the layout of the checkbox button
   */
  @Prop() interface?: BalProps.BalCheckboxGroupInterface = undefined

  /**
   * If `true` it acts as the main form control
   */
  @Prop() control = false

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

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
    console.log('invalidChanged', value)
    if (this.control) {
      if (value !== undefined) {
        this.getCheckboxes().forEach(child => {
          child.invalid = value
        })
      }
    }
  }

  /**
   * If `true`, the user cannot interact with the checkboxes.
   */
  @Prop() disabled?: boolean = undefined

  @Watch('disabled')
  disabledChanged(value: boolean | undefined) {
    console.log('disabledChanged', value)
    if (this.control) {
      if (value !== undefined) {
        this.getCheckboxes().forEach(child => {
          child.disabled = value
        })
      }
    }
  }

  /**
   * If `true`, the user cannot interact with the checkboxes.
   */
  @Prop() readonly?: boolean = undefined

  @Watch('readonly')
  readonlyChanged(value: boolean | undefined) {
    if (this.control) {
      if (value !== undefined) {
        this.getCheckboxes().forEach(child => {
          child.readonly = value
        })
      }
    }
  }

  /**
   * The value of the control.
   */
  @Prop({ mutable: true }) value: any[] = []

  @Watch('value')
  valueChanged(_value: any[], oldValue: any[]) {
    console.log('valueChanged', _value)
    debugger
    if (this.control) {
      if (!areArraysEqual(this.value, oldValue)) {
        this.onOptionChange()
      }
    } else {
      this.onOptionChange()
    }
  }

  /**
   * Defines the column size like the grid.
   */
  @Prop() columns: BalProps.BalCheckboxGroupColumns = 1

  @Watch('columns')
  columnsChanged(value: BalProps.BalCheckboxGroupColumns) {
    this.getCheckboxes().forEach(checkbox => (checkbox.colSize = value))
  }

  /**
   * Defines the column size for tablet and bigger like the grid.
   */
  @Prop() columnsTablet: BalProps.BalCheckboxGroupColumns = 1

  @Watch('columnsTablet')
  columnsTabletChanged(value: BalProps.BalCheckboxGroupColumns) {
    this.getCheckboxes().forEach(checkbox => (checkbox.colSizeTablet = value))
  }

  /**
   * Defines the column size for mobile and bigger like the grid.
   */
  @Prop() columnsMobile: BalProps.BalCheckboxGroupColumns = 1

  @Watch('columnsMobile')
  columnsMobileChanged(value: BalProps.BalCheckboxGroupColumns) {
    this.getCheckboxes().forEach(checkbox => (checkbox.colSizeMobile = value))
  }

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalCheckboxGroupChangeDetail>

  /**
   * Emitted when the toggle has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalCheckboxGroupFocusDetail>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalCheckboxGroupBlurDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    if (this.control) {
      this.mutationObserverActive = this.options === undefined
      this.valueChanged(this.value, [])
    }
  }

  componentWillLoad() {
    if (this.control) {
      this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
      this.disabledChanged(this.disabled)
      this.invalidChanged(this.invalid)
      this.readonlyChanged(this.readonly)
    }

    this.columnsChanged(this.columns)
    this.columnsTabletChanged(this.columnsTablet)
    this.columnsMobileChanged(this.columnsMobile)
    this.onOptionChange()
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

  @ListenToMutation({ tags: ['bal-checkbox-group', 'bal-checkbox'], attributes: false, characterData: false })
  mutationListener(): void {
    if (this.control) {
      this.disabledChanged(this.disabled)
      this.readonlyChanged(this.readonly)
    }
    this.columnsChanged(this.columns)
    this.columnsTabletChanged(this.columnsTablet)
    this.columnsMobileChanged(this.columnsMobile)
    this.onOptionChange()
  }

  @Listen('balChange', { capture: true, target: 'document' })
  listenOnCheckboxChange(ev: UIEvent) {
    if (this.control) {
      if (isDescendant(this.el, ev.target as HTMLElement)) {
        stopEventBubbling(ev)
        this.updateValues()
      }
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      if (this.control) {
        this.value = []
      }
      this.onOptionChange()
    }
  }

  @Listen('balFocus', { capture: true, target: 'document' })
  checkboxFocusListener(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'bal-checkbox')) {
      stopEventBubbling(ev)
    }
  }

  @Listen('balBlur', { capture: true, target: 'document' })
  checkboxBlurListener(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'bal-checkbox')) {
      stopEventBubbling(ev)
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /** @internal */
  @Method()
  async setValue(value: any[]) {
    if (this.control) {
      this.value = value
    }
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

  private sync() {
    if (this.control) {
      const isChecked = (checkbox: HTMLBalCheckboxElement) => {
        for (let index = 0; index < this.value.length; index++) {
          const valueItem = this.value[index]
          if (valueItem !== undefined && valueItem.toString() === checkbox.value.toString()) {
            return true
          }
        }
        return false
      }

      this.getCheckboxes().forEach((checkbox: HTMLBalCheckboxElement) => {
        checkbox.checked = isChecked(checkbox)
      })
    }

    this.getCheckboxes().forEach((checkbox: HTMLBalCheckboxElement) => {
      if (this.interface) {
        checkbox.interface = this.interface
      }
    })
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private getCheckboxes(): HTMLBalCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('bal-checkbox'))
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onClick = (ev: Event) => {
    if (!this.control) {
      return
    }

    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    const selectedCheckbox = ev.target && (ev.target as HTMLElement).closest('bal-checkbox')
    if (selectedCheckbox) {
      if (selectedCheckbox.disabled || selectedCheckbox.readonly) {
        return ev.stopPropagation()
      }
    }

    this.updateValues()
  }

  private updateValues() {
    // generate new value array out of the checked checkboxes
    const newValue: any[] = []
    this.getCheckboxes().forEach(cb => {
      if (cb.checked) {
        newValue.push(cb.value)
      }
    })

    if (!areArraysEqual(this.value, newValue)) {
      this.value = [...newValue]
      this.balChange.emit(this.value)
    }
  }

  private onOptionChange = async () => {
    this.sync()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('checkbox-group')
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
        role="group"
        aria-labelledby={this.ariaForm.labelId}
        aria-describedby={this.ariaForm.messageId}
        aria-disabled={ariaBooleanToString(this.disabled)}
        aria-invalid={ariaBooleanToString(this.invalid)}
        onClick={this.onClick}
        {...this.inheritedAttributes}
      >
        <div
          class={{
            ...innerEl.class(),
            ...innerEl.modifier('vertical-mobile').class(this.verticalOnMobile),
            ...innerEl.modifier('vertical').class(this.vertical),
            ...innerEl.modifier('expanded').class(this.expanded),
            ...innerEl.modifier('button').class(this.interface === 'button'),
          }}
        >
          <slot></slot>
          {options.map(option => (
            <bal-checkbox
              key={option.value}
              name={option.name}
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
            ></bal-checkbox>
          ))}
        </div>
      </Host>
    )
  }
}

let checkboxGroupIds = 0

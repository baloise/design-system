import { areArraysEqual } from '@baloise/web-app-utils'
import {
  Component,
  h,
  Host,
  ComponentInterface,
  Prop,
  Element,
  Watch,
  Event,
  EventEmitter,
  Listen,
  Method,
} from '@stencil/core'
import { stopEventBubbling } from '../../../../utils/form-input'
import { findItemLabel, hasTagName, isDescendant } from '../../../../utils/helpers'
import { inheritAttributes } from '../../../../utils/attributes'
import { BEM } from '../../../../utils/bem'
import { BalCheckboxOption } from '../bal-checkbox.type'
import isFunction from 'lodash.isfunction'
import { Loggable, Logger, LogInstance } from '../../../../utils/log'
import { BalMutationObserver, ListenToMutation } from '../../../../utils/mutation'

@Component({
  tag: 'bal-checkbox-group',
})
export class CheckboxGroup implements ComponentInterface, Loggable, BalMutationObserver {
  private inputId = `bal-cg-${checkboxGroupIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  log!: LogInstance

  @Logger('bal-checkbox-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLElement

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
   * If `true`, the user cannot interact with the checkboxes.
   */
  @Prop() disabled?: boolean = undefined

  @Watch('disabled')
  disabledChanged(value: boolean | undefined) {
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
    this.getCheckboxButtons().forEach(checkboxButton => (checkboxButton.colSize = value))
  }

  /**
   * Defines the column size for tablet and bigger like the grid.
   */
  @Prop() columnsTablet: BalProps.BalCheckboxGroupColumns = 1

  @Watch('columnsTablet')
  columnsTabletChanged(value: BalProps.BalCheckboxGroupColumns) {
    this.getCheckboxButtons().forEach(checkboxButton => (checkboxButton.colSizeTablet = value))
  }

  /**
   * Defines the column size for mobile and bigger like the grid.
   */
  @Prop() columnsMobile: BalProps.BalCheckboxGroupColumns = 1

  @Watch('columnsMobile')
  columnsMobileChanged(value: BalProps.BalCheckboxGroupColumns) {
    this.getCheckboxButtons().forEach(checkboxButton => (checkboxButton.colSizeMobile = value))
  }

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
    }
  }

  componentWillLoad() {
    if (this.control) {
      this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
      this.disabledChanged(this.disabled)
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

  mutationObserverActive = true

  @ListenToMutation({ tags: ['bal-checkbox-group', 'bal-checkbox'] })
  mutationListener(): void {
    this.onOptionChange()
  }

  @Listen('balChange', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.control) {
      if (isDescendant(this.el, ev.target as HTMLElement)) {
        stopEventBubbling(ev)
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
      this.balFocus.emit(ev.detail)
    }
  }

  @Listen('balBlur', { capture: true, target: 'document' })
  checkboxBlurListener(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'bal-checkbox')) {
      stopEventBubbling(ev)
      this.balBlur.emit(ev.detail)
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
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private sync() {
    if (this.control) {
      const isChecked = (checkbox: HTMLBalCheckboxElement) => {
        for (let index = 0; index < this.value.length; index++) {
          const item = this.value[index]
          if (item.toString() === checkbox.value.toString()) {
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

  private getCheckboxButtons(): HTMLBalCheckboxButtonElement[] {
    return Array.from(this.el.querySelectorAll('bal-checkbox-button'))
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
    ev.preventDefault()

    const selectedCheckbox = ev.target && (ev.target as HTMLElement).closest('bal-checkbox')
    if (selectedCheckbox) {
      if (selectedCheckbox.disabled || selectedCheckbox.readonly) {
        return ev.stopPropagation()
      }
    }

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
    const label = findItemLabel(this.el)
    const block = BEM.block('radio-checkbox-group')
    const innerEl = block.element('inner')

    const rawOptions = this.options || []
    const options = rawOptions.map(option => {
      if (isFunction(option.html)) {
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
        aria-labelledby={label?.id}
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
            <bal-checkbox
              name={option.name}
              value={option.value}
              labelHidden={option.labelHidden}
              flat={option.flat}
              interface={option.interface}
              disabled={option.disabled}
              readonly={option.readonly}
              required={option.required}
              hidden={option.hidden}
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

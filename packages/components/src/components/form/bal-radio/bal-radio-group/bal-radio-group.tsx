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
} from '@stencil/core'
import { stopEventBubbling } from '../../../../utils/form-input'
import { findItemLabel, hasTagName, isDescendant } from '../../../../utils/helpers'
import { Props, Events } from '../../../../types'
import { BEM } from '../../../../utils/bem'
import { BalRadioOption } from '../bal-radio.type'
import { Loggable, Logger, LogInstance } from '../../../../utils/log'
import isFunction from 'lodash.isfunction'
import { observeMutations } from '../../../../utils/mutations'

@Component({
  tag: 'bal-radio-group',
})
export class RadioGroup implements ComponentInterface, Loggable {
  private inputId = `bal-rg-${radioGroupIds++}`
  private initialValue?: any | null

  private mutationO?: MutationObserver

  log!: LogInstance

  @Logger('bal-radio-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLBalRadioGroupElement

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
    this.balInput.emit(this.value)
  }

  /**
   * Defines the layout of the radio button
   */
  @Prop() interface?: Props.BalRadioGroupInterface = undefined

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
    }
  }

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<Events.BalRadioGroupChangeDetail>

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balInput!: EventEmitter<Events.BalRadioGroupChangeDetail>

  /**
   * Emitted when the toggle has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.initialValue = this.value
  }

  componentWillLoad() {
    this.setRadioInterface()
    this.disabledChanged(this.disabled)
    this.readonlyChanged(this.readonly)
    this.invalidChanged(this.invalid)
  }

  componentDidLoad() {
    this.onOptionChange()

    this.mutationO = observeMutations(
      {
        el: this.el,
        parentTag: 'bal-radio-group',
        childTag: 'bal-radio',
      },
      () => {
        if (this.options === undefined) {
          this.onOptionChange()
        }
      },
    )
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balFocus', { target: 'document' })
  radioFocusListener(event: CustomEvent<FocusEvent>) {
    const { target } = event
    if (target && isDescendant(this.el, target) && hasTagName(target, 'bal-radio')) {
      this.balFocus.emit(event.detail)
      stopEventBubbling(event)
    }
  }

  @Listen('balBlur', { target: 'document' })
  radioBlurListener(event: CustomEvent<FocusEvent>) {
    const { target } = event
    if (target && isDescendant(this.el, target) && hasTagName(target, 'bal-blur')) {
      this.balFocus.emit(event.detail)
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetListener(event: UIEvent) {
    const formElement = event.target as HTMLElement
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

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private getRadios(): HTMLBalRadioElement[] {
    return Array.from(this.el.querySelectorAll('bal-radio'))
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

  private onOptionChange = async () => {
    this.setRadioTabindex(this.value)
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
      if (option.html === undefined) {
        return { ...option, html: option.label }
      }
      return option
    })

    return (
      <Host
        class={{
          ...block.class(),
        }}
        role="radiogroup"
        aria-labelledby={label?.id}
        aria-disabled={this.disabled ? 'true' : null}
        onClick={this.onClick}
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
            ></bal-radio>
          ))}
        </div>
      </Host>
    )
  }
}

let radioGroupIds = 0

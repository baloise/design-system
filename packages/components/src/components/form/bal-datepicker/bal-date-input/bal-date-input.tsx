import {
  Component,
  Host,
  h,
  ComponentInterface,
  Prop,
  EventEmitter,
  Event,
  Element,
  Method,
  State,
  Watch,
} from '@stencil/core'
import { BEM } from '../../../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../../../utils/log'
import { inheritAttributes } from '../../../../utils/attributes'
import { BalConfigObserver, BalConfigState } from '../../../../interfaces'
import { BalLanguage, BalRegion, ListenToConfig, defaultConfig } from '../../../../utils/config'
import { dateSeparator } from '@baloise/web-app-utils'
import { ACTION_KEYS, NUMBER_KEYS, isCtrlOrCommandKey } from '../../../../utils/constants/keys.constant'
import { stopEventBubbling } from '../../../../utils/form-input'
import { DateMaskKeyboardEvent } from '../utils/mask-event'
import { MaskDate } from '../utils/mask-date'

@Component({
  tag: 'bal-date-input',
  styleUrls: {
    css: 'bal-date-input.sass',
  },
})
export class Datepicker implements ComponentInterface, Loggable, BalConfigObserver {
  private static DATE_MASK = '__.__.____'

  private inputId = `bal-di-${dateInputIds++}`
  private nativeInput!: HTMLInputElement
  private inheritedAttributes: { [k: string]: any } = {}

  log!: LogInstance

  @Element() el!: HTMLElement
  @State() private region: BalRegion = defaultConfig.region
  @State() private language: BalLanguage = defaultConfig.language
  @State() private locale = `${defaultConfig.language}-${defaultConfig.region}`

  @Logger('bal-date-input')
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
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true` the attribute required is added to the native input.
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
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string

  /**
   * The value of the form field, which accepts ISO 8601 date strings (YYYY-MM-DD).
   */
  @Prop({ mutable: true }) value?: string

  @State() private userValue?: string = this.value || Datepicker.DATE_MASK
  private initialValue?: string = this.value

  @Watch('value')
  valueChanged(newValue: string | undefined, oldValue: string | undefined) {
    console.log('valueChanged', newValue, oldValue)
  }

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalDatepickerChangeDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalDatepickerInputDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalDatepickerBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalDatepickerFocusDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.initialValue = this.value
    this.valueChanged(this.value, undefined)
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(config: BalConfigState) {
    this.region = config.region
    this.language = config.language
    this.locale = `${this.language}-${this.region}`
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  // private blockKeyboardHits(event: KeyboardEvent) {
  //   const separator = dateSeparator(this.locale)
  //   const allowedKeys = [...NUMBER_KEYS, separator, ...ACTION_KEYS]
  //   if (!isCtrlOrCommandKey(event) && allowedKeys.indexOf(event.key) < 0) {
  //     stopEventBubbling(event)
  //   }
  // }

  // private maskInput(event: KeyboardEvent) {

  // this.dateMask.mask(event)

  // const target: HTMLInputElement = event.target as any
  // const key = event.key
  // if (target) {
  //   const position = target.selectionStart || 0

  //   /**
  //    * Delete
  //    */
  //   if (key === 'Backspace') {
  //     const positionToRemove = position - 1
  //     const charToRemove = target.value.charAt(positionToRemove)
  //     if (charToRemove === '.') {
  //       target.selectionStart = positionToRemove
  //       target.selectionEnd = positionToRemove
  //     } else {
  //       console.warn(positionToRemove)
  //       console.warn(charToRemove)
  //       console.warn(this.replaceAt(target.value, positionToRemove, '_'))
  //       target.value = this.replaceAt(target.value, positionToRemove, '_')
  //       setTimeout(() => {
  //         target.selectionStart = positionToRemove
  //         target.selectionEnd = positionToRemove
  //       })
  //     }
  //   }
  //   if (key === 'Delete' || key === 'Del') {
  //   }

  //   /**
  //    * Day
  //    */
  //   if (position === 0) {
  //     if (['0', '1', '2', '3'].includes(key)) {
  //       target.value = this.replaceAt(target.value, position, key)
  //       target.selectionStart = 1
  //       target.selectionEnd = 1
  //     } else {
  //       stopEventBubbling(event)
  //     }
  //   } else if (position === 1) {
  //     if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
  //       target.value = this.replaceAt(target.value, position, key)
  //       target.selectionStart = 3
  //       target.selectionEnd = 3
  //     } else {
  //       stopEventBubbling(event)
  //     }
  //     /**
  //      * Month
  //      */
  //   } else if (position === 3) {
  //     if (['0', '1'].includes(key)) {
  //       target.value = this.replaceAt(target.value, position, key)
  //       target.selectionStart = 4
  //       target.selectionEnd = 4
  //     } else {
  //       stopEventBubbling(event)
  //     }
  //   } else if (position === 4) {
  //     if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
  //       target.value = this.replaceAt(target.value, position, key)
  //       target.selectionStart = 6
  //       target.selectionEnd = 6
  //     } else {
  //       stopEventBubbling(event)
  //     }
  //     /**
  //      * Year
  //      */
  //   } else if (position === 6) {
  //     if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
  //       target.value = this.replaceAt(target.value, position, key)
  //       target.selectionStart = 7
  //       target.selectionEnd = 7
  //     } else {
  //       stopEventBubbling(event)
  //     }
  //   } else if (position === 7) {
  //     if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
  //       target.value = this.replaceAt(target.value, position, key)
  //       target.selectionStart = 8
  //       target.selectionEnd = 8
  //     } else {
  //       stopEventBubbling(event)
  //     }
  //   } else if (position === 8) {
  //     if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
  //       target.value = this.replaceAt(target.value, position, key)
  //       target.selectionStart = 9
  //       target.selectionEnd = 9
  //     } else {
  //       stopEventBubbling(event)
  //     }
  //   } else if (position === 9) {
  //     if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
  //       target.value = this.replaceAt(target.value, position, key)
  //       target.selectionStart = 10
  //       target.selectionEnd = 10
  //     } else {
  //       stopEventBubbling(event)
  //     }
  //   }
  //   console.log('maskInput', target.selectionStart)
  // }
  // }

  // private replaceAt(value: string, index: number, replacement: string) {
  //   return value.substring(0, index) + replacement + value.substring(index + replacement.length)
  // }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onKeyDown = (event: KeyboardEvent) => {
    const separator = dateSeparator(this.locale)
    const maskEvent = new DateMaskKeyboardEvent(event)
    const maskDate = new MaskDate(maskEvent, separator)
    if (maskDate.isKeyPressAllowed() && this.nativeInput) {
      maskDate.mask()
    }
  }

  private onKeyUp = (_event: KeyboardEvent) => {
    // console.log('onKeyUp', event)
  }

  private onInput = (_event: InputEvent) => {
    // console.log('onInput', event)
    // this.maskInput(event)
    // const target: HTMLInputElement = event.target as any
    // const value = target.value
    // const formattedValue = value
    //   .replace(/\D/g, '') // Remove non-digit characters
    //   .replace(/(\d{2})(\d)/, '$1/$2') // Add slash after second digit
    //   .replace(/(\d{2})(\d)/, '$1/$2') // Add slash after fourth digit
    //   .replace(/(\d{4})\d+?$/, '$1') // Remove extra digits after year
    // target.value = formattedValue
  }

  private onClick = (event: MouseEvent) => {
    const target: HTMLInputElement = event.target as any
    if (this.userValue === Datepicker.DATE_MASK) {
      target.selectionStart = 0
      target.selectionEnd = 0
    }
  }

  private onChange = (_event: Event) => {
    // console.log('onChange', event)
  }

  private onBlur = (_event: FocusEvent) => {
    // console.log('onBlur', event)
  }

  private onFocus = (_event: FocusEvent) => {
    // console.log('onFocus', event)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('date-input')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <bal-input-group>
          <input
            class={{
              'input': true,
              'is-clickable': !this.disabled && !this.readonly,
              'is-disabled': this.disabled || this.readonly,
              'is-danger': this.invalid,
            }}
            data-testid="bal-datepicker-input"
            ref={el => (this.nativeInput = el as HTMLInputElement)}
            id={this.inputId}
            type="text"
            maxlength="10"
            autoComplete="off"
            value={this.userValue}
            required={this.required}
            disabled={this.disabled}
            readonly={this.readonly}
            placeholder={this.placeholder}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            onInput={this.onInput}
            onClick={this.onClick}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            {...this.inheritedAttributes}
          />
        </bal-input-group>
      </Host>
    )
  }
}

let dateInputIds = 0

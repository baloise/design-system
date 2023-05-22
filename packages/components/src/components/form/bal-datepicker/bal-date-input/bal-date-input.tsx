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
import { DateMask } from '../utils/date/mask-date'

@Component({
  tag: 'bal-date-input',
  styleUrls: {
    css: 'bal-date-input.sass',
  },
})
export class Datepicker implements ComponentInterface, Loggable, BalConfigObserver {
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

  @State() private userValue?: string = this.value
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

  componentDidLoad() {
    this.dateMask.bindComponentDidLoad(this.nativeInput)
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private dateMask = new DateMask()

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(config: BalConfigState) {
    this.dateMask.bindI18nChange(`${config.language}-${config.region}`)
  }

  private onKeyDown = (event: KeyboardEvent) => {
    this.dateMask.bindKeyDown(event)
  }

  private onPaste = (event: ClipboardEvent) => {
    this.dateMask.bindPast(event)
  }

  private onKeyUp = (_event: KeyboardEvent) => {
    // console.log('onKeyUp', _event)
  }

  private onInput = (_event: InputEvent) => {
    // this.dateMask.bindInput(event)
  }

  private onClick = (event: MouseEvent) => {
    this.dateMask.bindClick(event)
    // const target: HTMLInputElement = event.target as any
  }

  private onChange = (_event: Event) => {
    // console.log('onChange', event)
  }

  private onBlur = (event: FocusEvent) => {
    this.dateMask.bindBlur(event)
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
            onPaste={this.onPaste}
            {...this.inheritedAttributes}
          />
        </bal-input-group>
      </Host>
    )
  }
}

let dateInputIds = 0

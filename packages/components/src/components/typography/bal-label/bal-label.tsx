import { Component, ComponentInterface, h, Host, Method, Prop, State, Element } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import {
  attachComponentToConfig,
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  defaultConfig,
  detachComponentToConfig,
} from '../../../utils/config'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { i18nLabel } from './bal-label.i18n'
import { MutationHandler } from '../../../utils-old/mutations'
import { BalElementStateInfo } from '../../../utils/element-states'

@Component({
  tag: 'bal-label',
  styleUrls: {
    css: './bal-label.sass',
  },
})
export class BalLabel implements ComponentInterface, BalConfigObserver, Loggable, BalElementStateInfo {
  @Element() el!: HTMLElement

  @State() inputId?: string
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region

  log!: LogInstance

  private radioMutationHandler = MutationHandler({ tags: ['bal-radio'] })

  @Logger('bal-label')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the for attribute must be a single id for a labeled
   * form-related element in the same document as the <label> element.
   * So, any given label element can be associated with only one form control.
   */
  @Prop() htmlFor?: string = undefined

  /**
   * If `true` the form control needs to be filled. If it is set to
   * `false` an optional label is added to the label..
   */
  @Prop() required = true

  /**
   * When true, the text will be truncated with a text overflow ellipsis instead of wrapping.
   * Please note that text overflow can only occur in block or inline-block level elements,
   * as these elements require a width to overflow.
   */
  @Prop() noWrap = false

  /**
   * If `true` the component gets a valid green style.
   */
  @Prop() valid?: boolean = undefined

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() invalid?: boolean = undefined

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled?: boolean = undefined

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly?: boolean = undefined

  /**
   * Defines the size of the font. Default is like a heading 5 and small is used
   * with the form fields.
   */
  @Prop() size: BalProps.BalLabelSize = ''

  /**
   * @internal
   * Defines the font weight of the label.
   */
  @Prop() weight: BalProps.BalLabelWeight = 'bold'

  /**
   * @internal
   */
  @Prop() hovered = false

  /**
   * @internal
   */
  @Prop() pressed = false

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    attachComponentToConfig(this)
    this.attachLabelToInput()
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
    this.radioMutationHandler.disconnect()
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  async attachLabelToInput() {
    const radio = this.getRadioElement()

    if (radio) {
      this.radioMutationHandler.connect(radio, () => this.setHtmlFor())
      this.radioMutationHandler.observe()
    }

    await this.setHtmlFor()
  }

  private getRadioElement() {
    const radioButton = this.el.closest('bal-radio-button')
    return radioButton?.querySelector('bal-radio')
  }

  private async setHtmlFor() {
    const radio = this.getRadioElement()
    const radioInput = await radio?.getInputElement()
    this.inputId = radioInput?.id
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('label')
    const suffix = this.required === false ? i18nLabel[this.language].optional || '' : ''
    const disabled = !!this.disabled || !!this.readonly
    const danger = !!this.invalid
    const success = !!this.valid
    const regular = this.weight === 'regular'
    const small = this.size === 'small'
    const large = this.size === 'large'

    return (
      <Host class={{ ...block.class() }}>
        <label
          htmlFor={this.htmlFor || this.inputId}
          class={{
            ...block.element('native').class(),
            ...block.element('native').modifier('no-wrap').class(this.noWrap),
            ...block.element('native').modifier('disabled').class(disabled),
            ...block.element('native').modifier('danger').class(danger),
            ...block.element('native').modifier('success').class(success),
            ...block.element('native').modifier('regular').class(regular),
            ...block.element('native').modifier('small').class(small),
            ...block.element('native').modifier('large').class(large),
            ...block.element('native').modifier('hovered').class(this.hovered),
            ...block.element('native').modifier('pressed').class(this.pressed),
          }}
        >
          <slot></slot>
          {suffix}
        </label>
      </Host>
    )
  }
}

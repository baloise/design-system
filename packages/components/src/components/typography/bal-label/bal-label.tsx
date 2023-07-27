import { Component, ComponentInterface, h, Host, Method, Prop, State, Element, Listen } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import {
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  defaultConfig,
  ListenToConfig,
} from '../../../utils/config'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { i18nLabel } from './bal-label.i18n'
import { BalElementStateInfo } from '../../../utils/element-states'

@Component({
  tag: 'bal-label',
  styleUrls: {
    css: './bal-label.sass',
  },
})
export class BalLabel implements ComponentInterface, Loggable, BalConfigObserver, BalElementStateInfo {
  @Element() el!: HTMLElement

  private inputId = `bal-lbl-${labelIds++}`
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region

  log!: LogInstance

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
   * When true, the text will is able to break on multiple lines.
   */
  @Prop() multiline = false

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
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balArialabelledBy', { target: 'window' })
  listenToBalArialabelledBy(event: CustomEvent) {
    this.sync(event)
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private getRadioElement() {
    const radioButton = this.el.closest('bal-radio-button')
    return radioButton?.querySelectorAll('input')
  }

  private getCheckboxElement() {
    const checkboxButton = this.el.closest('bal-checkbox-button')
    return checkboxButton?.querySelectorAll('input')
  }

  private getFieldElement() {
    const fieldControl = this.el.closest('bal-field-label')?.closest('bal-field')
    return fieldControl?.querySelector('bal-field-control')?.querySelectorAll('input')
  }

  private setHtmlFor(value: string): void {
    this.htmlFor = value
  }

  private valueExistInString(value: any, id: string): boolean {
    return value.includes(id)
  }

  private setAriaLabelledBy(controls: NodeListOf<Element> | undefined) {
    if (controls) {
      this.setHtmlFor(controls[0]?.id as any)
      controls.forEach(control => {
        const labelledby = control.getAttribute('aria-labelledby')
        const exist = this.valueExistInString(labelledby, this.inputId)
        const labels = !exist ? `${labelledby} ${this.inputId}` : `${labelledby}`
        control.setAttribute('aria-labelledby', labels)
      })
    }
  }

  sync(event: CustomEvent) {
    const tagName = event.detail.tagName.toLowerCase()

    if (tagName === 'bal-field') {
      const controls = this.getFieldElement()
      this.setAriaLabelledBy(controls)
    } else if (tagName === 'bal-checkbox-button') {
      const controls = this.getCheckboxElement()
      this.setAriaLabelledBy(controls)
    } else if (tagName === 'bal-radio-button') {
      const controls = this.getRadioElement()
      this.setAriaLabelledBy(controls)
    }
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
          id={this.inputId}
          class={{
            ...block.element('native').class(),
            ...block.element('native').modifier('multiline').class(this.multiline),
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

let labelIds = 0

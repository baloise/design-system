import { Component, h, Host, Prop, Element, State } from '@stencil/core'
import { BalConfigObserver, Props } from '../../../..'
import {
  attachComponentToConfig,
  BalConfigState,
  BalLanguage,
  BalRegion,
  defaultConfig,
  detachComponentToConfig,
} from '../../../../config'
import { i18nFieldLabel } from './bal-field-label.i18n'

@Component({
  tag: 'bal-field-label',
  shadow: false,
  scoped: true,
})
export class FieldLabel implements BalConfigObserver {
  @Element() element!: HTMLElement
  parentBalFieldElement!: HTMLBalFieldElement | null

  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() invalid = false

  /**
   * If `true` the form control needs to be filled. If it is set to
   * `false` an optional label is added to the label..
   */
  @Prop() required = true

  /**
   * If `true` the component gets a valid green style.
   */
  @Prop() valid = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() weight: Props.BalFieldLabelWeight = 'bold'

  connectedCallback() {
    attachComponentToConfig(this)
  }

  componentDidLoad() {
    if (this.element) {
      this.parentBalFieldElement = this.element.closest('bal-field')
      if (this.parentBalFieldElement) {
        this.parentBalFieldElement.classList.add('has-label')
      }
    }
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
    if (this.parentBalFieldElement) {
      this.parentBalFieldElement.classList.remove('has-label')
    }
  }

  configChanged(config: BalConfigState): void {
    this.language = config.language
    this.region = config.region
  }

  render() {
    const suffix = this.required === false ? i18nFieldLabel[this.language].optional || '' : ''
    return (
      <Host class="bal-field-label">
        <label
          class={{
            'label': true,
            'is-disabled': this.disabled || this.readonly,
            'is-success': this.valid,
            'is-danger': this.invalid,
            'is-regular': this.weight === 'regular',
          }}
        >
          <slot></slot>
          {suffix}
        </label>
      </Host>
    )
  }
}

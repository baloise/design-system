import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  ElementStateInfo,
  normalizeDeprecatedTShirtSize,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import {
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  defaultConfig,
  ListenToConfig,
  DsComponentInterface,
} from '@global'
import { I18nDsLabel } from './label.i18n'
import { LABEL_SIZES, LABEL_WEIGHTS, type LabelSize, type LabelWeight } from './label.interfaces'

/**
 * Label renders a semantic HTML label element for form inputs with optional required indicator and customizable styling.
 *
 * @slot - The label content and text.
 * @part label - The native HTML `<label>` element.
 */
@Component({
  tag: 'ds-label',
  styleUrl: './label.host.scss',
  shadow: true,
})
export class Label implements DsComponentInterface, DsConfigObserver, ElementStateInfo {
  log!: LogInstance

  @Logger('label')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * The value of the for attribute must be a single id for a labeled
   * form-related element in the same document as the <label> element.
   * So, any given label element can be associated with only one form control.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly htmlFor: string = ''

  /**
   * Define the id of the native label element
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly htmlId: string = `ds-lbl-${labelIds++}`

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly hovered: boolean = false

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly invalid: boolean = false

  /**
   * When true, the text will be truncated with a text overflow ellipsis instead of wrapping.
   * Please note that text overflow can only occur in block or inline-block level elements,
   * as these elements require a width to overflow.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly noWrap: boolean = false

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly pressed: boolean = false

  /**
   * If `true` the form control needs to be filled. If it is set to
   * `false` an optional label is added to the label..
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly required: boolean = true

  /**
   * Defines the size of the font. Default is like a heading 5 and small is used
   * with the form fields.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...LABEL_SIZES)
  size?: LabelSize
  @Watch('size')
  sizeChanged(newValue: LabelSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

  /**
   * If `true` the component gets a valid green style.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly valid: boolean = false

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    setupValidation(this)
    this.size = normalizeDeprecatedTShirtSize(this.size) || undefined
  }

  componentWillUpdate() {
    setupValidation(this)
  }

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const suffix = this.required === false ? I18nDsLabel[this.language].optional || '' : ''
    const id = this.htmlId
    const htmlFor = this.htmlFor

    return (
      <Host
        class={{
          'is-hovered': this.hovered,
          'is-pressed': this.pressed,
        }}
      >
        <label id={id} part="label" htmlFor={htmlFor}>
          <slot></slot>
          {suffix}
        </label>
      </Host>
    )
  }
}

let labelIds = 0

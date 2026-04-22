import { Component, ComponentInterface, Element, h, Host, Method, Prop, State } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import {
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  defaultConfig,
  ListenToConfig,
} from '../../utils/config'
import { ElementStateInfo } from '../../utils/element-states'
import { AriaForm, AriaFormLinking, defaultDsAriaForm } from '../../utils/form'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { I18nDsLabel } from './label.i18n'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'ds-label',
  styleUrl: './label.host.scss',
  shadow: true,
})
export class Label implements ComponentInterface, Loggable, DsConfigObserver, ElementStateInfo, AriaFormLinking {
  @Element() el!: HTMLStencilElement

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() ariaForm: AriaForm = defaultDsAriaForm

  log!: LogInstance

  @Logger('label')
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
  @Prop() readonly htmlFor?: string = undefined

  /**
   * Define the id of the native label element
   */
  @Prop() readonly htmlId?: string = `ds-lbl-${labelIds++}`

  /**
   * If `true` the form control needs to be filled. If it is set to
   * `false` an optional label is added to the label..
   */
  @Prop({ reflect: true }) readonly required = true

  /**
   * When true, the text will be truncated with a text overflow ellipsis instead of wrapping.
   * Please note that text overflow can only occur in block or inline-block level elements,
   * as these elements require a width to overflow.
   */
  @Prop({ reflect: true }) readonly noWrap = false

  /**
   * If `true` the component gets a valid green style.
   */
  @Prop({ reflect: true }) readonly valid = false

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop({ reflect: true }) readonly invalid = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true }) readonly disabled = false

  /**
   * Defines the size of the font. Default is like a heading 5 and small is used
   * with the form fields.
   */
  @Prop({ mutable: true, reflect: true }) size?: DS.LabelSize
  @Watch('size')
  sizeChanged(newValue: DS.LabelSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

  /**
   * @internal
   */
  @Prop() readonly hovered = false

  /**
   * @internal
   */
  @Prop() readonly pressed = false

  /**
   * LISTENERS
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
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  async setAriaForm(ariaForm: AriaForm) {
    this.ariaForm = { ...ariaForm }
  }

  connectedCallback(): void {
    this.size = normalizeDeprecatedTShirtSize(this.size) || undefined
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const suffix = this.required === false ? I18nDsLabel[this.language].optional || '' : ''
    const id = this.ariaForm.labelId || this.htmlId
    const htmlFor = this.htmlFor || this.ariaForm.controlId

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

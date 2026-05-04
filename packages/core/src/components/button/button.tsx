import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core'
import { AttachInternals, HTMLStencilElement, Method, Watch } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import {
  ariaBooleanToString,
  inheritAttributes,
  normalizeDeprecatedTShirtSize,
  Logger,
  type LogInstance,
  type Attributes,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import {
  BUTTON_COLORS,
  BUTTON_ELEMENT_TYPES,
  BUTTON_SIZES,
  BUTTON_TARGETS,
  BUTTON_SPINNERS,
  type ButtonColor,
  type ButtonElementType,
  type ButtonSize,
  type ButtonTarget,
  type ButtonSpinner,
  type ButtonAria,
  type ButtonBlur,
  type ButtonFocus,
  type ButtonClick,
  type ButtonNavigate,
  type ButtonDidRender,
  ButtonBlurDetail,
  ButtonClickDetail,
  ButtonDidRenderDetail,
  ButtonFocusDetail,
  ButtonNavigateDetail,
} from './button.interfaces'

/**
 * Button provides a clickable element for triggering actions, submitting forms, or navigating — supporting text, icons, or both.
 *
 * @slot - Button label text and/or icon children. Rendered inside a `<span part="label">` wrapper.
 * @part native - The native `<button>` or `<a>` element.
 * @part spinner - The loading spinner shown when `loading` is true.
 * @part icon - The leading icon wrapper.
 * @part label - The text label wrapper (`<span>`).
 * @part icon-right - The trailing icon wrapper.
 */
@Component({
  tag: 'ds-button',
  styleUrl: 'button.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Button implements DsComponentInterface {
  log!: LogInstance

  @Logger('button')
  createLogger(log: LogInstance) {
    this.log = log
  }

  private inheritAttributes: Attributes = {}
  @AttachInternals() internals!: ElementInternals

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * The color to use from your application's color palette.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...BUTTON_COLORS)
  readonly color: ButtonColor = 'primary'

  /**
   * The type of button.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf(...BUTTON_ELEMENT_TYPES)
  readonly elementType: ButtonElementType = 'button'

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * Size of the button
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...BUTTON_SIZES)
  size: ButtonSize = undefined
  @Watch('size')
  sizeChanged(newValue: ButtonSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly href: string = ''

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...BUTTON_TARGETS)
  readonly target: ButtonTarget = '_self'

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly rel: string = ''

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly download: string = ''

  /**
   * If `true` the button has a dashed border.
   * */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly dashed: boolean = false

  /**
   * If `true` adds a box shadow to improve readability on image background
   * */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly shadow: boolean = false

  /**
   * If `true` the width of the buttons is limited
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly square: boolean = false

  /**
   * If `true` the button is circular and width of the buttons is limited
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly circle: boolean = false

  /**
   * If `true` the button has a full width
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly wide: boolean = false

  /**
   * If `true` the button has no padding and a reduced height
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly flat: boolean = false

  /**
   * If `true` the button is outlined
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly outlined: boolean = false

  /**
   * If `true` the button is inverted
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly inverted: boolean = false

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly loading: ButtonSpinner = false

  /**
   * If `true` the button is rounded.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly rounded: boolean = false

  // /**
  //  * If `true` the button is a popup.
  //  */
  // @Prop() dsPopup = undefined

  /**
   * Name of the left button icon
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly icon: string = ''

  /**
   * If `true` the icon turns
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly iconTurn: boolean = false

  /**
   * Name of the right button icon
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly iconRight: string = ''

  /**
   * The label of the button will not break
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly noWrap: boolean = false

  /**
   * The name of the button, which is submitted with the form data.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly name: string = ''

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly value: string = ''

  /**
   * A11y attributes for the native button element.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly a11yControls: string = ''

  /**
   * A11y attributes for the native button element.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly a11yTitle: string = ''

  /**
   * A11y attributes for the native button element.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly a11yLabel: string = ''

  /**
   * A11y attributes for the native button element.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrType('string')
  a11yHaspopup = ''

  /**
   * Emitted when the link element has clicked.
   */
  @Event() dsClick!: EventEmitter<ButtonClickDetail>

  /**
   * Emitted when the link element has clicked.
   */
  @Event() dsNavigate!: EventEmitter<ButtonNavigateDetail>

  /**
   * Emitted when the button has focus.
   */
  @Event() dsFocus!: EventEmitter<ButtonFocusDetail>

  /**
   * Emitted when the button loses focus.
   */
  @Event() dsBlur!: EventEmitter<ButtonBlurDetail>

  /**
   * Emitted when the button has been  rendered.
   */
  @Event() dsDidRender!: EventEmitter<ButtonDidRenderDetail>

  /**
   * PUBLIC LISTENERS
   * ─────────────────────────────────────────────────────
   */

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback(): void {
    setupValidation(this)
    this.size = normalizeDeprecatedTShirtSize(this.size)
  }

  componentWillLoad() {
    this.inheritAttributes = inheritAttributes(this.el, [
      'title',
      'aria-label',
      'aria-controls',
      'aria-hidden',
      'tabindex',
      'aria-haspopup',
    ])

    if (this.el.hasAttribute('ds-popup') && !this.a11yHaspopup) {
      this.a11yHaspopup = 'true'
    }
  }

  componentDidRender() {
    this.dsDidRender.emit()
  }

  /**
   * EVENT HANDLERS
   * ─────────────────────────────────────────────────────
   */

  private get isIconInverted() {
    return this.inverted
  }

  private get isLoading(): boolean {
    return this.loading === true || this.loading === 'logo' || this.loading === 'circle' || this.loading === ''
  }

  private get leftIconAttrs() {
    if (!this.icon || this.isLoading) {
      return {
        style: { display: 'none' },
      }
    }
    return {}
  }

  private get leftRightAttrs() {
    if (!this.iconRight || this.isLoading) {
      return {
        style: { display: 'none' },
      }
    }
    return {}
  }

  private get loadingAttrs() {
    if (!this.isLoading) {
      return {
        style: { display: 'none' },
      }
    }
    return {}
  }

  private handleHostClick = (ev: MouseEvent) => {
    if (this.disabled) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  private handleFocus = () => {
    this.dsFocus.emit()
  }

  private handleBlur = () => {
    this.dsBlur.emit()
  }

  private handleClick = (ev: MouseEvent) => {
    if (!this.disabled) {
      if (this.elementType === 'submit') {
        this.internals.form?.requestSubmit()
      }
      if (this.elementType === 'reset') {
        this.internals.form?.reset()
      }

      this.dsClick.emit(ev)

      if (this.href !== undefined) {
        this.dsNavigate.emit(ev)
      }
    }
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const { elementType, download, href, rel, target, name, value } = this
    const TagType = this.href === undefined || this.href === '' ? 'button' : 'a'
    const attrs =
      TagType === 'button'
        ? { type: elementType, name, value }
        : {
            download,
            href,
            rel,
            target,
          }

    const ariaAttributes = {
      'title': this.a11yTitle || this.inheritAttributes['title'],
      'aria-label':
        this.a11yLabel || this.inheritAttributes['aria-label'] || this.a11yTitle || this.inheritAttributes['title'],
      'aria-controls': this.a11yControls || this.inheritAttributes['aria-controls'],
      'aria-haspopup': this.a11yHaspopup || this.inheritAttributes['aria-haspopup'],
    }

    return (
      <Host
        onClick={this.handleHostClick}
        class={{
          'is-wide': this.wide,
          [`is-${this.color}`]: this.color !== undefined,
          [`is-${this.size}`]: this.size !== undefined,
          [`is-inverted`]: this.inverted,
          [`is-disabled`]: this.disabled,
          [`is-loading`]: this.isLoading,
          [`is-flat`]: this.flat,
          [`is-rounded`]: this.rounded,
          [`is-square`]: this.square,
          [`is-circle`]: this.circle,
          [`is-dashed`]: this.dashed,
          [`has-shadow`]: this.shadow,
          [`has-no-wrap`]: this.noWrap,
        }}
      >
        <TagType
          {...attrs}
          {...this.inheritAttributes}
          type={this.elementType}
          id="button"
          part="native"
          disabled={this.disabled || this.isLoading}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          aria-busy={ariaBooleanToString(!!this.loading)}
          aria-disabled={ariaBooleanToString(this.disabled || this.isLoading)}
          {...ariaAttributes}
        >
          {this.isLoading ? (
            <ds-spinner
              {...this.loadingAttrs}
              part="spinner"
              variation={this.loading === 'circle' ? 'circle' : 'logo'}
              size="sm"
              deactivated={!this.isLoading}
            />
          ) : (
            ''
          )}
          {this.icon ? (
            <ds-icon
              {...this.leftIconAttrs}
              part="icon"
              class={this.square ? '' : 'icon-left'}
              name={this.icon}
              size={this.dashed ? 'md' : this.square ? this.size : 'sm'}
              shape={this.dashed ? 'circle' : undefined}
              turn={this.iconTurn}
              inverted={this.isIconInverted}
            />
          ) : (
            ''
          )}
          <span part="label">
            <slot />
          </span>
          {this.iconRight ? (
            <ds-icon
              {...this.leftRightAttrs}
              part="icon-right"
              class="icon-right"
              name={this.iconRight}
              size={'small'}
              turn={this.iconTurn}
              inverted={this.isIconInverted}
            />
          ) : (
            ''
          )}
        </TagType>
      </Host>
    )
  }
}

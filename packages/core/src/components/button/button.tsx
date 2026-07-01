import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import {
  ariaBooleanToString,
  inheritAttributes,
  normalizeDeprecatedTShirtSize,
  Logger,
  type LogInstance,
  type Attributes,
  hasValue,
  OneOf,
  Required,
  Type,
} from '@utils'
import {
  BUTTON_COLORS,
  BUTTON_ELEMENT_TYPES,
  BUTTON_SIZES,
  BUTTON_TARGETS,
  type ButtonColor,
  type ButtonElementType,
  type ButtonSize,
  type ButtonTarget,
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
  @OneOf(BUTTON_COLORS)
  readonly color: ButtonColor = 'primary'

  /**
   * The type of button.
   */
  @Prop({ reflect: true })
  @Required()
  @OneOf(BUTTON_ELEMENT_TYPES)
  readonly elementType: ButtonElementType = 'button'

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * Size of the button
   */
  @Prop()
  @OneOf(BUTTON_SIZES)
  readonly size: ButtonSize = undefined

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop()
  @Type('string')
  readonly href: string = ''

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop()
  @Required()
  @OneOf(BUTTON_TARGETS)
  readonly target: ButtonTarget = '_self'

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop()
  @Type('string')
  readonly rel: string = ''

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop()
  @Type('string')
  readonly download: string = ''

  /**
   * If `true` the button has a dashed border.
   * */
  @Prop()
  @Type('boolean')
  readonly dashed: boolean = false

  /**
   * If `true` adds a box shadow to improve readability on image background
   * */
  @Prop()
  @Type('boolean')
  readonly shadow: boolean = false

  /**
   * If `true` the width of the buttons is limited
   */
  @Prop()
  @Type('boolean')
  readonly square: boolean = false

  /**
   * If `true` the button is circular and width of the buttons is limited
   */
  @Prop()
  @Type('boolean')
  readonly circle: boolean = false

  /**
   * If `true` the button has a full width
   */
  @Prop()
  @Type('boolean')
  readonly wide: boolean = false

  /**
   * If `true` the button has no padding and a reduced height
   */
  @Prop()
  @Type('boolean')
  readonly flat: boolean = false

  /**
   * If `true` the button is outlined
   */
  @Prop()
  @Type('boolean')
  readonly outlined: boolean = false

  /**
   * If `true` the button is inverted
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly inverted: boolean = false

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly loading: boolean = false

  /**
   * If `true` the button is rounded.
   */
  @Prop()
  @Type('boolean')
  readonly rounded: boolean = false

  // /**
  //  * If `true` the button is a popup.
  //  */
  // @Prop() dsPopup = undefined

  /**
   * Name of the left button icon
   */
  @Prop()
  @Type('string')
  readonly icon: string = ''

  /**
   * If `true` the icon turns
   */
  @Prop()
  @Type('boolean')
  readonly iconTurn: boolean = false

  /**
   * Name of the right button icon
   */
  @Prop()
  @Type('string')
  readonly iconRight: string = ''

  /**
   * The label of the button will not break
   */
  @Prop()
  @Type('boolean')
  readonly noWrap: boolean = false

  /**
   * The name of the button, which is submitted with the form data.
   */
  @Prop()
  @Type('string')
  readonly name: string = ''

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop()
  @Type('string')
  readonly value: string = ''

  /**
   * A11y attributes for the native button element.
   */
  @Prop()
  @Type('string')
  readonly a11yControls: string = ''

  /**
   * A11y attributes for the native button element.
   */
  @Prop()
  @Type('string')
  readonly a11yTitle: string = ''

  /**
   * A11y attributes for the native button element.
   */
  @Prop()
  @Type('string')
  readonly a11yLabel: string = ''

  /**
   * A11y attributes for the native button element.
   */
  @Prop({ mutable: true })
  @Type('string')
  a11yHaspopup: string = ''

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

  private get leftIconAttrs() {
    if (!hasValue(this.icon) || this.loading) {
      return {
        style: { display: 'none' },
      }
    }
    return {}
  }

  private get leftRightAttrs() {
    if (!hasValue(this.iconRight) || this.loading) {
      return {
        style: { display: 'none' },
      }
    }
    return {}
  }

  private get loadingAttrs() {
    if (!this.loading) {
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

      if (hasValue(this.href)) {
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
    const size = normalizeDeprecatedTShirtSize(this.size) || ''
    const TagType = !hasValue(this.href) ? 'button' : 'a'
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
          [`is-${this.color || 'primary'}`]: true,
          [`is-${size}`]: hasValue(size),
          [`is-inverted`]: this.inverted,
          [`is-disabled`]: this.disabled,
          [`is-loading`]: this.loading,
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
          disabled={this.disabled || this.loading}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          aria-busy={ariaBooleanToString(!!this.loading)}
          aria-disabled={ariaBooleanToString(this.disabled || this.loading)}
          {...ariaAttributes}
        >
          {this.loading ? (
            <ds-spinner {...this.loadingAttrs} part="spinner" size="sm" deactivated={!this.loading} />
          ) : (
            ''
          )}
          {hasValue(this.icon) ? (
            <ds-icon
              {...this.leftIconAttrs}
              part="icon"
              class={this.square ? '' : 'icon-left'}
              name={this.icon}
              size={this.dashed ? 'md' : size}
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
          {hasValue(this.iconRight) ? (
            <ds-icon
              {...this.leftRightAttrs}
              part="icon-right"
              class="icon-right"
              name={this.iconRight}
              size={'sm'}
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

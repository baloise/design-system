import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core'
import { AttachInternals, HTMLStencilElement, Watch } from '@stencil/core/internal'
import { ariaBooleanToString } from '../../utils/aria'
import { Attributes, inheritAttributes } from '../../utils/attributes'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'ds-button',
  styleUrl: 'button.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Button implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('button')
  createLogger(log: LogInstance) {
    this.log = log
  }

  private inheritAttributes: Attributes = {}
  @AttachInternals() internals!: ElementInternals

  @Element() el!: HTMLStencilElement

  /**
   * The color to use from your application's color palette.aaa
   */
  @Prop() readonly color: DS.ButtonColor = 'primary'

  /**
   * The type of button.
   */
  @Prop({ reflect: true }) readonly elementType: DS.ButtonElementType = 'button'

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Size of the button
   */
  @Prop({ mutable: true }) size: DS.ButtonSize = undefined
  @Watch('size')
  sizeChanged(newValue: DS.ButtonSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() readonly href?: string

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() readonly target: DS.ButtonTarget = '_self'

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() readonly rel?: string

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop() readonly download?: string

  /**
   * If `true` the button has a dashed border.
   * */
  @Prop() readonly dashed: boolean = false

  /**
   * If `true` adds a box shadow to improve readability on image background
   * */
  @Prop() readonly shadow: boolean = false

  /**
   * If `true` the width of the buttons is limited
   */
  @Prop() readonly square: boolean = false

  /**
   * If `true` the button is circular and width of the buttons is limited
   */
  @Prop() readonly circle: boolean = false

  /**
   * If `true` the button has a full width
   */
  @Prop() readonly expanded: boolean = false

  /**
   * If `true` the button has no padding and a reduced height
   */
  @Prop() readonly flat: boolean = false

  /**
   * If `true` the button is outlined
   */
  @Prop() readonly outlined: boolean = false

  /**
   * If `true` the button is inverted
   */
  @Prop() readonly inverted: boolean = false

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop({ reflect: true }) readonly loading: DS.ButtonSpinner = false

  /**
   * If `true` the button is rounded.
   */
  @Prop() readonly rounded: boolean = false

  // /**
  //  * If `true` the button is a popup.
  //  */
  // @Prop() dsPopup = undefined

  /**
   * Name of the left button icon
   */
  @Prop() readonly icon?: string

  /**
   * If `true` the icon turns
   */
  @Prop() readonly iconTurn: boolean = false

  /**
   * Name of the right button icon
   */
  @Prop() readonly iconRight?: string

  /**
   * The label of the button will not break
   */
  @Prop() readonly noWrap: boolean = false

  /**
   * The name of the button, which is submitted with the form data.
   */
  @Prop() readonly name?: string

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() readonly value?: string | number

  /**
   * A11y attributes for the native button element.
   */
  @Prop() readonly a11yControls?: string = undefined

  /**
   * A11y attributes for the native button element.
   */
  @Prop() readonly a11yTitle?: string = undefined

  /**
   * A11y attributes for the native button element.
   */
  @Prop() readonly a11yLabel?: string = undefined

  /**
   * A11y attributes for the native button element.
   */
  @Prop() a11yHaspopup?: string = undefined

  /**
   * Emitted when the link element has clicked.
   */
  @Event() dsClick!: EventEmitter<DS.ButtonClickDetail>

  /**
   * Emitted when the link element has clicked.
   */
  @Event() dsNavigate!: EventEmitter<DS.ButtonNavigateDetail>

  /**
   * Emitted when the button has focus.
   */
  @Event() dsFocus!: EventEmitter<DS.ButtonFocusDetail>

  /**
   * Emitted when the button loses focus.
   */
  @Event() dsBlur!: EventEmitter<DS.ButtonBlurDetail>

  /**
   * Emitted when the button has been  rendered.
   */
  @Event() dsDidRender!: EventEmitter<DS.ButtonDidRenderDetail>

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  connectedCallback(): void {
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

  render() {
    const { elementType, download, href, rel, target, name, value } = this
    const TagType = this.href === undefined ? 'button' : 'a'
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
          'is-fullwidth': this.expanded,
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

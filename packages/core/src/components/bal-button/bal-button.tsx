import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core'
import { AttachInternals, HTMLStencilElement, Watch } from '@stencil/core/internal'
import { ariaBooleanToString } from '../../utils/aria'
import { Attributes, inheritAttributes } from '../../utils/attributes'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'bal-button',
  styleUrl: 'bal-button.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Button implements ComponentInterface {
  private inheritAttributes: Attributes = {}
  @AttachInternals() internals!: ElementInternals

  @Element() el!: HTMLStencilElement

  /**
   * The color to use from your application's color palette.aaa
   */
  @Prop({ reflect: true }) color: BalProps.BalButtonColor = 'primary'

  /**
   * The type of button.
   */
  @Prop({ reflect: true }) elementType: BalProps.BalButtonElementType = 'button'

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * Size of the button
   */
  @Prop({ reflect: true, mutable: true }) size: BalProps.BalButtonSize = undefined
  @Watch('size')
  watchSize(newValue: BalProps.BalButtonSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href?: string

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target: BalProps.BalButtonTarget = '_self'

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel?: string

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop() download?: string

  /**
   * If `true` the button has a dashed border.
   * */
  @Prop({ reflect: true }) dashed = false

  /**
   * If `true` adds a box shadow to improve readability on image background
   * */
  @Prop({ reflect: true }) shadow = false

  /**
   * If `true` the width of the buttons is limited
   */
  @Prop({ reflect: true }) square = false

  // /**
  //  * If `true` the button has a active theme
  //  */
  // @Prop() isActive = false

  /**
   * If `true` the button has a full width
   */
  @Prop({ reflect: true }) expanded = false

  /**
   * If `true` the button has no padding and a reduced height
   */
  @Prop({ reflect: true }) flat = false

  /**
   * If `true` the button is outlined
   */
  @Prop({ reflect: true }) outlined = false

  /**
   * If `true` the button is inverted
   */
  @Prop({ reflect: true }) inverted = false

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop({ reflect: true }) loading: BalProps.BalButtonSpinner = false

  /**
   * If `true` the button is rounded.
   */
  @Prop({ reflect: true }) rounded = false

  // /**
  //  * If `true` the button is a popup.
  //  */
  // @Prop() balPopup = undefined

  /**
   * Name of the left button icon
   */
  @Prop() icon = ''

  /**
   * If `true` the icon turns
   */
  @Prop() iconTurn = false

  /**
   * Name of the right button icon
   */
  @Prop() iconRight = ''

  /**
   * The label of the button will not break
   */
  @Prop({ reflect: true }) noWrap = false

  /**
   * The name of the button, which is submitted with the form data.
   */
  @Prop() name?: string = ''

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() value?: string | number = ''

  /**
   * A11y attributes for the native button element.
   */
  @Prop() a11yControls?: string = undefined

  /**
   * A11y attributes for the native button element.
   */
  @Prop() a11yTitle?: string = undefined

  /**
   * A11y attributes for the native button element.
   */
  @Prop() a11yLabel?: string = undefined

  /**
   * A11y attributes for the native button element.
   */
  @Prop() a11yHaspopup?: string = undefined

  /**
   * Emitted when the link element has clicked.
   */
  @Event() balClick!: EventEmitter<BalEvents.BalButtonClickDetail>

  /**
   * Emitted when the link element has clicked.
   */
  @Event() balNavigate!: EventEmitter<BalEvents.BalButtonNavigateDetail>

  /**
   * Emitted when the button has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalButtonFocusDetail>

  /**
   * Emitted when the button loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalButtonBlurDetail>

  /**
   * Emitted when the button has been  rendered.
   */
  @Event() balDidRender!: EventEmitter<BalEvents.BalButtonDidRenderDetail>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
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

    if (this.el.hasAttribute('bal-popup') && !this.a11yHaspopup) {
      this.a11yHaspopup = 'true'
    }
  }
  componentDidRender() {
    this.balDidRender.emit()
  }

  private get isIconInverted() {
    return this.inverted
  }

  // private get buttonCssClass(): { [className: string]: boolean } {
  //   // const colorMap: Record<string, string> = {
  //   //   'light': 'accent',
  //   //   'text': 'tertiary',
  //   //   'info': 'info',
  //   //   'primary-light': 'primary',
  //   //   'info-light': 'info',
  //   // }

  //   // const color = colorMap[this.color] || this.color

  //   return {
  //     // 'button': true,
  //     // [`is-${this.color}`]: true,
  //     // 'is-flat': this.flat,
  //     // 'is-square': this.square,
  //     // 'is-sm': this.size === 'sm',
  //     // 'is-lg': this.size === 'lg',
  //     // 'is-inverted': this.inverted,
  //     // 'is-active': this.isActive,
  //     // 'is-outlined': this.outlined,
  //     // 'is-fullwidth': this.expanded,
  //     // 'is-disabled': this.disabled,
  //     // 'is-loading': this.loading,
  //     // 'is-rounded': this.rounded === true,
  //     // 'has-shadow': this.shadow === true,
  //   }
  // }

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
    return {
      style: { display: 'block' },
    }
  }

  private handleClick(ev: MouseEvent) {
    if (this.disabled) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  private onFocus = () => {
    this.balFocus.emit()
  }

  private onBlur = () => {
    this.balBlur.emit()
  }

  private onClick = (ev: MouseEvent) => {
    if (!this.disabled) {
      if (this.elementType === 'submit') {
        this.internals.form?.requestSubmit()
      }
      if (this.elementType === 'reset') {
        this.internals.form?.reset()
      }

      this.balClick.emit(ev)

      if (this.href !== undefined) {
        this.balNavigate.emit(ev)
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
        onClick={this.handleClick}
        class={
          {
            // 'is-fullwidth': this.expanded,
            // [`is-${this.color}`]: true,
          }
        }
      >
        <TagType
          {...attrs}
          {...this.inheritAttributes}
          type={this.elementType}
          // class={this.buttonCssClass}
          id="button"
          part="native"
          disabled={this.disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onClick={this.onClick}
          aria-disabled={ariaBooleanToString(this.disabled)}
          {...ariaAttributes}
        >
          {this.isLoading ? (
            <bal-spinner
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
            <bal-icon
              {...this.leftIconAttrs}
              part="icon"
              class={this.square ? '' : 'icon-left'}
              name={this.icon}
              size={this.square ? this.size : 'small'}
              circle={this.dashed}
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
            <bal-icon
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

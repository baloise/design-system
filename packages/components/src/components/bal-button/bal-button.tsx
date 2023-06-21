import { Component, h, Prop, Host, Event, EventEmitter, ComponentInterface, Listen, Element } from '@stencil/core'
import { Attributes, inheritAttributes } from '../../utils/attributes'

@Component({
  tag: 'bal-button',
  styleUrls: {
    css: 'bal-button.sass',
  },
})
export class Button implements ComponentInterface {
  private inheritAttributes: Attributes = {}

  @Element() el!: HTMLElement

  /**
   * The color to use from your application's color palette.
   */
  @Prop() color: BalProps.BalButtonColor = 'primary'

  /**
   * The type of button.
   */
  @Prop() elementType: BalProps.BalButtonElementType = 'button'

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * Size of the button
   */
  @Prop({ reflect: true }) size: BalProps.BalButtonSize = ''

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
   * If `true` adds a box shadow to improve readability on image background
   * */
  @Prop() shadow = false

  /**
   * If `true` the width of the buttons is limited
   */
  @Prop() square = false

  /**
   * If `true` the button has a active theme
   */
  @Prop() isActive = false

  /**
   * If `true` the button has a full width
   */
  @Prop() expanded = false

  /**
   * If `true` the button has no padding and a reduced height
   */
  @Prop() flat = false

  /**
   * If `true` the button is outlined
   */
  @Prop() outlined = false

  /**
   * If `true` the button is inverted
   */
  @Prop() inverted = false

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop() loading = false

  /**
   * If `true` the button is rounded.
   */
  @Prop() rounded = false

  /**
   * If `true` the top corners get rounded
   */
  @Prop() topRounded: undefined | boolean = undefined

  /**
   * If `true` the bottom corners get rounded
   */
  @Prop() bottomRounded: undefined | boolean = undefined

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
  @Prop() noWrap = false

  /**
   * The name of the button, which is submitted with the form data.
   */
  @Prop() name?: string = ''

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() value?: string | number = ''

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

  componentDidRender() {
    this.balDidRender.emit()
  }

  componentWillRender() {
    this.inheritAttributes = inheritAttributes(this.el, ['title', 'aria-label'])
  }

  private get isIconInverted() {
    return this.inverted
  }

  private get buttonCssClass(): { [className: string]: boolean } {
    return {
      'button': true,
      // 'has-no-wrap': this.noWrap,
      [`is-${this.color}`]: true,
      'is-flat': this.flat,
      'is-square': this.square,
      'is-small': this.size === 'small',
      'is-inverted': this.inverted,
      'is-active': this.isActive,
      'is-outlined': this.outlined,
      'is-fullwidth': this.expanded,
      'is-disabled': this.disabled,
      'is-loading': this.loading,
      'has-blur-shadow': this.shadow === true,
      'has-radius-rounded': this.rounded === true,
      'has-round-top-corners': this.topRounded === true,
      'has-round-bottom-corners': this.bottomRounded === true,
      'has-no-round-top-corners': this.topRounded === false,
      'has-no-round-bottom-corners': this.bottomRounded === false,
    }
  }

  private get leftIconAttrs() {
    if (!this.icon || this.loading) {
      return {
        style: { display: 'none' },
      }
    }
    return {}
  }

  private get leftRightAttrs() {
    if (!this.iconRight || this.loading) {
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
    return {
      style: { position: 'absolute' },
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
    if (this.href !== undefined) {
      this.balNavigate.emit(ev)
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

    const spinnerColor = () => {
      if (this.disabled) {
        return 'blue'
      }

      switch (this.color) {
        case 'primary':
        case 'success':
        case 'warning':
        case 'danger':
          return this.inverted ? 'blue' : 'white'

        default:
          return this.inverted ? 'white' : 'blue'
      }
    }

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'bal-button': true,
          'control': true,
          'is-fullwidth': this.expanded,
          'is-disabled': this.disabled,
        }}
      >
        <TagType
          {...attrs}
          {...this.inheritAttributes}
          type={this.elementType}
          class={this.buttonCssClass}
          part="native"
          disabled={this.disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onClick={this.onClick}
          data-testid="bal-button"
        >
          <bal-spinner color={spinnerColor()} small {...this.loadingAttrs} deactivated={!this.loading} />
          <bal-icon
            {...this.leftIconAttrs}
            class="icon-left"
            name={this.icon}
            size={this.square ? this.size : 'small'}
            turn={this.iconTurn}
            inverted={this.isIconInverted}
          />
          <span
            class={{
              'button-label': true,
              'has-no-wrap': this.noWrap,
              'is-small': this.size === 'small',
            }}
            style={{ opacity: this.loading ? '0' : '1' }}
            data-testid="bal-button-label"
          >
            <slot />
          </span>
          <bal-icon
            {...this.leftRightAttrs}
            class="icon-right"
            name={this.iconRight}
            size={'small'}
            turn={this.iconTurn}
            inverted={this.isIconInverted}
          />
        </TagType>
      </Host>
    )
  }
}

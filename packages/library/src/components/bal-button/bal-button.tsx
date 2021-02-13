import { Component, h, Prop, Host, Event, EventEmitter, ComponentInterface, Listen, Element } from '@stencil/core'
import { BalButtonColor } from './bal.button.type'

@Component({
  tag: 'bal-button',
  styleUrl: 'bal-button.scss',
  shadow: false,
  scoped: true,
})
export class Button implements ComponentInterface {
  @Element() el: HTMLElement

  /**
   * The color to use from your application's color palette.
   */
  @Prop() color: BalButtonColor = 'primary'

  /**
   * The type of button.
   */
  @Prop() type: 'button' | 'reset' | 'submit' = 'button'

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * Size of the button
   */
  @Prop({ reflect: true }) size: 'small' | '' = ''

  /**
   * Turn the button in to a link.
   */
  @Prop() link: boolean = false

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href: string | undefined

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target: '_blank' | ' _parent' | '_self' | '_top' = '_self'

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel: string | undefined

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop() download: string | undefined

  /**
   * Size of the button
   */
  @Prop() iconPosition: 'left' | 'right' = 'left'

  /**
   * If `true` the width of the buttons is limited
   */
  @Prop() square: boolean = false

  /**
   * If `true` the button has a active theme
   */
  @Prop() isActive: boolean = false

  /**
   * If `true` the button has a full width
   */
  @Prop() expanded: boolean = false

  /**
   * If `true` the button is outlined
   */
  @Prop() outlined: boolean = false

  /**
   * If `true` the button is inverted
   */
  @Prop() inverted: boolean = false

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop() loading: boolean = false

  /**
   * If `true` the top corners get rounded
   */
  @Prop() topRounded: boolean = false

  /**
   * If `true` the bottom corners get rounded
   */
  @Prop() bottomRounded = false

  /**
   * Name of the left button icon
   */
  @Prop() icon = ''

  /**
   * Name of the right button icon
   */
  @Prop() iconRight = ''

  /**
   * Emitted when the link element has clicked.
   */
  @Event() balNavigate: EventEmitter<MouseEvent>

  /**
   * Emitted when the button has focus.
   */
  @Event() balFocus!: EventEmitter<void>

  /**
   * Emitted when the button loses focus.
   */
  @Event() balBlur!: EventEmitter<void>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  private get isIconInverted() {
    switch (this.color) {
      case 'primary':
      case 'success':
      case 'warning':
      case 'danger':
        return true

      default:
        return false
    }
  }

  private get buttonCssClass() {
    return {
      'button': true,
      [`is-${this.color}`]: true,
      'is-square': this.square,
      'is-small': this.size,
      'is-inverted': this.inverted,
      'is-active': this.isActive,
      'is-outlined': this.outlined,
      'is-fullwidth': this.expanded,
      'is-disabled': this.disabled,
      'is-loading': this.loading,
      'has-round-top-corners': this.topRounded,
      'has-round-bottom-corners': this.bottomRounded,
    }
  }

  private get iconSize() {
    if (this.size === 'small') {
      return 'xsmall'
    }
    return 'small'
  }

  private get leftIconAttrs() {
    if (!this.icon) {
      return {
        style: { display: 'none' },
      }
    }
    return {}
  }

  private get leftRightAttrs() {
    if (!this.iconRight) {
      return {
        style: { display: 'none' },
      }
    }
    return {}
  }

  private get spanAttrs() {
    if (this.square) {
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

  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private onFocus = () => {
    this.balFocus.emit()
  }

  private onBlur = () => {
    this.balBlur.emit()
  }

  private onClick = (event: MouseEvent) => {
    if (this.href !== undefined) {
      this.balNavigate.emit(event)
    }
  }

  render() {
    const { type, download, href, rel, target } = this
    const TagType = this.href === undefined ? 'button' : ('a' as any)
    const attrs =
      TagType === 'button'
        ? { type }
        : {
            download,
            href,
            rel,
            target,
          }

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'is-fullwidth': this.expanded,
          'is-disabled': this.disabled,
        }}
      >
        <TagType {...attrs} type={this.type} class={this.buttonCssClass} part="native" disabled={this.disabled} onFocus={this.onFocus} onBlur={this.onBlur} onClick={this.onClick}>
          <span {...this.spanAttrs}>{/* Empty span to get the correct text height */}</span>
          <bal-spinner {...this.loadingAttrs} class="is-small is-inverted" />
          <bal-icon {...this.leftIconAttrs} class="icon-left" name={this.icon} size={this.square ? this.size : this.iconSize} color={this.color} inverted={this.isIconInverted} />
          <bal-text {...this.spanAttrs} small={this.size === 'small'} style={{ display: this.loading ? 'none' : 'inline' }}>
            <slot />
          </bal-text>
          <bal-icon {...this.leftRightAttrs} class="icon-right" name={this.iconRight} size={this.iconSize} color={this.color} inverted={this.isIconInverted} />
        </TagType>
      </Host>
    )
  }
}

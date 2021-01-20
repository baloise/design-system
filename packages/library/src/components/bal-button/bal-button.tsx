import { Component, h, Prop, Host } from '@stencil/core'
import { BalButtonType } from './bal.button.type'

@Component({
  tag: 'bal-button',
  styleUrl: 'bal-button.scss',
  shadow: false,
  scoped: true,
})
export class Button {
  /**
   * The theme type of the button. Given by bulma our css framework.
   */
  @Prop() type: BalButtonType = 'primary'

  /**
   * Size of the button
   */
  @Prop() size: 'small' | '' = ''

  /**
   * Turn the button in to a link.
   */
  @Prop() link: boolean = false

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href: string = ''

  /**
   * Specifies where to open the linked document
   */
  @Prop() target: '_blank' | ' _parent' | '_self' | '_top' = '_self'

  /**
   * Size of the button
   */
  @Prop() iconPosition: 'left' | 'right' = 'left'

  /**
   * If `true` the width of the buttons is limited
   */
  @Prop() square: boolean

  /**
   * If `true` the button is disabled
   */
  @Prop() disabled: boolean

  /**
   * If `true` the button has a active theme
   */
  @Prop() isActive: boolean = false

  /**
   * If `true` the button has a full width
   */
  @Prop() expanded: boolean

  /**
   * If `true` the button is outlined
   */
  @Prop() outlined: boolean

  /**
   * If `true` the button is inverted
   */
  @Prop() inverted: boolean

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop() loading: boolean

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

  get isIconInverted() {
    switch (this.type) {
      case 'primary':
      case 'success':
      case 'warning':
      case 'danger':
        return true

      default:
        return false
    }
  }

  get buttonCssClass() {
    return [
      'button',
      `is-${this.type}`,
      this.square ? 'is-square' : '',
      this.size ? 'is-small' : '',
      this.inverted ? 'is-inverted' : '',
      this.isActive ? 'is-active' : '',
      this.outlined ? 'is-outlined' : '',
      this.expanded ? 'is-fullwidth' : '',
      this.disabled ? 'is-disabled' : '',
      this.loading ? 'is-loading' : '',
      this.bottomRounded ? 'has-round-bottom-corners' : '',
    ].join(' ')
  }

  render() {
    if (this.square) {
      return this.renderSquareButton()
    }

    return this.renderButton()
  }

  renderButton() {
    if (this.link) {
      return this.renderLinkButton()
    }
    return this.renderNormalButton()
  }

  renderSquareButton() {
    if (this.link) {
      return this.renderLinkSquareButton()
    }
    return this.renderNormalSquareButton()
  }

  renderButtonLoading() {
    if (this.loading) {
      return <bal-spinner class="is-small is-inverted" />
    }
  }

  renderButtonLabel() {
    return (
      <bal-text style={{ display: this.loading ? 'none' : 'inline' }}>
        <slot />
      </bal-text>
    )
  }

  renderButtonLeftIcon() {
    if (this.icon) {
      return (
        <bal-icon class="icon-left" name={this.icon} size={this.size} type={this.type} inverted={this.isIconInverted} />
      )
    }
  }

  renderButtonRightIcon() {
    if (this.iconRight) {
      return (
        <bal-icon
          class="icon-right"
          name={this.iconRight}
          size={this.size}
          type={this.type}
          inverted={this.isIconInverted}
        />
      )
    }
  }

  renderNormalButton() {
    return (
      <Host class={[this.expanded ? 'is-fullwidth' : ''].join(' ')}>
        <button class={this.buttonCssClass} disabled={this.disabled}>
          <span>{/* Empty span to get the correct text height */}</span>
          {this.renderButtonLoading()}
          {this.renderButtonLeftIcon()}
          {this.renderButtonLabel()}
          {this.renderButtonRightIcon()}
        </button>
      </Host>
    )
  }

  renderLinkButton() {
    return (
      <Host class={[this.expanded ? 'is-fullwidth' : ''].join(' ')}>
        <a class={this.buttonCssClass} href={this.href} target={this.target}>
          <span>{/* Empty span to get the correct text height */}</span>
          {this.renderButtonLoading()}
          {this.renderButtonLeftIcon()}
          {this.renderButtonLabel()}
          {this.renderButtonRightIcon()}
        </a>
      </Host>
    )
  }

  renderNormalSquareButton() {
    return (
      <Host>
        <button class={this.buttonCssClass} disabled={this.disabled}>
          <bal-icon name={this.icon} size={this.size} type={this.type} inverted={this.isIconInverted} />
        </button>
      </Host>
    )
  }

  renderLinkSquareButton() {
    return (
      <Host>
        <a class={this.buttonCssClass} href={this.href} target={this.target}>
          <bal-icon name={this.icon} size={this.size} type={this.type} inverted={this.isIconInverted} />
        </a>
      </Host>
    )
  }
}

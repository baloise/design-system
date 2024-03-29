import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-card-button',
})
export class CardButton {
  /**
   * Name of the icon like `edit`.
   */
  @Prop() icon = ''

  /**
   * The type of button.
   */
  @Prop() elementType: BalProps.BalCardButtonElementType = 'button'

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href?: string

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target: BalProps.BalCardButtonTarget = '_self'

  /**
   * Name of the right button icon
   */
  @Prop() iconRight = ''

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop() loading = false

  render() {
    return (
      <Host class="bal-card-button">
        <bal-button
          color="info"
          expanded
          bottom-rounded
          icon={this.icon}
          iconRight={this.iconRight}
          elementType={this.elementType}
          disabled={this.disabled}
          href={this.href}
          target={this.target}
          loading={this.loading}
        >
          <slot></slot>
        </bal-button>
      </Host>
    )
  }
}

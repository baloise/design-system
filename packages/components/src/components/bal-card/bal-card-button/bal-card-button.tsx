import { Component, Host, h, Prop } from '@stencil/core'
import { Props } from '../../../types'

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
  @Prop() type: Props.BalCardButtonType = 'button'

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
  @Prop() target: Props.BalCardButtonTarget = '_self'

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
      <Host class="pb-0">
        <bal-button
          color="primary-light"
          expanded
          bottom-rounded
          icon={this.icon}
          iconRight={this.iconRight}
          type={this.type}
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

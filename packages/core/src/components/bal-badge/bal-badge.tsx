import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'bal-badge',
  styleUrl: 'bal-badge.host.scss',
  shadow: true,
})
export class Badge implements ComponentInterface {
  @Element() el!: HTMLStencilElement

  /**
   * Name of the icon to show. If a icon is present text should be hidden.
   */
  @Prop() icon?: string

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop({ mutable: true }) size: BalProps.BalBadgeSize = ''
  @Watch('size')
  watchSize(newValue: BalProps.BalBadgeSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || ''
  }

  /**
   * Define the color for the badge.
   */
  @Prop() color: BalProps.BalBadgeColor = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop() position: BalProps.BalBadgePosition = ''

  connectedCallback(): void {
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
  }

  render() {
    return (
      <Host>
        <span
          id="badge"
          class={{
            [`is-${this.size}`]: this.size !== '',
            [`is-${this.color}`]: this.color !== '',
          }}
        >
          <slot></slot>
          {this.size !== 'small' && !!this.icon ? <bal-icon name={this.icon}></bal-icon> : ''}
        </span>
      </Host>
    )
  }
}

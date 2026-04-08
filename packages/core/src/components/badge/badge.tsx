import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'ds-badge',
  styleUrl: 'badge.host.scss',
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
  @Prop({ mutable: true, reflect: true }) size: DS.BadgeSize = ''
  @Watch('size')
  watchSize(newValue: DS.BadgeSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || ''
  }

  /**
   * Define the color for the badge.
   */
  @Prop({ reflect: true }) color: DS.BadgeColor = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop({ reflect: true }) position: DS.BadgePosition = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop({ reflect: true }) pulse = false

  connectedCallback(): void {
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
  }

  render() {
    return (
      <Host>
        <span id="badge" part="badge">
          <slot></slot>
          {this.size !== 'small' && !!this.icon ? <ds-icon part="icon" name={this.icon}></ds-icon> : ''}
        </span>
      </Host>
    )
  }
}

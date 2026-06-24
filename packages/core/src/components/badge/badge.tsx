import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, normalizeDeprecatedTShirtSize, hasValue, OneOf, Type } from '@utils'
import {
  BADGE_SIZES,
  BADGE_COLORS,
  BADGE_POSITIONS,
  type BadgeSize,
  type BadgeColor,
  type BadgePosition,
} from './badge.interfaces'

/**
 * Badge displays a small indicator or counter on a child component to highlight notifications, counts, or status information.
 *
 * @slot - The badge content, which can be text or an icon.
 * @part badge - The badge element itself.
 * @part icon - The icon element, if an icon is used.
 */
@Component({
  tag: 'ds-badge',
  styleUrl: 'badge.host.scss',
  shadow: true,
})
export class Badge implements DsComponentInterface {
  log!: LogInstance

  @Logger('badge')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  // ========================================================================
  // PUBLIC PROPERTY API
  // ========================================================================

  /**
   * Name of the icon to show. If an icon is present, text should be hidden.
   */
  @Prop()
  @Type('string')
  readonly icon: string = ''

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop({ reflect: true })
  @OneOf(BADGE_SIZES)
  readonly size: BadgeSize = ''

  /**
   * Define the color for the badge.
   */
  @Prop({ reflect: true })
  @OneOf(BADGE_COLORS)
  readonly color: BadgeColor = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop({ reflect: true })
  @OneOf(BADGE_POSITIONS)
  readonly position: BadgePosition = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly pulse: boolean = false

  // ========================================================================
  // LIFECYCLE
  // ========================================================================

  // ========================================================================
  // PROPERTY VALIDATION
  // ========================================================================

  // ========================================================================
  // PRIVATE METHODS
  // ========================================================================

  // ========================================================================
  // RENDER
  // ========================================================================

  render() {
    const size = normalizeDeprecatedTShirtSize(this.size) || ''

    return (
      <Host
        class={{
          [`is-${this.color}`]: hasValue(this.color),
          [`is-${size}`]: hasValue(this.size),
          'is-pulse': this.pulse,
        }}
      >
        <span id="badge" part="badge">
          <slot></slot>
          {size !== 'sm' && hasValue(this.icon) ? <ds-icon part="icon" name={this.icon}></ds-icon> : ''}
        </span>
      </Host>
    )
  }
}

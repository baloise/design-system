import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import {
  normalizeDeprecatedTShirtSize,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
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

  /**
   * Name of the icon to show. If a icon is present text should be hidden.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly icon: string = ''

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrOneOf(...BADGE_SIZES)
  size: BadgeSize = ''
  @Watch('size')
  sizeChanged(newValue: BadgeSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || ''
  }

  /**
   * Define the color for the badge.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf(...BADGE_COLORS)
  readonly color: BadgeColor = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf(...BADGE_POSITIONS)
  readonly position: BadgePosition = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly pulse: boolean = false

  connectedCallback(): void {
    setupValidation(this)
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

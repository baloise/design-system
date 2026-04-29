import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import {
  normalizeDeprecatedTShirtSize,
  Loggable,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'

@Component({
  tag: 'ds-badge',
  styleUrl: 'badge.host.scss',
  shadow: true,
})
export class Badge implements ComponentInterface, Loggable {
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
  readonly icon?: string

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrOneOf(...DS.BADGE_SIZES)
  size: DS.BadgeSize = ''
  @Watch('size')
  sizeChanged(newValue: DS.BadgeSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || ''
  }

  /**
   * Define the color for the badge.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf(...DS.BADGE_COLORS)
  readonly color: DS.BadgeColor = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf(...DS.BADGE_POSITIONS)
  readonly position: DS.BadgePosition = ''

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

import { Component, Element, h, Host, Prop, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  Logger,
  type LogInstance,
  normalizeDeprecatedTShirtSize,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { DsComponentInterface } from '@global'
import {
  DividerLayout,
  DividerSpace,
  DividerColor,
  DIVIDER_LAYOUTS,
  DIVIDER_SPACES,
  DIVIDER_COLORS,
} from './divider.interfaces'
import { CONTENT_LAYOUTS } from '../content/content.interfaces'

/**
 * Divider renders a visual separator line for grouping or distinguishing content sections.
 *
 * @part divider - The divider line element.
 */
@Component({
  tag: 'ds-divider',
  styleUrl: './divider.host.scss',
  shadow: true,
})
export class Divider implements DsComponentInterface {
  log!: LogInstance

  @Element() el!: HTMLStencilElement

  @Logger('divider')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the position of the child elements if they
   * are showed verticaly or horizontally. Default is verticaly.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...DIVIDER_LAYOUTS)
  readonly layout: DividerLayout = 'horizontal'

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...DIVIDER_SPACES)
  space: DividerSpace = 'none'
  @Watch('space')
  spaceChanged(newValue: DividerSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue) || 'none'
  }

  /**
   * Defines the color of the separator line.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...DIVIDER_COLORS)
  readonly color: DividerColor = 'grey'

  /**
   * Defines if the separator line is dashed or solid. Default is solid.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly dashed: boolean = false

  connectedCallback(): void {
    setupValidation(this)
    this.space = normalizeDeprecatedTShirtSize(this.space) || 'none'
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        role="separator"
        class={{
          divider: true,
          [`is-${this.layout}`]: !!this.layout,
          [`is-${this.color}`]: !!this.color,
          [`has-space-${this.space}`]: !!this.space,
          [`is-dashed`]: this.dashed,
        }}
      ></Host>
    )
  }
}

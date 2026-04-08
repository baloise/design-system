import { Component, ComponentInterface, h, Host, Prop, Watch } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'bal-divider',
  styleUrl: './divider.host.scss',
  shadow: true,
})
export class Divider implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('bal-divider')
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
  @Prop() layout: DS.DividerLayout = 'horizontal'

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop({ mutable: true }) space: DS.DividerSpace = 'none'
  @Watch('space')
  validateSpace(newValue: DS.DividerSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue) || 'none'
  }

  /**
   * Defines the color of the separator line.
   */
  @Prop() color: DS.DividerColor = 'grey'

  /**
   * Defines if the separator line is dashed or solid. Default is solid.
   */
  @Prop() dashed = false

  connectedCallback(): void {
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

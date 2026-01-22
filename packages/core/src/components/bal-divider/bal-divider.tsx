import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'bal-divider',
  styleUrl: './bal-divider.host.scss',
  shadow: false,
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
  @Prop() layout: BalProps.BalDividerLayout = 'horizontal'

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop() space: BalProps.BalDividerSpace = 'none'

  /**
   * Defines the color of the separator line.
   */
  @Prop() color: BalProps.BalDividerColor = 'grey'

  /**
   * Defines the color of the separator line.
   */
  @Prop() borderStyle: BalProps.BalDividerBorderStyle = 'solid'

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
          [`is-dashed`]: this.borderStyle === 'dashed',
        }}
      ></Host>
    )
  }
}

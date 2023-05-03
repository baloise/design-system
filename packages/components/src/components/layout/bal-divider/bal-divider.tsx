import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'bal-divider',
  styleUrls: {
    css: './bal-divider.sass',
  },
})
export class BalDivider implements ComponentInterface, Loggable {
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
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('divider')
    const layout = !!this.layout
    const space = !!this.space
    const color = !!this.color

    return (
      <Host
        role="separator"
        class={{
          ...block.class(),
          ...block.modifier(`layout-${this.layout}`).class(layout),
          ...block.modifier(`space-${this.space}`).class(space),
          ...block.modifier(`color-${this.color}`).class(color),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

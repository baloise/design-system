import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'bal-divider',
  styleUrl: './bal-divider.sass',
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
    const block = BEM.block('divider')
    const layout = !!this.layout
    const space = !!this.space
    const color = !!this.color
    const borderStyle = !!this.borderStyle

    return (
      <Host
        role="separator"
        class={{
          ...block.class(),
          ...block.modifier(`layout-${this.layout}`).class(layout),
          ...block.modifier(`space-${this.space}`).class(space),
          ...block.modifier(`color-${this.color}`).class(color),
          ...block.modifier(`border-style-${this.borderStyle}`).class(borderStyle),
        }}
      >
        <slot />
      </Host>
    )
  }
}

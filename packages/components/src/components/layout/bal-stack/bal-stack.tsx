import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'bal-stack',
  styleUrls: {
    css: './bal-stack.sass',
  },
})
export class BalStack implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('bal-stack')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the position of the child elements if they
   * are showed verticaly or horizontally. Default is horizontally.
   */
  @Prop() direction: Props.BalStackDirection = 'row'

  /**
   * Defines the text positioning like center, right or
   * default to start.
   */
  @Prop() alignment: Props.BalStackAlignment = ''

  /**
   * Defines the space between the child elements. Default is normal.
   */
  @Prop() space: Props.BalStackSpace = 'normal'

  /**
   * RENDER
   * ------------------------------------------------------
   */
  render() {
    const block = BEM.block('stack')
    const direction = !!this.direction
    const alignment = !!this.alignment
    const space = !!this.space

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`direction-${this.direction}`).class(direction),
          ...block.modifier(`alignment-${this.alignment}`).class(alignment),
          ...block.modifier(`space-${this.space}`).class(space),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

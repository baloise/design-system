import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
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
  @Prop() direction: BalProps.BalStackDirection = 'row'

  /**
   * Defines the text positioning like center, right or
   * default to start.
   */
  @Prop() alignment: BalProps.BalStackAlignment = ''

  /**
   * Defines the space between the child elements. Default is normal.
   */
  @Prop() space: BalProps.BalStackSpace = 'normal'

  /**
   * Defines the padding top and left of the stack element.
   */
  @Prop() verticalPadding: BalProps.BalStackPadding = ''

  /**
   * Defines the padding left and right of the stack element.
   */
  @Prop() horizontalPadding: BalProps.BalStackPadding = ''

  /**
   * Defines if the child elements will wrap to the next line if there
   * is not enough space left
   */
  @Prop() useWrap = false

  /**
   * RENDER
   * ------------------------------------------------------
   */
  render() {
    const block = BEM.block('stack')
    const direction = !!this.direction
    const alignment = !!this.alignment
    const space = !!this.space
    const useWrap = !!this.useWrap
    const verticalPadding = !!this.verticalPadding
    const horizontalPadding = !!this.horizontalPadding

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`use-wrap`).class(useWrap),
          ...block.modifier(`direction-${this.direction}`).class(direction),
          ...block.modifier(`alignment-${this.alignment.split(' ').join('-')}`).class(alignment),
          ...block.modifier(`space-${this.space}`).class(space),
          ...block.modifier(`vertical-padding-${this.verticalPadding}`).class(verticalPadding),
          ...block.modifier(`horizontal-padding-${this.horizontalPadding}`).class(horizontalPadding),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

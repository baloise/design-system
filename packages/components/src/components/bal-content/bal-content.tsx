import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'bal-content',
  styleUrl: './bal-content.sass',
})
export class BalContent implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('bal-content')
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
  @Prop() layout: BalProps.BalContentLayout = 'vertical'

  /**
   * Defines the text positioning like center, end or
   * default to start.
   */
  @Prop() align: BalProps.BalContentAlignment = 'start'

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop() space: BalProps.BalContentSpace = 'xx-small'

  /**
   * @internal
   * Please use layout instead.
   */
  @Prop() direction: BalProps.BalStackDirection = ''

  /**
   * @internal
   * Please use align instead.
   */
  @Prop() alignment: BalProps.BalStackAlignment = ''

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('content')
    const direction = !!this.direction
    const layout = !!this.layout
    const alignment = !!this.alignment
    const align = !!this.align
    const space = !!this.space

    let layoutValue = this.layout
    if (direction) {
      layoutValue = this.direction === 'row' ? 'horizontal' : 'vertical'
    }

    let alignValue = this.align.split(' ').join('-')
    if (alignment) {
      alignValue = this.alignment.split(' ').join('-')
    }

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`layout-${layoutValue}`).class(layout || direction),
          ...block.modifier(`align-${alignValue}`).class(align || alignment),
          ...block.modifier(`space-${this.space}`).class(space),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

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
  @Prop() layout: BalProps.BalStackLayout = 'horizontal'

  /**
   * Defines the text positioning like center, right or
   * default to start.
   */
  @Prop() align: BalProps.BalStackAlignment = ''

  /**
   * Defines the space between the child elements. Default is normal.
   */
  @Prop() space: BalProps.BalStackSpace = 'normal'

  /**
   * Defines the space between the child elements. Default is normal.
   */
  @Prop() spaceRow?: BalProps.BalStackSpace

  /**
   * Defines the space between the child elements. Default is normal.
   */
  @Prop() spaceColumn?: BalProps.BalStackSpace

  /**
   * Defines the horizontal padding left and right of the stack element.
   */
  @Prop() px: BalProps.BalStackPadding = ''

  /**
   * Defines the vertical padding top and bottom of the stack element.
   */
  @Prop() py: BalProps.BalStackPadding = ''

  /**
   * Defines if the child elements will wrap to the next line if there
   * is not enough space left
   */
  @Prop() useWrap = false

  /**
   * Defines the width of the stack to be exactly the with of the content.
   */
  @Prop() fitContent = false

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
    const block = BEM.block('stack')
    const direction = !!this.direction
    const layout = !!this.layout
    const align = !!this.align
    const alignment = !!this.alignment
    const space = !!this.space
    const spaceRow = !!this.spaceRow
    const spaceColumn = !!this.spaceColumn
    const useWrap = !!this.useWrap
    const fitContent = !!this.fitContent
    const px = !!this.px
    const py = !!this.py

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
          ...block.modifier(`use-wrap`).class(useWrap),
          ...block.modifier(`layout-${layoutValue}`).class(layout || direction),
          ...block.modifier(`align-${alignValue}`).class(align || alignment),
          ...block.modifier(`space-${this.space}`).class(space),
          ...block.modifier(`space-row-${this.spaceRow}`).class(spaceRow),
          ...block.modifier(`space-row-${this.spaceColumn}`).class(spaceColumn),
          ...block.modifier(`px-${this.px}`).class(px),
          ...block.modifier(`py-${this.py}`).class(py),
          ...block.modifier(`fit-content`).class(fitContent),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

import { Component, Element, h, Host, Prop, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, normalizeDeprecatedTShirtSize, hasValue, OneOf, Type } from '@utils'
import { DsComponentInterface } from '@global'
import {
  STACK_LAYOUTS,
  STACK_SPACES,
  STACK_PADDINGS,
  STACK_ALIGNMENTS,
  STACK_DIRECTIONS,
  type StackLayout,
  type StackSpace,
  type StackPadding,
  type StackAlignment,
  type StackDirection,
} from './stack.interfaces'

/**
 * Stack arranges child elements in a vertical or horizontal layout with customizable spacing and alignment options.
 *
 * @slot - The stack items (child elements).
 */
@Component({
  tag: 'ds-stack',
  styleUrl: './stack.host.scss',
})
export class Stack implements DsComponentInterface {
  log!: LogInstance

  @Element() el!: HTMLStencilElement

  @Logger('stack')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the text positioning like center, right or default to start.
   */
  @Prop()
  @OneOf(STACK_ALIGNMENTS)
  readonly align: StackAlignment = ''

  /**
   * @internal
   * Please use align instead.
   */
  @Prop()
  @OneOf(STACK_ALIGNMENTS)
  readonly alignment: StackAlignment = ''

  /**
   * Defines the direction of the child elements. Default is column.
   */
  @Prop({ mutable: true })
  @OneOf(STACK_DIRECTIONS)
  direction: StackDirection = 'column'

  /**
   * Defines the width of the stack to be exactly the width of the content.
   */
  @Prop()
  @Type('boolean')
  readonly fitContent: boolean = false

  /**
   * Defines the padding of the stack element.
   */
  @Prop()
  @OneOf(STACK_PADDINGS)
  readonly p?: StackPadding

  /**
   * Defines the horizontal padding left and right of the stack element.
   */
  @Prop()
  @OneOf(STACK_PADDINGS)
  readonly px?: StackPadding

  /**
   * Defines the vertical padding top and bottom of the stack element.
   */
  @Prop()
  @OneOf(STACK_PADDINGS)
  readonly py?: StackPadding

  /**
   * Defines the space between the child elements.
   */
  @Prop()
  @OneOf(STACK_SPACES)
  readonly space: StackSpace = 'base'

  /**
   * Defines the column space between the child elements.
   */
  @Prop()
  @OneOf(STACK_SPACES)
  readonly spaceColumn?: StackSpace

  /**
   * Defines the row space between the child elements.
   */
  @Prop()
  @OneOf(STACK_SPACES)
  readonly spaceRow?: StackSpace

  /**
   * Defines if the child elements will wrap to the next line if there is not enough space left.
   */
  @Prop()
  @Type('boolean')
  readonly useWrap: boolean = false

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  /**
   * RENDER
   * ------------------------------------------------------
   */
  render() {
    const align = hasValue(this.align)
    const alignment = hasValue(this.alignment)

    const space = normalizeDeprecatedTShirtSize(this.space) || ''
    const spaceRow = normalizeDeprecatedTShirtSize(this.spaceRow) || ''
    const spaceColumn = normalizeDeprecatedTShirtSize(this.spaceColumn) || ''
    const p = normalizeDeprecatedTShirtSize(this.p) || ''
    const px = normalizeDeprecatedTShirtSize(this.px) || ''
    const py = normalizeDeprecatedTShirtSize(this.py) || ''

    let alignValue = hasValue(this.align) ? this.align.split(' ').join('-') : undefined
    if (hasValue(this.alignment)) {
      alignValue = this.alignment.split(' ').join('-')
    }

    return (
      <Host
        class={{
          'stack': true,
          'as-row': this.direction === 'row',
          'as-col': this.direction === 'column',
          'has-wrap': hasValue(this.useWrap),
          'fit-content': hasValue(this.fitContent),
          [`align-${alignValue}`]: align || alignment,
          [`has-space-${space}`]: hasValue(this.space),
          [`has-space-row-${spaceRow}`]: hasValue(this.spaceRow),
          [`has-space-col-${spaceColumn}`]: hasValue(this.spaceColumn),
          [`p-${p}`]: hasValue(this.p),
          [`px-${px}`]: hasValue(this.px),
          [`py-${py}`]: hasValue(this.py),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

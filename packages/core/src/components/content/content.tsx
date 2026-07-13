import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, normalizeDeprecatedTShirtSize, hasValue, OneOf } from '@utils'
import { DsComponentInterface } from '@global'
import { STACK_ALIGNMENTS, STACK_LAYOUTS, StackAlignment, StackDirection, StackLayout } from '../stack/stack.interfaces'
import {
  ContentAlignment,
  ContentTextAlignment,
  ContentSpace,
  CONTENT_DIRECTIONS,
  CONTENT_ALIGNMENTS,
  CONTENT_SPACES,
} from './content.interfaces'

/**
 * Content arranges content with flexible layout, alignment, and spacing options for structural layouts.
 *
 * @slot - The content children (text, images, other elements).
 * @part content - The content container element.
 */
@Component({
  tag: 'ds-content',
  styleUrl: './content.host.scss',
})
export class Content implements DsComponentInterface {
  log!: LogInstance

  @Element() el!: HTMLStencilElement

  @Logger('content')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * **Deprecated:** Use direction instead.
   */
  @Prop()
  @OneOf(STACK_LAYOUTS)
  readonly layout: StackLayout = ''

  /**
   * Defines the direction of the child elements. Default is column.
   */
  @Prop()
  @OneOf(CONTENT_DIRECTIONS)
  readonly direction: StackDirection = ''

  /**
   * Defines the positioning like center, end or
   * default to start.
   */
  @Prop()
  @OneOf(CONTENT_ALIGNMENTS)
  readonly align: ContentAlignment = ''

  /**
   * Defines the text positioning like center, right or
   * default to left.
   */
  @Prop()
  @OneOf(CONTENT_ALIGNMENTS)
  readonly textAlign: ContentTextAlignment = ''

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop()
  @OneOf(CONTENT_SPACES)
  readonly space: ContentSpace = ''

  /**
   * @internal
   * Please use align instead.
   */
  @Prop()
  @OneOf(STACK_ALIGNMENTS)
  readonly alignment: StackAlignment = ''

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const alignment = hasValue(this.alignment)
    const align = hasValue(this.align)

    const space = normalizeDeprecatedTShirtSize(this.space) || ''

    let alignValue = this.align?.split(' ').join('-')
    if (hasValue(this.alignment)) {
      alignValue = this.alignment.split(' ').join('-')
    }

    let direction = this.direction
    if (hasValue(this.layout)) {
      if (this.layout === 'horizontal') {
        direction = 'row'
      } else if (this.layout === 'vertical') {
        direction = 'column'
      } else if (this.layout === 'vertical-reverse') {
        direction = 'column-reverse'
      } else if (this.layout === 'horizontal-reverse') {
        direction = 'row-reverse'
      }
    }

    return (
      <Host
        class={{
          'stack-content': true,
          'as-row': direction === 'row',
          'as-col': direction === 'column',
          [`align-${alignValue}`]: align || alignment,
          [`text-${this.textAlign}`]: hasValue(this.textAlign),
          [`has-space-${space}`]: hasValue(this.space),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

import { Component, Element, h, Host, Prop, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, normalizeDeprecatedTShirtSize, ValidateEmptyOrOneOf, setupValidation } from '@utils'
import { DsComponentInterface } from '@global'
import { STACK_LAYOUTS, StackAlignment, StackDirection, StackLayout } from '../stack/stack.interfaces'
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
  @ValidateEmptyOrOneOf(...STACK_LAYOUTS)
  readonly layout: StackLayout = ''
  @Watch('layout')
  layoutChanged(newValue?: StackLayout) {
    if (newValue !== '') {
      if (newValue === 'horizontal') {
        this.direction = 'row'
      } else if (newValue === 'vertical') {
        this.direction = 'column'
      } else if (newValue === 'vertical-reverse') {
        this.direction = 'column-reverse'
      } else if (newValue === 'horizontal-reverse') {
        this.direction = 'row-reverse'
      }
    }
  }

  /**
   * Defines the direction of the child elements. Default is column.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...CONTENT_DIRECTIONS)
  direction: StackDirection = ''

  /**
   * Defines the positioning like center, end or
   * default to start.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...CONTENT_ALIGNMENTS)
  readonly align: ContentAlignment = ''

  /**
   * Defines the text positioning like center, right or
   * default to left.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...CONTENT_ALIGNMENTS)
  readonly textAlign: ContentTextAlignment = ''

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...CONTENT_SPACES)
  space: ContentSpace = ''
  @Watch('space')
  spaceChanged(newValue: ContentSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * @internal
   * Please use align instead.
   */
  @Prop()
  readonly alignment?: StackAlignment

  connectedCallback(): void {
    setupValidation(this)
    this.layoutChanged(this.layout)
    this.spaceChanged(this.space)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const alignment = !!this.alignment
    const align = !!this.align
    const space = !!this.space

    let alignValue = this.align?.split(' ').join('-')
    if (this.alignment) {
      alignValue = this.alignment.split(' ').join('-')
    }

    return (
      <Host
        class={{
          'stack-content': true,
          'as-row': this.direction === 'row',
          'as-col': this.direction === 'column',
          [`align-${alignValue}`]: align || alignment,
          [`text-${this.textAlign}`]: this.textAlign !== undefined,
          [`has-space-${this.space}`]: space,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

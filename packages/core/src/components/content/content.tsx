import { Component, ComponentInterface, h, Host, Prop, Watch } from '@stencil/core'
import {
  Loggable,
  Logger,
  type LogInstance,
  normalizeDeprecatedTShirtSize,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'

@Component({
  tag: 'ds-content',
  styleUrl: './content.host.scss',
})
export class Content implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('content')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * @deprecated Please use direction instead.
   * Defines the position of the child elements if they
   * are showed verticaly or horizontally. Default is horizontally.
   */
  @Prop() readonly layout?: DS.StackLayout
  @Watch('layout')
  layoutChanged(newValue?: DS.StackLayout) {
    if (newValue !== undefined) {
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
  @Prop()
  @ValidateEmptyOrOneOf('column', 'row', 'column-reverse', 'row-reverse')
  direction?: DS.StackDirection

  /**
   * Defines the positioning like center, end or
   * default to start.
   */
  @Prop()
  @ValidateEmptyOrOneOf('start', 'center', 'end', '')
  readonly align?: DS.ContentAlignment

  /**
   * Defines the text positioning like center, right or
   * default to left.
   */
  @Prop()
  @ValidateEmptyOrOneOf('left', 'center', 'right', '')
  readonly textAlign?: DS.ContentTextAlignment

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf('none', '3xs', '2xs', 'xs', 'sm', 'base', '')
  space?: DS.ContentSpace
  @Watch('space')
  spaceChanged(newValue?: DS.ContentSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * @internal
   * Please use align instead.
   */
  @Prop()
  readonly alignment?: DS.StackAlignment

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

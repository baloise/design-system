import { Component, ComponentInterface, h, Host, Prop, Watch } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

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
  @Prop() layout?: DS.StackLayout
  @Watch('layout')
  validateLayout(newValue?: DS.StackLayout) {
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
  @Prop() direction?: DS.StackDirection

  /**
   * Defines the positioning like center, end or
   * default to start.
   */
  @Prop() align?: DS.ContentAlignment

  /**
   * Defines the text positioning like center, right or
   * default to left.
   */
  @Prop() textAlign?: DS.ContentTextAlignment

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop({ mutable: true }) space?: DS.ContentSpace
  @Watch('space')
  watchSize(newValue?: DS.ContentSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * @internal
   * Please use align instead.
   */
  @Prop() alignment?: DS.StackAlignment

  connectedCallback(): void {
    this.validateLayout(this.layout)
    this.watchSize(this.space)
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

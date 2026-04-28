import { Component, ComponentInterface, h, Host, Prop, Watch } from '@stencil/core'
import { Loggable, Logger, type LogInstance, normalizeDeprecatedTShirtSize } from '@utils'

@Component({
  tag: 'ds-stack',
  styleUrl: './stack.host.scss',
})
export class Stack implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('stack')
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
  @Prop() direction: DS.StackDirection = 'column'

  /**
   * Defines the text positioning like center, right or
   * default to start.
   */
  @Prop() readonly align?: DS.StackAlignment

  /**
   * Defines the space between the child elements. Default is normal.
   */
  @Prop({ mutable: true }) space?: DS.StackSpace
  @Watch('space')
  spaceChanged(newValue?: DS.StackSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines the space between the child elements. Default is normal.
   */
  @Prop() spaceRow?: DS.StackSpace
  @Watch('spaceRow')
  spaceRowChanged(newValue?: DS.StackSpace) {
    this.spaceRow = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines the space between the child elements. Default is normal.
   */
  @Prop() spaceColumn?: DS.StackSpace
  @Watch('spaceColumn')
  spaceColumnChanged(newValue?: DS.StackSpace) {
    this.spaceColumn = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines the horizontal padding left and right of the stack element.
   */
  @Prop() p?: DS.StackPadding
  @Watch('p')
  pChanged(newValue?: DS.StackPadding) {
    this.p = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines the horizontal padding left and right of the stack element.
   */
  @Prop() px?: DS.StackPadding
  @Watch('px')
  pxChanged(newValue?: DS.StackPadding) {
    this.px = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines the vertical padding top and bottom of the stack element.
   */
  @Prop() py?: DS.StackPadding
  @Watch('py')
  pyChanged(newValue?: DS.StackPadding) {
    this.py = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines if the child elements will wrap to the next line if there
   * is not enough space left
   */
  @Prop() readonly useWrap: boolean = false

  /**
   * Defines the width of the stack to be exactly the with of the content.
   */
  @Prop() readonly fitContent: boolean = false

  /**
   * @internal
   * Please use align instead.
   */
  @Prop() readonly alignment?: DS.StackAlignment

  connectedCallback(): void {
    this.layoutChanged(this.layout)
    this.spaceChanged(this.space)
    this.spaceRowChanged(this.spaceRow)
    this.spaceColumnChanged(this.spaceColumn)
    this.pChanged(this.p)
    this.pxChanged(this.px)
    this.pyChanged(this.py)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */
  render() {
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

    let alignValue = this.align?.split(' ').join('-')
    if (this.alignment) {
      alignValue = this.alignment.split(' ').join('-')
    }

    return (
      <Host
        class={{
          'stack': true,
          'as-row': this.direction === 'row',
          'as-col': this.direction === 'column',
          'has-wrap': useWrap,
          'fit-content': fitContent,
          [`is-${layoutValue}`]: layout || direction,
          [`align-${alignValue}`]: align || alignment,
          [`has-space-${this.space}`]: space,
          [`has-space-row-${this.spaceRow}`]: spaceRow,
          [`has-space-col-${this.spaceColumn}`]: spaceColumn,
          [`p-${this.p}`]: !!this.p,
          [`px-${this.px}`]: px,
          [`py-${this.py}`]: py,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

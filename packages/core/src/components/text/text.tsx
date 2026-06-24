import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { ElementStateInfo, Logger, type LogInstance, hasValue, OneOf, Type } from '@utils'
import { DsComponentInterface } from '@global'
import {
  TEXT_ALIGNS,
  TEXT_COLORS,
  TEXT_SIZES,
  TEXT_SPACES,
  TextSize,
  TextColor,
  TextSpace,
  TextAlign,
} from './text.interfaces'

/**
 * Text renders paragraph and article content with flexible sizing, styling, and semantic emphasis options.
 *
 * @slot - The text content.
 * @part text - The text container element.
 */
@Component({
  tag: 'ds-text',
  styleUrl: 'text.host.scss',
  shadow: true,
})
export class Text implements DsComponentInterface, ElementStateInfo {
  log!: LogInstance

  @Logger('text')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop()
  @OneOf(TEXT_ALIGNS)
  readonly align: TextAlign = ''

  /**
   * If `true` the text is bold
   */
  @Prop()
  @Type('boolean')
  readonly bold: boolean = false

  /**
   * Defines the color of the text.
   */
  @Prop()
  @OneOf(TEXT_COLORS)
  readonly color: TextColor = ''

  /**
   * If `true` the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the text has heading font family
   */
  @Prop()
  @Type('boolean')
  readonly heading: boolean = false

  /**
   * @internal
   */
  @Prop()
  @Type('boolean')
  readonly hovered: boolean = false

  /**
   * If `true` the text is shown as a display inline
   */
  @Prop()
  @Type('boolean')
  readonly inline: boolean = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop()
  @Type('boolean')
  readonly inverted: boolean = false

  /**
   * When true, the text will be truncated with a text overflow ellipsis instead of wrapping.
   * Please note that text overflow can only occur in block or inline-block level elements,
   * as these elements require a width to overflow.
   */
  @Prop()
  @Type('boolean')
  readonly noWrap: boolean = false

  /**
   * @internal
   */
  @Prop()
  @Type('boolean')
  readonly pressed: boolean = false

  /**
   * If `true` adds a text shadow to improve readability on image background
   */
  @Prop()
  @Type('boolean')
  readonly shadow: boolean = false

  /**
   * Defines the size of the paragraph
   */
  @Prop({ mutable: true })
  @OneOf(TEXT_SIZES)
  size?: TextSize

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop()
  @OneOf(TEXT_SPACES)
  readonly space: TextSpace = ''

  /**
   * If `true` the text has subtitle font family
   */
  @Prop()
  @Type('boolean')
  readonly subtitle: boolean = false

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private parseColor() {
    if (this.disabled) {
      return 'grey'
    }

    if (this.invalid) {
      if (this.pressed) {
        return 'danger-darker'
      }

      if (this.hovered) {
        return 'danger-dark'
      }
      return 'danger'
    }

    const color = this.inverted ? 'white' : this.color === 'info' ? 'primary' : this.color

    if (this.pressed) {
      return 'primary-dark'
    }

    if (this.hovered) {
      return 'light-blue'
    }

    return color
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const Text = this.inline ? 'span' : 'p'
    const color = this.parseColor()

    return (
      <Host
        class={{
          [`is-${color}`]: hasValue(color),
          'is-bold': this.bold,
          'has-shadow': this.shadow,
          'is-inline': this.inline,
          'is-heading': this.heading,
          'is-subtitle': this.subtitle,
          'has-no-wrap': this.noWrap,
          [`has-space-${this.space}`]: hasValue(this.space),
          [`is-${this.size}`]: hasValue(this.size),
        }}
      >
        <Text
          id="text"
          part="text"
          class={{
            [`is-${this.align}`]: hasValue(this.align),
          }}
        >
          <slot></slot>
        </Text>
      </Host>
    )
  }
}

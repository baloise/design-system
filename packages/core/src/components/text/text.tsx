import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  ElementStateInfo,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
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
  @ValidateEmptyOrOneOf(...TEXT_ALIGNS)
  readonly align?: TextAlign

  /**
   * If `true` the text is bold
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly bold: boolean = false

  /**
   * Defines the color of the text.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...TEXT_COLORS)
  readonly color?: TextColor

  /**
   * If `true` the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the text has heading font family
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly heading: boolean = false

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly hovered: boolean = false

  /**
   * If `true` the text is shown as a display inline
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly inline: boolean = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly invalid: boolean = false

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly inverted: boolean = false

  /**
   * When true, the text will be truncated with a text overflow ellipsis instead of wrapping.
   * Please note that text overflow can only occur in block or inline-block level elements,
   * as these elements require a width to overflow.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly noWrap: boolean = false

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly pressed: boolean = false

  /**
   * If `true` adds a text shadow to improve readability on image background
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly shadow: boolean = false

  /**
   * Defines the size of the paragraph
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...TEXT_SIZES)
  size?: TextSize

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...TEXT_SPACES)
  readonly space?: TextSpace

  /**
   * If `true` the text has subtitle font family
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly subtitle: boolean = false

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
  }

  componentWillUpdate() {
    setupValidation(this)
  }

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
          [`is-${color}`]: !!color,
        }}
      >
        <Text
          id="text"
          part="text"
          class={{
            [`is-${this.align}`]: !!this.align,
          }}
        >
          <slot></slot>
        </Text>
      </Host>
    )
  }
}

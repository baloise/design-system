import { Component, ComponentInterface, h, Host, Prop, Watch } from '@stencil/core'
import { BalElementStateInfo } from '../../utils/element-states'

@Component({
  tag: 'bal-text',
  styleUrl: 'bal-text.host.scss',
  shadow: true,
})
export class Text implements ComponentInterface, BalElementStateInfo {
  /**
   * PUBLIC API
   * ------------------------------------------------------
   */

  /**
   * Defines the size of the paragraph
   */
  @Prop({ mutable: true, reflect: true }) size: BalProps.BalTextSize = ''

  /**
   * If `true` the text has heading font family
   */
  @Prop({ reflect: true }) heading = false

  /**
   * If `true` the text has subtitle font family
   */
  @Prop({ reflect: true }) subtitle = false

  /**
   * When true, the text will be truncated with a text overflow ellipsis instead of wrapping.
   * Please note that text overflow can only occur in block or inline-block level elements,
   * as these elements require a width to overflow.
   */
  @Prop({ reflect: true }) noWrap = false

  /**
   * If `true` the text is bold
   */
  @Prop({ reflect: true }) bold = false

  /**
   * If `true` the text is shown as a display inline
   */
  @Prop({ reflect: true }) inline = false

  /**
   * Defines the color of the text.
   */
  @Prop() color: BalProps.BalTextColor = ''

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop({ reflect: true }) space: BalProps.BalTextSpace = ''

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop({ reflect: true }) inverted = false

  /**
   * If `true` adds a text shadow to improve readability on image background
   * */
  @Prop({ reflect: true }) shadow = false

  /**
   * If `true` the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop({ reflect: true }) invalid = false

  /**
   * @internal
   */
  @Prop() hovered = false

  /**
   * @internal
   */
  @Prop() pressed = false

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
          // [`has-space-${this.space}`]: this.space !== '',
          // [`is-inline`]: this.inline,
        }}
      >
        <Text
          id="text"
          part="text"
          data-testid="bal-text"
          class={
            {
              // text: true,
              // [`is-${color}`]: !!color,
              // [`is-bold`]: this.bold,
              // [`has-shadow`]: this.shadow,
              // [`has-no-wrap`]: this.noWrap,
              // [`is-heading`]: this.heading,
              // [`is-subtitle`]: this.subtitle,
              // [`is-lg`]: this.size === 'lead',
              // [`is-md`]: this.size === 'block',
              // [`is-sm`]: this.size === 'small',
            }
          }
        >
          <slot></slot>
        </Text>
      </Host>
    )
  }
}

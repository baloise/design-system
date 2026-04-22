import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { ElementStateInfo } from '../../utils/element-states'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'ds-text',
  styleUrl: 'text.host.scss',
  shadow: true,
})
export class Text implements ComponentInterface, ElementStateInfo, Loggable {
  log!: LogInstance

  @Logger('text')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC API
   * ------------------------------------------------------
   */

  /**
   * Defines the size of the paragraph
   */
  @Prop({ mutable: true, reflect: true }) size?: DS.TextSize

  /**
   * If `true` the text has heading font family
   */
  @Prop({ reflect: true }) readonly heading = false

  /**
   * If `true` the text has subtitle font family
   */
  @Prop({ reflect: true }) readonly subtitle = false

  /**
   * When true, the text will be truncated with a text overflow ellipsis instead of wrapping.
   * Please note that text overflow can only occur in block or inline-block level elements,
   * as these elements require a width to overflow.
   */
  @Prop({ reflect: true }) readonly noWrap = false

  /**
   * If `true` the text is bold
   */
  @Prop({ reflect: true }) readonly bold = false

  /**
   * If `true` the text is shown as a display inline
   */
  @Prop({ reflect: true }) readonly inline = false

  /**
   * Defines the color of the text.
   */
  @Prop() readonly color?: DS.TextColor

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop({ reflect: true }) readonly space?: DS.TextSpace

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop({ reflect: true }) readonly inverted = false

  /**
   * If `true` adds a text shadow to improve readability on image background
   * */
  @Prop({ reflect: true }) readonly shadow = false

  /**
   * If `true` the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true }) readonly disabled = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop({ reflect: true }) readonly invalid = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() readonly align?: DS.TextAlign

  /**
   * @internal
   */
  @Prop() readonly hovered = false

  /**
   * @internal
   */
  @Prop() readonly pressed = false

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

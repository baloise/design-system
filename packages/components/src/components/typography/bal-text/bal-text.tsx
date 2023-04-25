import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { ComponentElementState } from '../../../utils/element-states'

@Component({
  tag: 'bal-text',
  styleUrls: {
    css: 'bal-text.sass',
  },
})
export class Text implements ComponentInterface, ComponentElementState {
  /**
   * PUBLIC API
   * ------------------------------------------------------
   */

  /**
   * Defines the size of the paragraph
   */
  @Prop() size: BalProps.BalTextSize = ''

  /**
   * If `true` the text has heading font family
   */
  @Prop() heading = false

  /**
   * If `true` the text is bold
   */
  @Prop() bold = false

  /**
   * If `true` the text is shown as a display inline
   */
  @Prop() inline = false

  /**
   * Defines the color of the text.
   */
  @Prop() color: BalProps.BalTextColor = ''

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop() space: BalProps.BalTextSpace = ''

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop() inverted = false

  /**
   * If `true` adds a text shadow to improve readability on image background
   * */
  @Prop() shadow = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled?: boolean = undefined

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid?: boolean = undefined

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
    const block = BEM.block('text')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`space-${this.space}`).class(this.space !== ''),
          ...block.modifier(`inline`).class(this.inline),
        }}
      >
        <Text
          class={{
            ...block.element('text').class(),
            ...block.element('text').modifier(`has-text-${color}`).class(),
            'is-size-small': this.size === 'small',
            'is-size-large': this.size === 'lead',
            'is-size-medium': this.size === 'block',
            'has-text-weight-bold': this.bold,
            'is-family-title': this.heading,
            'has-text-shadow': this.shadow,
          }}
          data-testid="bal-text"
        >
          <slot></slot>
        </Text>
      </Host>
    )
  }
}

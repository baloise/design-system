import { Component, h, Host, Prop } from '@stencil/core'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-text',
  styleUrls: {
    css: 'bal-text.sass',
  },
})
export class Text {
  /**
   * Defines the size of the paragraph
   */
  @Prop() size: Props.BalTextSize = ''

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
  @Prop() color: Props.BalTextColor = ''

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop() space: Props.BalTextSpace = ''

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop() inverted = false

  /**
   * If `true` adds a text shadow to improve readability on image background
   * */
  @Prop() shadow = false

  render() {
    const Text = this.inline ? 'span' : 'p'
    const color = this.inverted ? 'white' : this.color === '' || this.color === 'info' ? 'primary' : this.color
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
            'is-small': this.size === 'small',
            'is-lead': this.size === 'lead',
            'is-block': this.size === 'block',
            'is-bold': this.bold,
            'is-family-title': this.heading,
            'has-blur-shadow': this.shadow,
            'data-test-text': true,
          }}
        >
          <slot></slot>
        </Text>
      </Host>
    )
  }
}

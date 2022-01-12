import { Component, h, Host, Prop } from '@stencil/core'
import { ColorTypes } from '../../types/color.types'
import { FontSizeType } from '../../types/font.types'

@Component({
  tag: 'bal-text',
})
export class Text {
  /**
   * Defines the size of the paragraph
   */
  @Prop() size: FontSizeType = ''

  /**
   * If `true` the text is bold
   */
  @Prop() bold = false

  /**
   * If `true` the text is shown as a block
   */
  @Prop() paragraph = false

  /**
   * Defines the color of the text.
   */
  @Prop() color: ColorTypes | '' = ''

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop() space: 'none' | 'bottom' | 'top' | 'all' | '' = ''

  get spacing(): string {
    switch (this.space) {
      case 'all':
        return 'my-4'
      case 'top':
        return 'mt-4'
      case 'bottom':
        return 'mb-4'
      case '':
        return this.paragraph ? 'mb-4' : ''
      default:
        return ''
    }
  }

  render() {
    const Text = this.paragraph ? 'p' : 'span'
    return (
      <Host style={{ display: this.paragraph ? 'block' : 'inline' }} class={{ [this.spacing]: true }}>
        <Text
          class={{
            [`has-text-${this.color}`]: this.color !== '',
            'is-small': this.size === 'small',
            'is-lead': this.size === 'lead',
            'is-bold': this.bold,
            'm-0': true,
          }}
        >
          <slot></slot>
        </Text>
      </Host>
    )
  }
}

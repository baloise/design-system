import { Component, h, Host, Prop } from '@stencil/core'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-heading',
  styleUrls: {
    css: 'bal-heading.sass',
  },
  shadow: true,
})
export class Heading {
  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop() level: Props.BalHeadingLevel = 'h1'

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop() visualLevel?: Props.BalHeadingLevel

  /**
   * If `true` the heading gets displayed slimmer.
   */
  @Prop() subtitle = false

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop() space?: 'none' | 'bottom' | 'top' | 'all'

  /**
   * The theme type of the toast.
   */
  @Prop() color: Props.BalHeadingColor = ''

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop() inverted = false

  /**
   * If `true` adds a text shadow to improve readability on image background
   * */
  @Prop() shadow = false

  private getFontSize(): string {
    const mapSize = (size: Props.BalHeadingLevel) => {
      const sizes = {
        'display': 'xxxxx-large',
        'display-2': 'xxxx-large',
        'h1': 'xxx-large',
        'h2': 'xx-large',
        'h3': 'x-large',
        'h4': 'large',
        'h5': 'normal',
        'xxxxx-large': 'xxxxx-large',
        'xxxx-large': 'xxxx-large',
        'xxx-large': 'xxx-large',
        'xx-large': 'xx-large',
        'x-large': 'x-large',
        'large': 'large',
        'medium': 'medium',
        'normal': 'normal',
      }
      return sizes[size] as string
    }

    return mapSize(this.visualLevel ? this.visualLevel : this.level)
  }

  private getFontColor(): string {
    return this.inverted ? 'white' : this.color === 'info' ? 'primary' : this.color
  }

  render() {
    const Heading = this.level.startsWith('display') ? 'h1' : this.level
    const block = BEM.block('heading')
    const bemTextEl = block.element('text')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`space-${this.space}`).class(this.space !== undefined),
          ...block.modifier(`level-${this.level}`).class(),
        }}
      >
        <Heading
          class={{
            ...bemTextEl.class(),
            ...bemTextEl.modifier('subtitle').class(this.subtitle),
            ...bemTextEl.modifier('shadow').class(this.shadow),
            ...bemTextEl.modifier(`color-${this.getFontColor()}`).class(this.getFontColor() !== ''),
            [`is-size-${this.getFontSize()}`]: true,
            'data-test-heading': true,
          }}
        >
          <slot />
        </Heading>
      </Host>
    )
  }
}

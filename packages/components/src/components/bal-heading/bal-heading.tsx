import { Component, h, Host, Prop } from '@stencil/core'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-heading',
  styleUrls: {
    css: 'bal-heading.sass',
  },
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
  @Prop() space: 'none' | 'bottom' | 'top' | 'all' = 'bottom'

  /**
   * The theme type of the toast. Given by bulma our css framework.
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
    const formatSize = (size: Props.BalHeadingLevel) => `is-size-${mapSize(size)}`
    const mapSize = (size: Props.BalHeadingLevel) => {
      const sizes = {
        'display': 'xxxxx-large',
        'display-2': 'xxxx-large',
        'h1': 'xxx-large',
        'h2': 'xx-large',
        'h3': 'x-large',
        'h4': 'large',
        'h5': 'normal',
      }
      return sizes[size] as string
    }

    return formatSize(this.visualLevel ? this.visualLevel : this.level)
  }

  private getFontColor(): string {
    const parseColor = (color: string) => (color !== '' ? `has-text-${color}` : '')

    return parseColor(this.inverted ? 'white' : this.color)
  }

  render() {
    const Heading = this.level.startsWith('display') ? 'h1' : this.level
    const block = BEM.block('heading')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`space-${this.space}`).class(),
          ...block.modifier(`level-${this.level}`).class(),
        }}
      >
        <Heading
          class={{
            'title': this.subtitle === false,
            'subtitle': this.subtitle === true,
            'has-blur-shadow': this.shadow,
            [this.getFontSize()]: true,
            [this.getFontColor()]: true,
            'data-test-heading': true,
          }}
        >
          <slot />
        </Heading>
      </Host>
    )
  }
}

import { Component, h, Host, Prop } from '@stencil/core'
import { Props } from '../../types'

@Component({
  tag: 'bal-heading',
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
   * If `true` the button is inverted
   */
  @Prop() inverted = false

  get fontSize(): string {
    const isHeading = (size: string) => size.startsWith('h')
    const parseDisplay = (size: string) => (size === 'display' ? 'display' : size)
    const parseSize = (size: string) => (isHeading(size) ? size.replace('h', '') : parseDisplay(size))
    const formatSize = (size: string) => `is-size-${parseSize(size)}`

    return formatSize(this.visualLevel ? this.visualLevel : this.level)
  }

  get fontColor(): string {
    const parseColor = (color: string) => (color !== '' ? `has-text-${color}` : '')

    return parseColor(this.inverted ? 'white' : this.color)
  }

  margins(spacingLevel: number) {
    const spacing = []

    if (this.space === 'top' || this.space === 'all') {
      spacing.push(`mt-${spacingLevel}`)
    }

    if (this.space === 'bottom' || this.space === 'all') {
      spacing.push(`mb-${spacingLevel}`)
    }

    return spacing.join(' ')
  }

  get spacing(): string {
    switch (this.level) {
      case 'display':
        return this.margins(4)
      case 'h1':
        return this.margins(3)
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
        return this.margins(2)
      case 'h6':
        return this.margins(1)
      default:
        return ''
    }
  }

  render() {
    const Heading = this.level.startsWith('display') ? 'h1' : this.level

    return (
      <Host class={{ [this.spacing]: true }}>
        <Heading
          class={{
            'data-test-heading': true,
            'title': this.subtitle === false,
            'subtitle': this.subtitle === true,
            [this.fontSize]: true,
            [this.fontColor]: true,
          }}
        >
          <slot />
        </Heading>
      </Host>
    )
  }
}

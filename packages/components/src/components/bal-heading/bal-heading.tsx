import { Component, h, Host, Prop } from '@stencil/core'
import { ColorTypes } from '../../types/color.types'
import { HeadingLevels } from './bal-heading.type'

@Component({
  tag: 'bal-heading',
})
export class Heading {
  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop() level: HeadingLevels = 'h1'

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop() visualLevel: HeadingLevels | undefined = undefined

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
  @Prop() color: ColorTypes | '' = ''

  /**
   * If `true` the button is inverted
   */
  @Prop() inverted = false

  get fontSize(): string {
    if (this.level === 'display') {
      return `is-size-display`
    }

    if (this.visualLevel) {
      const size = `${this.visualLevel}`
      return `is-size-${size.replace('h', '')}`
    }

    const size = `${this.level}`
    return `is-size-${size.replace('h', '')}`
  }

  get fontColor(): string {
    if (this.inverted) {
      return `has-text-white`
    }

    if (this.color !== '') {
      return `has-text-${this.color}`
    }

    return ''
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
    const Heading = this.level === 'display' ? 'h1' : this.level

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

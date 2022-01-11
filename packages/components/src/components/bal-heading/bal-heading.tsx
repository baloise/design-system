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
  @Prop() space: 'none' | 'bottom' = 'bottom'

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

  get spacing(): string {
    if (this.space === 'bottom') {
      switch (this.level) {
        case 'display':
          return 'mb-4'
        case 'h1':
          return 'mb-3'
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
          return 'mb-2'
        case 'h6':
          return 'mb-1'
        default:
          return ''
      }
    }
    return ''
  }

  render() {
    const Heading = this.level === 'display' ? 'h1' : this.level

    return (
      <Host>
        <Heading
          class={{
            title: this.subtitle === false,
            subtitle: this.subtitle === true,
            [this.spacing]: true,
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

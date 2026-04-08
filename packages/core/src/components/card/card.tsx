import { Component, h, Host, Prop, Watch, Element } from '@stencil/core'
import isEmpty from 'lodash/isEmpty'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'bal-card',
  styleUrl: 'card.host.scss',
  shadow: true,
})
export class Card {
  @Element() el!: HTMLElement

  /**
   * If `true` the card loses its shadow.
   */
  @Prop() flat = false

  /**
   * If `true` the card gets a tile look, it has a brand icon on the left
   */
  @Prop() tile = false

  /**
   * If `true` the card gets a smaller padding.
   */
  @Prop() dense = false

  /**
   * If `true` the card image is displayed as a teaser, which means
   * it is displayed with a large image.
   */
  @Prop() imageTeaser?: '' | 'wide-left' | 'wide-center' | 'wide-right'

  /**
   * If `true` the card loses its border radius.
   */
  @Prop() square = false

  /**
   * @deprecated
   * If `true` a light blue border is added to the card.
   */
  @Prop() border = false
  /**
   * If `true` the cards gets a light border and loses its shadow.
   */
  @Prop() outlined = false

  /**
   * If `true` the card background color becomes blue.
   */
  @Prop() inverted = false

  /**
   * If `true` the card has a hover effect.
   */
  @Prop() clickable = false

  /**
   * If `true` the card gets a light background to indicate a selection.
   */
  @Prop() selected = false

  /**
   * If `true` the card uses 100% of the available height.
   */
  @Prop() fullheight = false

  /**
   * Defines the text alignment of the card content.
   */
  @Prop() align?: BalProps.BalCardAlignment

  /**
   * Defines the space of the card content.
   */
  @Prop({ mutable: true }) space?: BalProps.BalCardSpace
  @Watch('space')
  watchSpace(newValue: BalProps.BalCardSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines the color of the card.
   */
  @Prop() color?: BalProps.BalCardColor

  connectedCallback(): void {
    this.space = normalizeDeprecatedTShirtSize(this.space)
  }

  get colorTypeClass(): string {
    const color = isEmpty(this.color) ? '' : `${this.inverted ? 'primary' : this.color}`

    const colorMap: Record<string, string> = {
      'blue': 'primary',
      'purple-1': 'purple-lighter',
      'purple-2': 'purple-light',
      'purple-3': 'purple',
      'red-1': 'red-lighter',
      'red-2': 'red-light',
      'red-3': 'red',
      'green-1': 'green-lighter',
      'green-2': 'green-light',
      'green-3': 'green',
      'yellow-1': 'yellow-lighter',
      'yellow-2': 'yellow-light',
      'yellow-3': 'yellow',
    }

    return colorMap[color] || color
  }

  render() {
    const hasOutline = !!this.outlined || !!this.border
    const isImageTeaser = this.imageTeaser !== undefined

    return (
      <Host
        class={{
          [`is-image-teaser`]: isImageTeaser,
          [`is-image-teaser-${this.imageTeaser}`]: isImageTeaser && !isEmpty(this.imageTeaser),
          [`is-square`]: this.square,
          [`is-dense`]: this.dense,
          [`is-${this.colorTypeClass}`]: !isEmpty(this.color) && this.colorTypeClass !== 'white',
          [`has-space-${this.space}`]: !isEmpty(this.space),
          [`is-outlined`]: hasOutline,
          [`is-flat`]: hasOutline || !!this.flat,
          [`is-tile`]: !!this.tile,
        }}
      >
        <slot name="picture"></slot>
        <article
          id="card"
          class={{
            [`is-fullheight`]: this.fullheight,
            [`align-${this.align}`]: !isEmpty(this.align),
          }}
        >
          <slot></slot>
        </article>
      </Host>
    )
  }
}

import { Component, h, Host, Prop, Watch, Element } from '@stencil/core'
import { normalizeDeprecatedTShirtSize, Logger, type LogInstance, hasValue, OneOf, Type } from '@utils'
import {
  CARD_ALIGNMENTS,
  CARD_IMAGE_TEASERS,
  CARD_SPACES,
  CARD_COLORS,
  type CardAlignment,
  type CardImageTeaser,
  type CardSpace,
  type CardColor,
} from './card.interfaces'
import { DsComponentInterface } from '@global'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Card groups related content together in a contained, visually distinct container with optional header and footer.
 *
 * @slot - The main card content.
 * @slot header - Content displayed in the card header.
 * @slot footer - Content displayed in the card footer.
 * @part card - The card container element.
 */
@Component({
  tag: 'ds-card',
  styleUrl: 'card.host.scss',
  shadow: true,
})
export class Card implements DsComponentInterface {
  log!: LogInstance

  @Logger('card')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * If `true` the card loses its shadow.
   */
  @Prop()
  @Type('boolean')
  readonly flat: boolean = false

  /**
   * If `true` the card gets a tile look, it has a brand icon on the left
   */
  @Prop()
  @Type('boolean')
  readonly tile: boolean = false

  /**
   * If `true` the card gets a smaller padding.
   */
  @Prop()
  @Type('boolean')
  readonly dense: boolean = false

  /**
   * If `true` the card image is displayed as a teaser, which means
   * it is displayed with a large image.
   */
  @Prop()
  @OneOf(CARD_IMAGE_TEASERS)
  readonly imageTeaser: CardImageTeaser = ''

  /**
   * If `true` the card loses its border radius.
   */
  @Prop()
  @Type('boolean')
  readonly square: boolean = false

  /**
   * If `true` the cards gets a light border and loses its shadow.
   */
  @Prop()
  @Type('boolean')
  readonly outlined: boolean = false

  /**
   * If `true` the card background color becomes blue.
   */
  @Prop()
  @Type('boolean')
  readonly inverted: boolean = false

  /**
   * If `true` the card has a hover effect.
   */
  @Prop()
  @Type('boolean')
  readonly clickable: boolean = false

  /**
   * If `true` the card gets a light background to indicate a selection.
   */
  @Prop()
  @Type('boolean')
  readonly selected: boolean = false

  /**
   * If `true` the card uses 100% of the available height.
   */
  @Prop()
  @Type('boolean')
  readonly fullheight: boolean = false

  /**
   * Defines the text alignment of the card content.
   */
  @Prop()
  @OneOf(CARD_ALIGNMENTS)
  readonly align: CardAlignment = ''

  /**
   * Defines the space of the card content.
   */
  @Prop({ mutable: true })
  @OneOf(CARD_SPACES)
  space?: CardSpace
  @Watch('space')
  spaceChanged(newValue: CardSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines the color of the card.
   */
  @Prop()
  @OneOf(CARD_COLORS)
  readonly color: CardColor = ''

  connectedCallback(): void {
    this.space = normalizeDeprecatedTShirtSize(this.space)
  }

  private get colorTypeClass(): string {
    const color = !hasValue(this.color) ? '' : `${this.inverted ? 'primary' : this.color}`

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
    const hasOutline = !!this.outlined
    const isImageTeaser = hasValue(this.imageTeaser)

    return (
      <Host
        class={{
          [`is-image-teaser`]: isImageTeaser,
          [`is-image-teaser-${this.imageTeaser}`]: isImageTeaser && hasValue(this.imageTeaser),
          [`is-square`]: this.square,
          [`is-dense`]: this.dense,
          [`is-${this.colorTypeClass}`]: hasValue(this.color) && this.colorTypeClass !== 'white',
          [`has-space-${this.space}`]: hasValue(this.space),
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
            [`align-${this.align}`]: hasValue(this.align),
          }}
        >
          <slot></slot>
        </article>
      </Host>
    )
  }
}

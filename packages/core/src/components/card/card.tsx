import { Component, ComponentInterface, h, Host, Prop, Watch, Element } from '@stencil/core'
import isEmpty from 'lodash/isEmpty'
import { normalizeDeprecatedTShirtSize, Loggable, Logger, type LogInstance } from '@utils'

@Component({
  tag: 'ds-card',
  styleUrl: 'card.host.scss',
  shadow: true,
})
export class Card implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('card')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLElement

  /**
   * If `true` the card loses its shadow.
   */
  @Prop() readonly flat: boolean = false

  /**
   * If `true` the card gets a tile look, it has a brand icon on the left
   */
  @Prop() readonly tile: boolean = false

  /**
   * If `true` the card gets a smaller padding.
   */
  @Prop() readonly dense: boolean = false

  /**
   * If `true` the card image is displayed as a teaser, which means
   * it is displayed with a large image.
   */
  @Prop() readonly imageTeaser?: '' | 'wide-left' | 'wide-center' | 'wide-right'

  /**
   * If `true` the card loses its border radius.
   */
  @Prop() readonly square: boolean = false

  /**
   * If `true` the cards gets a light border and loses its shadow.
   */
  @Prop() readonly outlined: boolean = false

  /**
   * If `true` the card background color becomes blue.
   */
  @Prop() readonly inverted: boolean = false

  /**
   * If `true` the card has a hover effect.
   */
  @Prop() readonly clickable: boolean = false

  /**
   * If `true` the card gets a light background to indicate a selection.
   */
  @Prop() readonly selected: boolean = false

  /**
   * If `true` the card uses 100% of the available height.
   */
  @Prop() readonly fullheight: boolean = false

  /**
   * Defines the text alignment of the card content.
   */
  @Prop() readonly align?: DS.CardAlignment

  /**
   * Defines the space of the card content.
   */
  @Prop({ mutable: true }) space?: DS.CardSpace
  @Watch('space')
  spaceChanged(newValue: DS.CardSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines the color of the card.
   */
  @Prop() readonly color?: DS.CardColor

  connectedCallback(): void {
    this.space = normalizeDeprecatedTShirtSize(this.space)
  }

  private get colorTypeClass(): string {
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
    const hasOutline = !!this.outlined
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

import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import {
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  ValidateRequiredAndType,
  setupValidation,
} from '@utils'
import { CAROUSEL_ITEM_COLORS, CarouselItemColor, CAROUSEL_VARIANTS, CarouselVariant } from '../carousel.interfaces'

/**
 * Carousel Item is a single slide or product tile inside a ds-carousel.
 *
 * @slot - Slide content (image variant) or label text (product variant).
 */
@Component({
  tag: 'ds-carousel-item',
  styleUrl: 'carousel-item.host.scss',
  shadow: true,
})
export class CarouselItem implements DsComponentInterface {
  log!: LogInstance

  @Logger('carousel-item')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Background color for product tiles.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...CAROUSEL_ITEM_COLORS)
  readonly color: CarouselItemColor = ''

  /**
   * Set by ds-carousel. The carousel variant this item is part of.
   * @internal
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...CAROUSEL_VARIANTS)
  readonly carouselVariant: CarouselVariant = 'slide'

  /**
   * When `true`, the item renders in navigation mode: the consumer provides an `<a>` in the slot,
   * which is stretched to cover the full tile and acts as the interactive element.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly navigation: boolean = false

  /**
   * Set by ds-carousel. 1-based position index.
   * @internal
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrType('number')
  readonly index: number = 0

  /**
   * Unique identifier for this item, matched by the parent ds-carousel `value` prop.
   */
  @Prop({ reflect: true })
  @ValidateRequiredAndType('string')
  readonly name!: string

  /**
   * If `true`, this item is the currently active slide/tile. Set by the parent ds-carousel.
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly selected: boolean = false

  /**
   * Image URL displayed in image-variant slides, or brand icon source for product tiles.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly src: string = ''

  /**
   * Emitted when the user clicks this item (product variant).
   */
  @Event() dsCarouselItemSelect!: EventEmitter<{ name: string }>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
  }

  componentWillUpdate() {
    setupValidation(this)
  }

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  // Validation is handled by @Validate decorators via setupValidation(this)

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleClick = () => {
    if (this.carouselVariant === 'tile') {
      this.dsCarouselItemSelect.emit({ name: this.name })
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const isTile = this.carouselVariant === 'tile'

    const hostClass = {
      'is-slide': !isTile,
      'is-tile': isTile,
      'is-selected': this.selected,
      'is-navigation': isTile && this.navigation,
      [`is-${this.color}`]: !!this.color,
    }

    if (isTile) {
      if (this.navigation) {
        return (
          <Host class={hostClass} role="none">
            <slot />
          </Host>
        )
      }

      return (
        <Host
          class={hostClass}
          role="button"
          tabIndex={0}
          aria-pressed={String(this.selected)}
          onClick={this.handleClick}
        >
          <slot />
        </Host>
      )
    }

    return (
      <Host class={hostClass} aria-label={`Slide ${this.index}`}>
        {this.src ? <img src={this.src} alt="" draggable={false} /> : <slot />}
      </Host>
    )
  }
}

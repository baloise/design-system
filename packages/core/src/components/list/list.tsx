import { DsComponentInterface } from '@global'
import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, hasValue, OneOf, Type } from '@utils'
import { ITEM_SIZES, type ItemSize } from './item/item.interfaces'

/**
 * List renders semantic HTML list elements (ordered or unordered) for grouping related items.
 *
 * @slot - The list items (li elements or content).
 * @part list - The native HTML list element (ol or ul).
 *
 * @variant is-inverted - Inverted color scheme for use on dark backgrounds such as the primary surface. Cascades to descendant ds-item elements.
 * @variant is-lg - Large size, increasing the minimum row height of descendant ds-item elements.
 */
@Component({
  tag: 'ds-list',
  styleUrl: 'list.host.scss',
  shadow: true,
})
export class List implements DsComponentInterface {
  log!: LogInstance

  @Logger('list')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * If `true`, the list uses an inverted color scheme for use on dark backgrounds such as the primary surface.
   * Cascades to descendant `ds-item` elements.
   */
  @Prop()
  @Type('boolean')
  readonly inverted: boolean = false

  /**
   * If `true`, renders an ordered list (`<ol>`); otherwise renders an unordered list (`<ul>`).
   */
  @Prop()
  @Type('boolean')
  readonly ordered: boolean = false

  /**
   * The size of the list items. If not set, the default (base) size is used.
   * Cascades to descendant `ds-item` elements.
   */
  @Prop()
  @OneOf(ITEM_SIZES)
  readonly size?: ItemSize

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const ListTag = this.ordered ? 'ol' : 'ul'

    return (
      <Host class={{ 'is-inverted': this.inverted, [`is-${this.size}`]: hasValue(this.size) }}>
        <ListTag id="list" part="list">
          <slot></slot>
        </ListTag>
      </Host>
    )
  }
}

import { DsComponentInterface } from '@global'
import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, ValidateEmptyOrType, setupValidation } from '@utils'

/**
 * List renders semantic HTML list elements (ordered or unordered) for grouping related items.
 *
 * @slot - The list items (li elements or content).
 * @part list - The native HTML list element (ol or ul).
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
   * ------------------------------------------------------
   */

  /**
   * If `true`, renders an ordered list (`<ol>`); otherwise renders an unordered list (`<ul>`).
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly ordered: boolean = false

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    setupValidation(this)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const ListTag = this.ordered ? 'ol' : 'ul'

    return (
      <Host>
        <ListTag id="list" part="list">
          <slot></slot>
        </ListTag>
      </Host>
    )
  }
}

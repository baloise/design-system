import { Component, Element, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'
import { DsComponentInterface } from '@global'

/**
 * Tag Group arranges multiple tag elements in a horizontal or wrapping layout.
 *
 * @slot - The ds-tag elements to display inside the group.
 */
@Component({
  tag: 'ds-tag-group',
  styleUrl: 'tag-group.host.scss',
  shadow: true,
})
export class TagGroup implements DsComponentInterface {
  log!: LogInstance

  @Logger('tag-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host>
        <slot />
      </Host>
    )
  }
}

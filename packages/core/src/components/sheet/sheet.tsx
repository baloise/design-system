import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, OneOf } from '@utils'
import { SHEET_CONTAINER_SIZES, SheetContainerSize } from './sheet.interfaces'

/**
 * Sheet displays a fixed panel anchored to the bottom of the viewport.
 * Use it to surface persistent actions or contextual information without
 * blocking the main content.
 *
 * @slot - The sheet content.
 */
@Component({
  tag: 'ds-sheet',
  styleUrl: 'sheet.host.scss',
  shadow: true,
})
export class Sheet implements DsComponentInterface {
  log!: LogInstance

  @Logger('sheet')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * Defines the content width of the sheet. Leave unset for the default width,
   * or use `'fluid'` for full width, or `'compact'` for a narrow layout.
   */
  @Prop()
  @OneOf(SHEET_CONTAINER_SIZES)
  readonly containerSize?: SheetContainerSize

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const isFluid = this.containerSize === 'fluid'
    const isCompact = this.containerSize === 'compact'

    return (
      <Host>
        <div
          class={{
            'container': true,
            'is-fluid': isFluid,
            'is-compact': isCompact,
          }}
        >
          <slot />
        </div>
      </Host>
    )
  }
}

import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, Type } from '@utils'

/**
 * Select option declares a single selectable option as HTML markup, as an alternative to the
 * `options` / `optionGroups` props on `ds-select` — useful for backend-only apps and easier
 * migration, where the consumer would rather render option markup than write JavaScript.
 * The element itself renders nothing visible; `ds-select` reads its `value`, `disabled`, and
 * text content and renders the actual dropdown option itself.
 *
 * @slot - The option's label text.
 */
@Component({
  tag: 'ds-select-option',
  styleUrl: 'select-option.host.scss',
  shadow: true,
})
export class DsSelectOption implements DsComponentInterface {
  log!: LogInstance
  @Logger('select-option')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * The value submitted when this option is selected.
   */
  @Prop()
  @Type('string')
  readonly value: string = ''

  /**
   * If `true`, the option cannot be selected.
   */
  @Prop()
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    return (
      <Host aria-hidden="true">
        <slot></slot>
      </Host>
    )
  }
}

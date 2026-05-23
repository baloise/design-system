import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, ValidateEmptyOrType, ValidateRequiredAndType, setupValidation } from '@utils'

/**
 * Tab Panel displays the content area associated with a ds-tab, visible when its controlling tab is selected.
 *
 * @slot - The panel content.
 */
@Component({
  tag: 'ds-tab-panel',
  styleUrl: 'tab-panel.host.scss',
  shadow: true,
})
export class TabPanel implements DsComponentInterface {
  log!: LogInstance

  @Logger('tab-panel')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Matches the `name` of the ds-tab that controls this panel.
   */
  @Prop({ reflect: true })
  @ValidateRequiredAndType('string')
  readonly for!: string

  /**
   * If `true`, the panel is visible. Managed by the parent ds-tabs.
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly selected: boolean = false

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
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        role="tabpanel"
        class={{ 'is-selected': this.selected }}
        aria-hidden={this.selected ? null : 'true'}
        tabIndex={this.selected ? 0 : -1}
      >
        <slot />
      </Host>
    )
  }
}

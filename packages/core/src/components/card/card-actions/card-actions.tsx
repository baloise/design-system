import { Component, Element, h, Host, Prop } from '@stencil/core'
import { Logger, LogInstance, ValidateEmptyOrOneOf, setupValidation } from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'
import { CARD_ACTIONS_ALIGNMENTS, CardActionsAlignment } from '../card.interfaces'
import { DsComponentInterface } from '@global'

/**
 * Card actions renders a container for action buttons or controls at the end of a card.
 *
 * @slot - Action buttons or controls.
 * @part card-actions - The card actions container element.
 */
@Component({
  tag: 'ds-card-actions',
  shadow: true,
})
export class CardActions implements DsComponentInterface {
  log!: LogInstance

  @Logger('card-actions')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...CARD_ACTIONS_ALIGNMENTS)
  readonly align?: CardActionsAlignment

  connectedCallback(): void {
    setupValidation(this)
  }

  render() {
    return (
      <Host role="contentinfo">
        <ds-button-group class="m-none" align={this.align}>
          <slot />
        </ds-button-group>
      </Host>
    )
  }
}

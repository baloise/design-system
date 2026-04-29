import { Component, Element, h, Host, Prop } from '@stencil/core'
import { Logger, LogInstance, ValidateEmptyOrOneOf, setupValidation } from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'
import { CardActionsAlignment } from '../card.interfaces'
import { DsComponentInterface } from '@global'

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
  @ValidateEmptyOrOneOf('left', 'center', 'right', '')
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

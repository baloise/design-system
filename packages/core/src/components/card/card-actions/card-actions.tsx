import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { Loggable, Logger, LogInstance, ValidateEmptyOrOneOf, setupValidation } from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'

@Component({
  tag: 'ds-card-actions',
  shadow: true,
})
export class CardActions implements ComponentInterface, Loggable {
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
  readonly align?: DS.CardActionsAlignment

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

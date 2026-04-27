import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
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

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() readonly align?: DS.CardActionsAlignment

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

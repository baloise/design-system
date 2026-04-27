import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'ds-button-group',
  styleUrl: 'button-group.host.scss',
  shadow: true,
})
export class ButtonGroup implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('button-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() readonly align?: DS.ButtonGroupAlignment

  /**
   * `auto` will position the button items vertical and full width.
   * `row` will force that the buttons are also horizontal on mobile.
   */
  @Prop() readonly direction: DS.ButtonGroupDirection = 'auto'

  /**
   * If `true` the flex direction is used in reverse on mobile.
   */
  @Prop() readonly reverse: boolean = false

  /**
   * If `true` the buttons will expand to fill the available space on mobile.
   */
  @Prop() readonly wide: boolean = false

  render() {
    return (
      <Host>
        <div
          id="group"
          part="group"
          class={{
            'as-col': this.direction === 'column',
            'as-row': this.direction === 'row',
            'is-reverse': this.reverse,
            'is-wide': this.wide,
            'is-left': this.align === 'left',
            'is-center': this.align === 'center',
            'is-right': this.align === 'right',
          }}
        >
          <slot />
        </div>
      </Host>
    )
  }
}

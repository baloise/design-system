import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { Loggable, Logger, LogInstance, ValidateEmptyOrOneOf, ValidateEmptyOrType, setupValidation } from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'

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

  @Element() el!: HTMLStencilElement

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop()
  @ValidateEmptyOrOneOf('left', 'center', 'right', '')
  readonly align?: DS.ButtonGroupAlignment

  /**
   * `auto` will position the button items vertical and full width.
   * `row` will force that the buttons are also horizontal on mobile.
   */
  @Prop()
  @ValidateEmptyOrOneOf('auto', 'row', 'column')
  readonly direction: DS.ButtonGroupDirection = 'auto'

  /**
   * If `true` the flex direction is used in reverse on mobile.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly reverse: boolean = false

  /**
   * If `true` the buttons will expand to fill the available space on mobile.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly wide: boolean = false

  connectedCallback(): void {
    setupValidation(this)
  }

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

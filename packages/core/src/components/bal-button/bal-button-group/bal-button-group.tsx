import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-button-group',
  styleUrl: 'bal-button-group.host.scss',
  shadow: true,
})
export class ButtonGroup implements ComponentInterface {
  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop({ reflect: true }) position?: BalProps.BalButtonGroupPosition

  /**
   * `auto` will position the button items vertical and full width.
   * `row` will force that the buttons are also horizontal on mobile.
   */
  @Prop({ reflect: true }) direction: BalProps.BalButtonGroupDirection = 'auto'

  /**
   * If `true` the flex direction is used in reverse on mobile.
   */
  @Prop({ reflect: true }) reverse = false

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
            'is-center': this.position === 'center',
            'is-right': this.position === 'right',
          }}
        >
          <slot />
        </div>
      </Host>
    )
  }
}

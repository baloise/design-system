import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-button-group',
  styleUrl: 'button-group.host.scss',
  shadow: true,
})
export class ButtonGroup implements ComponentInterface {
  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() align?: DS.ButtonGroupAlignment

  /**
   * `auto` will position the button items vertical and full width.
   * `row` will force that the buttons are also horizontal on mobile.
   */
  @Prop() direction: DS.ButtonGroupDirection = 'auto'

  /**
   * If `true` the flex direction is used in reverse on mobile.
   */
  @Prop() reverse = false

  /**
   * If `true` the buttons will expand to fill the available space on mobile.
   */
  @Prop() expanded = false

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
            'is-expanded': this.expanded,
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

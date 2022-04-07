import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { Props } from '../../props'

@Component({
  tag: 'bal-stage',
})
export class Stage implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Defines the background color of the stage section
   */
  @Prop() color: Props.BalStageColor = 'blue'

  /**
   * Defines the height of the stage section.
   */
  @Prop() size: Props.BalStageSize = ''

  /**
   * Defines the height of the stage section.
   */
  @Prop() rounded = false

  render() {
    return (
      <Host>
        <section
          class={{
            'hero': true,
            'has-background': true,
            'has-radius-large': this.rounded,
            'is-info': this.color === 'blue',
            [`is-${this.size}`]: this.size !== '',
            [`is-${this.color}`]: true,
          }}
        >
          <slot></slot>
        </section>
      </Host>
    )
  }
}

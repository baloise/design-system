import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-stage',
})
export class Stage implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Defines the background color of the stage section
   */
  @Prop() color: 'blue' | 'white' | 'purple' | 'green' | 'red' | 'yellow' = 'blue'

  /**
   * Defines the height of the stage section.
   */
  @Prop() size: 'small' | '' | 'medium' | 'large' | 'halfheight' | 'fullheight' = ''

  render() {
    return (
      <Host>
        <section
          class={{
            'hero': true,
            'has-background': true,
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

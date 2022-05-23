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
  @Prop() color: Props.BalStageColor = 'white'

  /**
   * If true the Baloise Shape is set
   */
  @Prop() hasShape?: boolean | undefined = undefined

  /**
   * sets text color to white for images and dark backgrounds (optional)
   */
  @Prop() inverted: undefined | boolean = undefined

  render() {
    return (
      <Host
        class={{
          'bal-stage': true,
        }}
      >
        <section
          class={{
            'bal-stage-content': true,
            [`bal-stage-content--is-${this.color}`]: true,
            'bal-stage-content--is-inverted': this.inverted === true || this.color === 'blue',
          }}
        >
          <slot></slot>
        </section>
        {this.hasShape && (
          <div class="bal-stage-shape container">
            <div>Shape Placeholder</div>
          </div>
        )}
      </Host>
    )
  }
}

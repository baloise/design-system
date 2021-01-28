import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-card-button',
  shadow: false,
  scoped: false,
})
export class CardButton {
  /**
   * Name of the icon like `edit`.
   */
  @Prop() icon = ''

  render() {
    return (
      <Host class="bal-card-button">
        <bal-button type="primary-light" expanded bottom-rounded icon={this.icon}>
          <slot></slot>
        </bal-button>
      </Host>
    )
  }
}

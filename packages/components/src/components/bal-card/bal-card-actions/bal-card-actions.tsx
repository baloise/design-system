import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-card-actions',
})
export class CardActions {
  /**
   * If `true` the buttons start form right to left.
   */
  @Prop()
  right = false

  render() {
    return (
      <Host class={['bal-card-actions', this.right ? 'is-right' : ''].join(' ')}>
        <slot></slot>
      </Host>
    )
  }
}

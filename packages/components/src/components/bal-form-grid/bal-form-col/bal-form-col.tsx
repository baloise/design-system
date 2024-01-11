import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { BalConfigObserver, BalConfigState } from '../../../interfaces'
import { ListenToConfig } from '../../../utils/config'

@Component({
  tag: 'bal-form-col',
})
export class FormCol implements ComponentInterface, BalConfigObserver {
  private colClass = 'col'

  @Element() el!: HTMLElement

  @Prop() size: BalProps.BalFormColSize = 'full'

  @ListenToConfig()
  configChanged(state: BalConfigState): void {
    this.colClass = state.cssUtilities === 'styles' ? 'col' : 'column'
  }

  render() {
    return (
      <Host
        class={{
          [`${this.colClass}`]: true,
          'py-none': true,
          'touch:is-12': this.colClass === 'col',
          'is-12-touch': this.colClass !== 'col',
          'is-12': this.size === 'full' || this.size === 'fullwidth' || this.size === undefined,
          'is-6': this.size === 'half',
          'is-4': this.size === 'one-third',
          'is-8': this.size === 'two-thirds',
          'is-3': this.size === 'one-quarter',
          'is-9': this.size === 'three-quarters',
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

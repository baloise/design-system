import { Component, h, ComponentInterface, Host } from '@stencil/core'
import { BalConfigObserver, BalConfigState } from '../../interfaces'
import { ListenToConfig } from '../../utils/config'

@Component({
  tag: 'bal-form-grid',
  styleUrl: 'bal-form-grid.sass',
})
export class FormGrid implements ComponentInterface, BalConfigObserver {
  private gridClass = 'grid'

  @ListenToConfig()
  configChanged(state: BalConfigState): void {
    this.gridClass = state.cssUtilities === 'styles' ? 'grid' : 'columns'
  }

  render() {
    return (
      <Host class={`bal-form-grid ${this.gridClass} is-multiline my-none py-none`}>
        <slot></slot>
      </Host>
    )
  }
}

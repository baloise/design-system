import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-table',
  styleUrl: 'bal-table.sass',
})
export class Table implements ComponentInterface {
  @Element() el!: HTMLStencilElement

  /**
   * If `true` the table has a full width
   */
  @Prop() expanded = false

  render() {
    const block = BEM.block('table')
    const fullwidthClass = 'is-fullwidth'
    const hasFullwidth = this.expanded

    return (
      <Host
        class={{
          ...block.class(),
          'ag-theme-alpine': true,
          ...block.modifier(fullwidthClass).class(hasFullwidth),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

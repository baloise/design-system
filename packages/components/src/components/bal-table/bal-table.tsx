import { Component, h, Prop, Host, ComponentInterface, Element } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-table',
})
export class Table implements ComponentInterface {
  @Element() el!: HTMLElement

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
          // 'is-fullwidth': this.expanded,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

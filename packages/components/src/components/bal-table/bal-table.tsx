import { Component, h, Prop, Host, ComponentInterface, Element } from '@stencil/core'

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
    return (
      <Host
        class={{
          'ag-theme-alpine': true,
          'is-fullwidth': this.expanded,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}

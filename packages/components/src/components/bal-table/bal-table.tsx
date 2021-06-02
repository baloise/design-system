import { Component, h, Prop, Host, ComponentInterface, Element } from '@stencil/core'

@Component({
  tag: 'bal-table',
  styleUrl: 'bal-table.scss',
  shadow: false,
  scoped: false,
})
export class Table implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * If `true` the table has a full width
   */
  @Prop() expanded: boolean = false

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

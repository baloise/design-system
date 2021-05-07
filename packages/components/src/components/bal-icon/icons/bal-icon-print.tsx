// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-print',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconPrint {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25"><g fill-rule="nonzero"><path d="M20.947 10.562v-1H23.5V19.5H.5V9.557h2.54v1H1.5V18.5h21v-7.938zM10.5 3.207L7.207 6.5H10.5V3.207zm1 4.293H4.793L11.5.793V7.5z"/><path d="M17.5 2.5h-6.483v-1H18.5v12h-13V7.025h1V12.5h11zM6.5 19.5v4h11v-4h-11zm12-1v6h-13v-6h13z"/><path d="M10.5 11v-1h5v1zM12.5 9V8h3v1z"/></g></svg>
      </Host>
    );
  }
}

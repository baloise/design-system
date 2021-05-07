// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-menu-bars',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconMenuBars {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M0 13.333h30v3.334H0v-3.334zm0 8.334h30V25H0v-3.333zM0 5h30v3.333H0V5z"/></svg>
      </Host>
    );
  }
}

// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-caret-right',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconCaretRight {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M23 15L8 30V0l15 15z"/></svg>
      </Host>
    );
  }
}

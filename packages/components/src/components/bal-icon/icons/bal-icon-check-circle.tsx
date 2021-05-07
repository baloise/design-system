// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-check-circle',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconCheckCircle {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 0C6.783 0 0 6.783 0 15c0 8.217 6.783 15 15 15 8.217 0 15-6.783 15-15 0-8.217-6.783-15-15-15zm-2.087 20.74L8.87 16.564l1.826-1.826 2.217 2.217 6.652-6.912 1.826 1.826-8.478 8.87z"/></svg>
      </Host>
    );
  }
}

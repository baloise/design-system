// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-logo',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconLogo {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.853l14.452 14.45 8.771-8.785-4.16-4.165-4.612 4.602-6.007-6 6.009-6.014 10.185 10.182h8.892V15.39h-6.104L14.452 2.4 0 16.853z"/></svg>
      </Host>
    );
  }
}

// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-download',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconDownload {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 22.526c-.158 0-.316 0-.474-.158l-7.894-7.42c-.158-.159-.316-.632-.158-.79a.868.868 0 01.79-.474h3.157V2.79c0-.473.316-.789.79-.789h7.894c.316 0 .632.316.632.79v10.736h3.158c.316 0 .631.158.79.474.157.316 0 .632-.159.79l-7.894 7.42c-.316.316-.474.316-.632.316zm-5.842-7.42L15 20.631l5.842-5.527h-1.895c-.473 0-.79-.316-.79-.79V3.58h-6.315v10.737c0 .473-.316.79-.79.79H9.159z"/><path d="M29.21 28.842H.79c-.474 0-.79-.316-.79-.79v-4.736c0-.474.316-.79.79-.79.473 0 .789.316.789.79v3.947H28.42v-3.947c0-.474.316-.79.79-.79.473 0 .789.316.789.79v4.737c0 .473-.316.79-.79.79z"/></svg>
      </Host>
    );
  }
}

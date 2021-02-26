// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-clock',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconClock {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 30C6.79 30 0 23.21 0 15S6.79 0 15 0s15 6.79 15 15-6.79 15-15 15zm0-28.421c-7.421 0-13.421 6-13.421 13.421 0 7.421 6 13.421 13.421 13.421 7.421 0 13.421-6 13.421-13.421 0-7.421-6-13.421-13.421-13.421z"/><path d="M21.129 22c-.159 0-.317 0-.476-.154l-6.336-5.538C14.158 16.154 14 16 14 15.692V8.77c0-.461.317-.769.792-.769.475 0 .792.308.792.77v6.615l6.178 5.23a.729.729 0 010 1.077c-.158.154-.317.308-.633.308z"/></svg>
      </Host>
    );
  }
}

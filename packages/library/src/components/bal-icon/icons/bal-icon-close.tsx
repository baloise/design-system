import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-close',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconClose {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><g clip-path="url(#clip0)"><path d="M30 2.877L27.123 0 15 12.123 2.877 0 0 2.877 12.123 15 0 27.123 2.877 30 15 17.877 27.123 30 30 27.123 17.877 15 30 2.877z"/></g><defs><clipPath id="clip0"><path d="M0 0h30v30H0z"/></clipPath></defs></svg>
      </Host>
    );
  }
}

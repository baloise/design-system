import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-nav-go-right',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconNavGoRight {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><g clip-path="url(#clip0)"><path d="M8.884 30L4 24.419 15.163 15 4.349 5.581 8.884 0l16.744 15L8.884 30z"/></g><defs><clipPath id="clip0"><path d="M0 0h30v30H0z"/></clipPath></defs></svg>
      </Host>
    );
  }
}

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-nav-go-up',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconNavGoUp {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><g clip-path="url(#clip0)"><path d="M24.419 25.628L15 14.465 5.581 25.28 0 20.744 15 4l15 16.744-5.581 4.884z"/></g><defs><clipPath id="clip0"><path d="M0 0h30v30H0z"/></clipPath></defs></svg>
      </Host>
    );
  }
}

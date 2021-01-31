import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-caret-down',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconCaretDown {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M0 8l15 15L30 8H0z"/></svg>
      </Host>
    );
  }
}

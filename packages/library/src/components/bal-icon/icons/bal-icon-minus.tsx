import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-minus',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconMinus {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M0 12h30v5.405H0V12z"/></svg>
      </Host>
    );
  }
}

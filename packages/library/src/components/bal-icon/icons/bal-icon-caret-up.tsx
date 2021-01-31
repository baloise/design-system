import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-caret-up',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconCaretUp {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 8l15 15H0L15 8z"/></svg>
      </Host>
    );
  }
}

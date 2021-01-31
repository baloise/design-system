import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-caret-left',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconCaretLeft {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M8 15L23 0v30L8 15z"/></svg>
      </Host>
    );
  }
}

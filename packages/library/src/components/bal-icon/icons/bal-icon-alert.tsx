import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-alert',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconAlert {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M12.043 19.826H17L18.044 0H11.26l.783 19.826zM11 26.348C11 28.174 12.565 30 14.652 30c1.826 0 3.652-1.565 3.652-3.652 0-1.826-1.565-3.652-3.652-3.652-2.087.26-3.652 1.826-3.652 3.652z"/></svg>
      </Host>
    );
  }
}

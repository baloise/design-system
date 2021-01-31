import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-copy',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconCopy {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M25.5 0H3.833C3.333 0 3 .333 3 .833v28.334c0 .5.333.833.833.833H15.5c.333 0 .667-.167.667-.5L26 19.833c.167-.166.167-.333.167-.666V.833C26.333.333 26 0 25.5 0zM4.667 1.667h20v16.666H15.5c-.5 0-.833.334-.833.834v9.166h-10V1.667zM23.5 20l-7.167 7.167V20H23.5z"/><path d="M12.167 12.5V9.167H15.5V7.5h-3.333V4.167H10.5V7.5H7.167v1.667H10.5V12.5h1.667z"/></svg>
      </Host>
    );
  }
}

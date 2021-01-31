import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-alert-circle',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconAlertCircle {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 0C6.724 0 0 6.724 0 15s6.724 15 15 15 15-6.724 15-15S23.276 0 15 0zm1.759 8.793l-.31 7.966h-1.966l-.414-7.966h2.69zM15.414 20.69c-.724 0-1.448-.621-1.448-1.449 0-.724.62-1.448 1.448-1.448.827 0 1.448.62 1.448 1.448-.103.828-.724 1.449-1.448 1.449z"/></svg>
      </Host>
    );
  }
}

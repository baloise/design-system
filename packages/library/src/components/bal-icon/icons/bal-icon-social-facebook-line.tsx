import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-social-facebook-line',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconSocialFacebookLine {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M16.5 25.2h-4.1c-.3 0-.5-.2-.5-.5v-9.3H10c-.3 0-.5-.2-.5-.5v-3.3c0-.3.2-.5.5-.5h1.9V9.9c0-1 .3-4.4 4.3-4.4h3.5c.3 0 .5.2.5.5v3.2c0 .3-.2.5-.5.5h-2.4c-.2 0-.3.1-.3.4v1.1h3c.1 0 .3.1.4.2.1.1.1.2.1.4l-.3 3.2c0 .3-.2.4-.5.4H17v9.3c0 .3-.2.5-.5.5zm-3.6-1H16v-9.3c0-.3.2-.5.5-.5h2.7l.2-2.3h-2.9c-.3 0-.5-.2-.5-.5V10c0-1 .7-1.4 1.3-1.4h1.9V6.5h-3c-2.9 0-3.3 2.1-3.3 3.4v1.7c0 .3-.2.5-.5.5h-1.9v2.3h1.9c.3 0 .5.2.5.5v9.3z"/></svg>
      </Host>
    );
  }
}

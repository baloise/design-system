import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-locate',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconLocate {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><g clip-path="url(#clip0)"><path d="M29.696.304c-.366-.367-.733-.367-1.1-.184L.55 14.785c-.367.184-.55.55-.55 1.1.183.367.55.733.917.733h12.465v12.465c0 .367.366.734.733.917h.183c.367 0 .733-.183.733-.55L29.697 1.404c.367-.367.184-.734 0-1.1zM15.215 25.417v-9.715c0-.55-.367-.917-.917-.917H4.583l22.18-11.548-11.548 22.18z"/></g><defs><clipPath id="clip0"><path d="M0 0h30v30H0z"/></clipPath></defs></svg>
      </Host>
    );
  }
}

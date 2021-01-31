import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-info-circle',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconInfoCircle {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 0C6.706 0 0 6.706 0 15s6.706 15 15 15 15-6.706 15-15S23.294 0 15 0zm1.412 22.059h-2.647V11.823h2.647V22.06zM15 10.589A1.582 1.582 0 0113.412 9c0-.882.706-1.588 1.588-1.588.882 0 1.588.706 1.588 1.588 0 .882-.706 1.588-1.588 1.588z"/></svg>
      </Host>
    );
  }
}

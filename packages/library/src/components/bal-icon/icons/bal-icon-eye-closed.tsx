// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-eye-closed',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconEyeClosed {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 9"><g fill-rule="nonzero"><path d="M1.357.5l-.714.7c6.747 6.872 13.094 6.872 18.744-.033l-.774-.633C13.353 6.96 7.701 6.96 1.357.5z"/><path d="M17.31 3.491a.5.5 0 11.667-.744l1.565 1.402a.5.5 0 11-.668.744L17.31 3.491zM13.867 5.821a.5.5 0 01.855-.518l1.09 1.798a.5.5 0 11-.856.518l-1.09-1.798zM5.359 5.11a.5.5 0 01.89.455l-.953 1.872a.5.5 0 11-.89-.454l.953-1.872zM9.763 6.391a.5.5 0 111 .049l-.102 2.1a.5.5 0 11-1-.049l.102-2.1zM1.955 2.794a.5.5 0 11.75.66L1.318 5.032a.5.5 0 01-.75-.66l1.388-1.578z"/></g></svg>
      </Host>
    );
  }
}

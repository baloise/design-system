// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-edit',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconEdit {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><g clip-path="url(#clip0)"><path d="M29.696 5.983L24.016.304a.98.98 0 00-1.419 0l-3.65 3.651L4.748 18.152s-.203.203-.203.406L.084 28.496c-.203.406 0 .812.203 1.217.203.203.405.203.811.203h.406l9.938-4.26c.203 0 .203-.202.406-.202L29.696 7.606c.405-.609.405-1.217 0-1.623zm-18.66 17.24l-4.259-4.26L19.555 6.187l4.259 4.26-12.778 12.777zm-5.273-2.637l3.65 3.651-6.287 2.637 2.637-6.288zm19.674-11.56l-4.26-4.26 2.231-2.23 4.26 4.258-2.232 2.231z"/></g><defs><clipPath id="clip0"><path d="M0 0h30v30H0z"/></clipPath></defs></svg>
      </Host>
    );
  }
}

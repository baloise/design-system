// generated file by .scripts/icons.script.js

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-answer',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconAnswer {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M23.731 14.284C17.761 9.209 8.806 9.209 4.925 9.507l5.374-5.97c.597-.597.597-1.492 0-2.09-.598-.596-1.493-.596-2.09 0L.448 10.404c-.597.597-.597 1.492 0 2.09l8.358 8.656c.298.299.597.597 1.194.597.299 0 .597 0 .896-.298.596-.597.596-1.493 0-2.09l-5.97-6.268c3.283-.299 11.94-.598 17.313 3.88 2.985 2.388 4.776 6.269 4.776 11.045 0 .895.597 1.492 1.492 1.492.896 0 1.493-.597 1.493-1.492-.597-6.269-2.388-10.746-6.269-13.731z"/></svg>
      </Host>
    );
  }
}

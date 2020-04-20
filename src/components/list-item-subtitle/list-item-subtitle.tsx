import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'bal-list-item-subtitle',
  styleUrl: 'list-item-subtitle.scss',
  scoped: false,
  shadow: false,
})
export class ListItemSubtitle {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

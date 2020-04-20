import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'bal-card-subtitle',
  styleUrl: 'card-subtitle.scss',
  shadow: false,
  scoped: false,
})
export class CardSubtitle {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

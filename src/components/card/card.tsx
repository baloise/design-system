import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'bal-card',
  styleUrl: 'card.scss',
  shadow: false,
  scoped: false,
})
export class BalCard {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

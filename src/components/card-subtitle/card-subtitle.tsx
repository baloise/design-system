import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'bal-card-subtitle',
  shadow: false,
  scoped: false,
})
export class CardSubtitle {

  render() {
    return (
      <Host class="bal-card-subtitle" role="heading">
        <slot></slot>
      </Host>
    );
  }

}

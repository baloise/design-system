import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'bal-hint-title',
  styleUrl: 'hint-title.scss',
  shadow: true,
})
export class HintTitle {

  render() {
    return (
      <Host>
        <h2 class="title is-size-2 has-text-white"><slot></slot></h2>
      </Host>
    );
  }

}

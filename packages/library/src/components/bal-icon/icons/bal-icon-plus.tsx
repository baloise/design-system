import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-plus',
  shadow: false,
  scoped: true,
})
export class IconPlus {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M16 14V9.4h-2V14H9.5v2H14v4.5h2V16h4.6v-2H16z"/></svg>
    );
  }
}

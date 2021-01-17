import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-nav-back',
  shadow: false,
  scoped: true,
})
export class IconNavBack {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M24 15H8.3l5.2-4.6-.7-.8-6.5 5.9 6.5 5.9.7-.8L8.3 16H24z"/></svg>
    );
  }
}

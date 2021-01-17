import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-alert',
  shadow: false,
  scoped: true,
})
export class IconAlert {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M14.4 16.6h1.9l.4-7.6h-2.6l.3 7.6zm-.4 2.5c0 .7.6 1.4 1.4 1.4.7 0 1.4-.6 1.4-1.4 0-.7-.6-1.4-1.4-1.4-.8.1-1.4.7-1.4 1.4z"/></svg>
    );
  }
}

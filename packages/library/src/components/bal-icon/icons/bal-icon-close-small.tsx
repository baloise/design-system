import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-close-small',
  shadow: false,
  scoped: true,
})
export class IconCloseSmall {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M19.6 11.8l-1.4-1.4-3.2 3.2-3.2-3.2-1.4 1.4 3.2 3.2-3.2 3.2 1.4 1.4 3.2-3.2 3.2 3.2 1.4-1.4-3.2-3.2z"/></svg>
    );
  }
}

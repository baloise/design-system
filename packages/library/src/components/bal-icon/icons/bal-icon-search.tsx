import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-search',
  shadow: false,
  scoped: true,
})
export class IconSearch {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M22.4 21l-4.8-4.8c.6-.9 1-2 1-3.2 0-3.1-2.5-5.7-5.7-5.7-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 1.2 0 2.3-.4 3.2-1l4.8 4.8c.2.2.5.3.7.3s.5-.1.7-.3c.5-.5.5-1.1.1-1.5zM9.3 13c0-2 1.6-3.7 3.7-3.7 2 0 3.7 1.6 3.7 3.7 0 2-1.6 3.7-3.7 3.7-2.1-.1-3.7-1.7-3.7-3.7z"/></svg>
    );
  }
}

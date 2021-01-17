import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-nav-success',
  shadow: false,
  scoped: true,
})
export class IconNavSuccess {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 3.5C8.7 3.5 3.5 8.7 3.5 15S8.7 26.5 15 26.5 26.5 21.3 26.5 15 21.3 3.5 15 3.5zm-1.6 15.9l-3.1-3.2 1.4-1.4 1.7 1.7 5.1-5.3 1.4 1.4-6.5 6.8z"/></svg>
    );
  }
}

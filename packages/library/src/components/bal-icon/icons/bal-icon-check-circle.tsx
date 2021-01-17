import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-check-circle',
  shadow: false,
  scoped: true,
})
export class IconCheckCircle {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 .5C7 .5.5 7 .5 15S7 29.5 15 29.5 29.5 23 29.5 15 23 .5 15 .5zm-1.6 18.9l-3.1-3.2 1.4-1.4 1.7 1.7 5.1-5.3 1.4 1.4-6.5 6.8z"/></svg>
    );
  }
}

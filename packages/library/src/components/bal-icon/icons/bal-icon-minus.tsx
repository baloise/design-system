import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-minus',
  shadow: false,
  scoped: true,
})
export class IconMinus {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M0 12h30v5.405H0V12z"/></svg>
    );
  }
}

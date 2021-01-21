import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-caret-right',
  shadow: false,
  scoped: true,
})
export class IconCaretRight {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M23 15L8 30V0l15 15z"/></svg>
    );
  }
}

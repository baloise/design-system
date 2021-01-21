import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-caret-left',
  shadow: false,
  scoped: true,
})
export class IconCaretLeft {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M8 15L23 0v30L8 15z"/></svg>
    );
  }
}

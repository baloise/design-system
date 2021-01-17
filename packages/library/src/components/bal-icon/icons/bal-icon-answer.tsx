import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-answer',
  shadow: false,
  scoped: true,
})
export class IconAnswer {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M18.7 15.3c-2-1.7-5-1.7-6.3-1.6l1.8-2c.2-.2.2-.5 0-.7-.2-.2-.5-.2-.7 0l-2.6 3c-.2.2-.2.5 0 .7l2.8 2.9c.1.1.2.2.4.2.1 0 .2 0 .3-.1.2-.2.2-.5 0-.7l-2-2.1c1.1-.1 4-.2 5.8 1.3 1 .8 1.6 2.1 1.6 3.7 0 .3.2.5.5.5s.5-.2.5-.5c-.2-2.1-.8-3.6-2.1-4.6z"/></svg>
    );
  }
}

import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-document',
  shadow: false,
  scoped: true,
})
export class IconDocument {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M26.167 10.167L16.333.5C16.167.167 16 0 15.667 0H3.833C3.333 0 3 .333 3 .833v28.334c0 .5.333.833.833.833H25.5c.5 0 .833-.333.833-.833v-18.5c0-.167-.166-.334-.166-.5zm-9.834-7.334L23.5 10h-7.167V2.833zm-11.666 25.5V1.667h10v9.166c0 .5.333.834.833.834h9.167v16.666h-20z"/></svg>
    );
  }
}

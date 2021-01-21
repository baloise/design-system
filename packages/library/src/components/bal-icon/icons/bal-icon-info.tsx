import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-info',
  shadow: false,
  scoped: true,
})
export class IconInfo {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><g clip-path="url(#clip0)"><path d="M15.253 6.506a3.24 3.24 0 003.253-3.253A3.24 3.24 0 0015.253 0 3.24 3.24 0 0012 3.253a3.24 3.24 0 003.253 3.253zM12.361 30h5.422V9.036h-5.422V30z"/></g><defs><clipPath id="clip0"><path d="M0 0h30v30H0z"/></clipPath></defs></svg>
    );
  }
}

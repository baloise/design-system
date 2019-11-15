import {Component, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'bal-badge',
  styleUrl: 'bal-badge.scss',
  shadow: true
})
export class BalBadge {
  /**
   * The theme type of the badge. Given by bulma our css framework.
   */
  @Prop() type:
    | "is-primary"
    | "is-info"
    | "is-success"
    | "is-warning"
    | "is-danger"
    | "is-light" = "is-light";

  render() {
    return (
      <Host>
        <span class={`tag ${this.type}`}><slot/></span>
      </Host>
    );
  }

}

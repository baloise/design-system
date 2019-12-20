import {Component, Host, h, Prop, State, Watch} from '@stencil/core';

@Component({
  tag: 'bal-accordion',
  shadow: true
})
export class BalAccordion {

  @Prop() type:
    | "is-primary"
    | "is-info" = "is-primary";
  /**
   * Controls if the accordion is collapsed or not
   */
  @Prop() collapsed: boolean = true;
  @Watch("collapsed")
  validateCollapsed(newValue: boolean) {
    this.isCollapsed = newValue;
  }

  @State() isCollapsed: boolean = true;

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  };

  componentWillLoad(){
    this.isCollapsed = this.collapsed;
  }

  render() {
    return (
      <Host class="accordion">
        <bal-button fullwidth={true}
                    light={true}
                    inverted={true}
                    type={this.type}
                    onClick={() => this.toggleCollapsed()}>test</bal-button>
        { this.isCollapsed ? undefined : <slot></slot> }
      </Host>
    );
  }

}

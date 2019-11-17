import {Component, Host, h, Prop, Method, Element, State} from "@stencil/core";

@Component({
  tag: "bal-toast",
  styleUrl: "bal-toast.scss",
  shadow: true,
})
export class BalToast {
  @State() animationClass = "fadeInDown";
  @Element() element: HTMLBalToastElement;

  /**
   * Message text
   */
  @Prop() message: string;

  /**
   * The theme type of the toast. Given by bulma our css framework.
   */
  @Prop() type:
    | "is-primary"
    | "is-info"
    | "is-success"
    | "is-warning"
    | "is-danger" = "is-primary";

  /**
   * Closes this toast
   */
  @Method()
  async close(): Promise<void> {
    this.animationClass = "fadeOut";
    setTimeout(() => {
      this.element.remove();
    }, 150);
  }

  render() {
    return (
      <Host>
        <div role="alert" class={`toast ${this.animationClass} ${this.type}`}>
          {this.message}
        </div>
      </Host>
    );
  }

}

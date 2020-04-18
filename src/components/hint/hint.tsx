import {
  Component,
  Host,
  h,
  Method,
  State,
  Prop,
  Element,
  Listen,
} from "@stencil/core"

@Component({
  tag: "bal-hint",
  styleUrl: "hint.scss",
  shadow: true,
})
export class Hint {
  @Element() element!: HTMLElement
  @State() isActive = false

  /**
   * Text for the close button.
   */
  @Prop()
  closeLabel = "Close"

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop()
  disabled = false

  @Listen("keyup", { target: "document" })
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault()
      this.close()
    }
  }

  @Listen("click", { target: "document" })
  clickOnOutside(event: UIEvent) {
    if (!this.element.contains(event.target as any) && this.isActive) {
      this.toggle()
    }
  }

  /**
   * Toggles the hint box.
   */
  @Method()
  async toggle(): Promise<void> {
    this.isActive = !this.isActive
  }

  /**
   * Opens the hint box.
   */
  @Method()
  async open(): Promise<void> {
    this.isActive = true
  }

  /**
   * Closes the hint box.
   */
  @Method()
  async close(): Promise<void> {
    this.isActive = false
  }

  render() {
    return (
      <Host>
        <bal-icon
          size="medium"
          name="info-circle"
          onClick={() => this.toggle()}
        ></bal-icon>

        {this.isActive ? (
          <div class="hint-content">
            <slot></slot>

            <div class="buttons is-row-reverse">
              <bal-button
                type="is-info"
                outlined
                inverted
                onClick={() => this.close()}
              >
                {this.closeLabel}
              </bal-button>
            </div>
          </div>
        ) : (
          ""
        )}
      </Host>
    )
  }
}

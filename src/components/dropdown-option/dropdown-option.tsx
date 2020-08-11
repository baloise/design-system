import {
  Component,
  Host,
  h,
  Element,
  Prop,
  State,
  Watch,
  Method,
} from "@stencil/core"
import { Components } from "../../components"
import { Option } from "./dropdown-option.types"

@Component({
  tag: "bal-dropdown-option",
  styleUrl: "dropdown-option.scss",
  shadow: true,
})
export class DropdownOption {
  @Element() element!: HTMLElement
  labelElement!: HTMLSpanElement

  @State() hidden = false

  /**
   * The value of the dropdown item. This value will be returned by the parent <bal-dropdown> element.
   */
  @Prop() value: string | boolean | number | any = false

  /**
   * The value of the dropdown item. This value will be returned by the parent <bal-dropdown> element.
   */
  @Prop() label = ""

  @Prop() icon = ""
  @Prop() checkbox = false
  @Prop() focused = false
  @Prop() selected = false
  @Prop() highlight = ""

  @Watch("highlight")
  highlightChanged() {
    this.updateLabel()
  }

  @Method()
  async isHidden(): Promise<boolean> {
    return this.hidden
  }

  componentDidLoad() {
    this.updateLabel()
  }

  get parent(): Components.BalDropdown {
    if ((this.element.parentNode as any).tagName === "DIV") {
      // IE11 doesn't allow shadowing so we have tho navigate the dom up to the parent element.
      try {
        return this.element.parentNode.parentNode.parentNode.parentNode as any
      } catch (e) {
        // Do nothing
      }
    }
    return this.element.parentNode as any
  }

  updateLabel() {
    if (this.highlight.length > 0) {
      const index = this.label
        .toLowerCase()
        .indexOf(this.highlight.toLowerCase())
      this.hidden = index < 0
      if (index >= 0) {
        this.labelElement.innerHTML =
          this.label.substring(0, index) +
          "<span class='highlight'>" +
          this.label.substring(index, index + this.highlight.length) +
          "</span>" +
          this.label.substring(index + this.highlight.length, this.label.length)
      }
    } else {
      this.hidden = false
      this.labelElement.innerHTML = this.label
    }
  }

  async select() {
    const option: Option<any> = {
      label: this.label,
      value: this.value,
    }
    await this.parent.select(option)
  }

  render() {
    return (
      <Host>
        <button
          class={[
            "dropdown-item",
            this.selected ? "is-selected" : "",
            this.focused ? "is-focused" : "",
            this.hidden ? "is-hidden" : "",
            this.icon ? "has-icon" : "",
            this.checkbox ? "has-checkbox" : "",
          ].join(" ")}
          tabIndex={-1}
          onClick={this.select.bind(this)}
        >
          <span
            class="checkbox"
            style={{ display: this.checkbox ? "flex" : "none" }}
          >
            <div class="bal-checkbox">
              <input
                type="checkbox"
                checked={this.selected}
                tabIndex={-1}
              />
              <label></label>
            </div>
          </span>
          <span
            class="icon"
            style={{ display: this.icon.length === 0 ? "none" : "flex" }}
          >
            <bal-icon name={this.icon} size="medium"></bal-icon>
          </span>
          <span
            class="label"
            ref={(el) => (this.labelElement = el as HTMLSpanElement)}
          >
            <slot />
          </span>
        </button>
      </Host>
    )
  }
}

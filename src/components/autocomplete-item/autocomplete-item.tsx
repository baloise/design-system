import {Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch} from "@stencil/core";
import {Components} from "../../components";

@Component({
  tag: "bal-autocomplete-item",
  styleUrl: "autocomplete-item.scss",
  shadow: true,
})
export class AutocompleteItem {
  @Element() element!: HTMLElement;

  labelElement!: HTMLSpanElement;
  displayed = false;

  @State() hidden = true;

  /**
   * Value of this item, which is also use as a label
   */
  @Prop() value = "";

  /**
   * Highlights the given text in the value.
   */
  @Prop() activated = false;

  /**
   * Highlights the given text in the value.
   */
  @Prop() highlightedValue = "";

  @Watch("highlightedValue")
  searchValueChanged(newHighlightedValue: string) {
    const index = this.value.toLowerCase().indexOf(newHighlightedValue.toLowerCase());
    this.hidden = index < 0;
    if (index >= 0) {
      this.labelElement.innerHTML = this.value.substring(0, index)
        + "<span class='highlight'>"
        + this.value.substring(index, index + newHighlightedValue.length)
        + "</span>"
        + this.value.substring(index + newHighlightedValue.length, this.value.length);
      this.displayed = true;
    } else {
      this.displayed = false;
    }
  }

  /**
   * Click event of the dropdown item.
   */
  @Event() balClick: EventEmitter;

  /**
   * Tell's if the item is highlighted by the search term.
   */
  @Method()
  async isDisplayed(): Promise<boolean> {
    return this.displayed;
  }

  /**
   * Tell's if the item is activated by selection.
   */
  @Method()
  async isActive(): Promise<boolean> {
    return this.activated;
  }

  /**
   * Tell's if the item is activated by selection.
   */
  @Method()
  async isHidden(): Promise<boolean> {
    return this.hidden;
  }

  get parent(): Components.BalAutocomplete {
    return this.element.parentNode as any;
  }

  async selectItem() {
    await this.parent.selectItem(this.value);
    this.balClick.emit(this.value);
  }

  render() {
    return (
      <Host>
        <button class={[
          "dropdown-item",
          this.hidden ? "is-hidden" : "",
          this.activated ? "is-active" : "",
        ].join(" ")}
                onClick={() => this.selectItem()}>
          <span ref={el => this.labelElement = el as HTMLSpanElement}>
            {this.value}
          </span>
        </button>
      </Host>
    );
  }

}

import {Component, Host, h, Prop, Element, Event, EventEmitter, State, Listen} from "@stencil/core";
import {Components} from "../../components";
import {DropDownOption} from "../bal-dropdown/bal-dropdown";

@Component({
  tag: "bal-dropdown-item",
  styleUrl: "bal-dropdown-item.scss",
  shadow: true,
})
export class BalDropdownItem {
  @Element() element!: HTMLElement;

  @State() isActive = false;

  /**
   * The value of the dropdown item. This value will be returned by the parent <bal-dropdown> element.
   */
  @Prop() value: string | boolean | number | object = false;

  /**
   * Click event of the dropdown item.
   */
  @Event() clickEvent: EventEmitter;

  componentDidLoad() {
    this.checkActiveState();
  }

  @Listen("dropdownSelected", {target: "document"})
  async isActiveHandler(event: CustomEvent) {
    if ((event.target as Node).isEqualNode(this.parent as any)) {
      this.checkActiveState();
    }
  }

  @Listen("selectDropdownItem", {target: "document"})
  async isSelectedHandler(event: CustomEvent) {
    if ((event.target as Node).isEqualNode(this.parent as any)) {
      this.checkSelection(event.detail);
    }
  }

  get parent(): Components.BalDropdown {
    return this.element.parentNode as any;
  }

  async checkSelection(value: any) {
    if (this.value === value) {
      this.selectItem();
    }
  }

  async checkActiveState() {
    const selectedValue = await this.parent.getSelectedValue();
    if (selectedValue === null) {
      this.isActive = false;
    } else {
      this.isActive = this.value === selectedValue;
    }
  }

  selectItem() {
    const slotted = this.element.shadowRoot.querySelector("slot") as HTMLSlotElement;
    const label = slotted.assignedNodes()
      .map((node: any) => (node.nodeValue) ? node.nodeValue : node.outerHTML)
      .join("");
    const dropdownEventDetails: DropDownOption = {
      label,
      value: this.value,
    };
    this.parent.selectItem(dropdownEventDetails);
    this.clickEvent.emit(dropdownEventDetails);
  }

  render() {
    return (
      <Host>
        <button class={this.isActive ? "dropdown-item is-active" : "dropdown-item"}
                onClick={() => this.selectItem()}>
          <slot/>
        </button>
      </Host>
    );
  }

}

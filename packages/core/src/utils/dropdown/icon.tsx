import { h } from '@stencil/core'
import { BEM } from '../bem'
import { DropdownComponent } from './component'

export class DropdownIconUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  render() {
    const block = BEM.block('dropdown')

    if (this.component.loading) {
      return <bal-spinner small variation="circle"></bal-spinner>
    } else if (this.component.clearable && this.component.isFilled && !this.component.isDisabled) {
      return (
        <button
          class={{
            ...block.element('clear').class(),
            ...block.element('clear').modifier('invalid').class(this.component.invalid),
          }}
        >
          <bal-icon name={'close-circle'} size="" color={'grey'}></bal-icon>
        </button>
      )
    } else {
      return (
        <bal-icon
          name={this.component.icon}
          turn={this.component.isExpanded}
          color={this.component.isDisabled ? 'grey' : this.component.invalid ? 'danger' : 'primary'}
        ></bal-icon>
      )
    }
  }
}

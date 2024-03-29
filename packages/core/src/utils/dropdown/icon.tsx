import { h } from '@stencil/core'
import { BEM } from '../bem'
import { DropdownComponent } from './component'
import { BalLanguage } from '../config'
import { i18nBalDropdown } from './dropdown.i18n'

export class DropdownIconUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  render(language: BalLanguage) {
    const block = BEM.block('dropdown')

    if (this.component.loading) {
      return <bal-spinner small variation="circle"></bal-spinner>
    } else if (
      this.component.clearable &&
      this.component.valueUtil.isFilled() &&
      !this.component.valueUtil.isDisabled()
    ) {
      return (
        <button
          title={i18nBalDropdown[language].clearable}
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
          color={this.component.valueUtil.isDisabled() ? 'grey' : this.component.invalid ? 'danger' : 'primary'}
        ></bal-icon>
      )
    }
  }
}

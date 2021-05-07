/// <reference types="cypress" />

import { Attributable } from '../mixins/attributable'
import { Clickable } from '../mixins/clickable'
import { Containable } from '../mixins/containable'
import { Disableable } from '../mixins/disableable'
import { Accessor, createAccessor, Mixin, MixinContext } from '../mixins/mixins'
import { NthSelectable } from '../mixins/nthSelectable'
import { Selectable } from '../mixins/selectable'
import { Shouldable } from '../mixins/shouldable'
import { Urlable } from '../mixins/urlable'
import { Visible } from '../mixins/visible'
import { Waitable } from '../mixins/waitable'

interface DropdownAccessorType
  extends Clickable<DropdownAccessorType>,
    Selectable<DropdownAccessorType>,
    Disableable<DropdownAccessorType>,
    Containable<DropdownAccessorType>,
    Shouldable<DropdownAccessorType>,
    Visible<DropdownAccessorType>,
    NthSelectable<DropdownAccessorType>,
    Attributable<DropdownAccessorType>,
    Urlable<DropdownAccessorType>,
    Waitable<DropdownAccessorType> {
  assertOptions(...options: string[]): DropdownAccessorType
}

export const DropdownClickableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Clicks the dropdown
   */
  click: (options?: Partial<Cypress.ClickOptions>) => {
    const button = cy.get(selector).find('button')
    button.click(options)
    return creator()
  },
})

/**
 * DropdownAccessor is a helper object for E-2-E testing.
 * It maps the dropdown behaviour to the `bal-dropdown` ui component.
 *
 * ```typescript
 * import { dataTestSelector, DropdownAccessor } from '@baloise/design-system-components-testing'
 *
 * describe('Dropdown', () => {
 *   it('should ...', () => {
 *      const dropdown = DropdownAccessor(dataTestSelector('dropdown-id')).get()
 *      dropdown.click()
 *  })
 * })
 * ```
 */
export const DropdownAccessor: Accessor<DropdownAccessorType> = createAccessor<DropdownAccessorType>(
  DropdownClickableMixin,
)

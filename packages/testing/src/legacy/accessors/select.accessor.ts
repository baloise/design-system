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

interface SelectAccessorType
  extends Clickable<SelectAccessorType>,
    Selectable<SelectAccessorType>,
    Disableable<SelectAccessorType>,
    Containable<SelectAccessorType>,
    Shouldable<SelectAccessorType>,
    Visible<SelectAccessorType>,
    NthSelectable<SelectAccessorType>,
    Attributable<SelectAccessorType>,
    Urlable<SelectAccessorType>,
    Waitable<SelectAccessorType> {
  assertOptions(...options: string[]): SelectAccessorType
}

export const SelectClickableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Clicks the input
   */
  click: (options?: Partial<Cypress.ClickOptions>) => {
    cy.get(selector).click(options)
    return creator()
  },
})

export const SelectSelectableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Selects dropdown item
   */
  select: (index: number) => {
    cy.get(selector).balSelectFindOptions().eq(index).click()
    return creator()
  },
})

export const SelectAssertableOptionsMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Checks the options
   */
  assertOptions: (...options: string[]) => {
    cy.get(selector).balSelectShouldHaveOptions(options, 'value')
    return creator()
  },
})

export const SelectContainableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Checks if input have a content
   */
  contains: (content: string | number | RegExp) => {
    cy.get(selector).contains(content)
    return creator()
  },
})

/**
 * SelectAccessor is a helper object for E-2-E testing.
 * It maps the select behaviour to the `bal-select` ui component.
 *
 * ```typescript
 * import { dataTestSelector, SelectAccessor } from '@baloise/design-system-components-testing'
 *
 * describe('Select', () => {
 *   it('should ...', () => {
 *      const select = SelectAccessor(dataTestSelector('select-id')).get()
 *      select.click()
 *      select.select(1)
 *      select.contains('value')
 *  })
 * })
 * ```
 */
export const SelectAccessor: Accessor<SelectAccessorType> = createAccessor<SelectAccessorType>(
  SelectClickableMixin,
  SelectSelectableMixin,
  SelectAssertableOptionsMixin,
  SelectContainableMixin,
)

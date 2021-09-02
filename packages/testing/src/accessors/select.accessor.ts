/// <reference types="cypress" />

import { Attributable } from '../mixins/attributable'
import { Clearable } from '../mixins/clearable'
import { Clickable } from '../mixins/clickable'
import { Containable } from '../mixins/containable'
import { Disableable } from '../mixins/disableable'
import { Accessor, createAccessor, Mixin, MixinContext } from '../mixins/mixins'
import { NthSelectable } from '../mixins/nthSelectable'
import { Selectable } from '../mixins/selectable'
import { Shouldable } from '../mixins/shouldable'
import { Typeable } from '../mixins/typeable'
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
    Waitable<SelectAccessorType>,
    Typeable<SelectAccessorType>,
    Clearable<SelectAccessorType> {
  assertOptions(...options: string[]): SelectAccessorType
}

export const SelectClickableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Clicks the input
   */
  click: (options?: Partial<Cypress.ClickOptions>) => {
    const button = element().find('.dropdown-trigger .input')
    button.click(options)
    return creator()
  },
})

export const SelectSelectableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Selects dropdown item
   */
  select: (index: number) => {
    element().within(() => {
      cy.get(`button.dropdown-item`).eq(index).click()
    })
    return creator()
  },
  /**
   * adsfa
   */
  assertIsSelected: (indexes: number | number[]) => {
    if (!Array.isArray(indexes)) {
      indexes = [indexes]
    }
    element().within(() => {
      for (let n = 0; n < (indexes as number[]).length; n++) {
        const index = indexes[n]
        cy.get(`button.dropdown-item`).eq(index).should('have.class', 'is-selected')
      }
    })
    return creator()
  },
})

export const SelectAssertableOptionsMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Checks the options
   */
  assertOptions: (...options: string[]) => {
    element().within(() => {
      cy.get('bal-select-option').then(opt => {
        // @ts-ignore
        const actual = [...opt.toArray()].map(o => o.value)
        expect(actual).to.deep.eq(options)
      })
    })
    return creator()
  },
})

export const SelectContainableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Checks if input have a content
   */
  contains: (content: string | number | RegExp) => {
    element().find('.dropdown-trigger .input').should('have.value', content)
    return creator()
  },
})

export const SelectTypeableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Checks if input have a content
   */
  type: (text: string, options?: Partial<Cypress.TypeOptions>) => {
    element().find('.dropdown-trigger .input').type(text, options)
    return creator()
  },
})

export const SelectClearMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Checks if input have a content
   */
  clear: (options?: Partial<Cypress.ClearOptions>) => {
    element().invoke('val', '')
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
  SelectTypeableMixin,
  SelectClearMixin,
)

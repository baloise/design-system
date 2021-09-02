/// <reference types="cypress" />

import { Attributable, AttributableMixin } from '../mixins/attributable'
import { Clickable } from '../mixins/clickable'
import { Containable } from '../mixins/containable'
import { Disableable, DisableableMixin } from '../mixins/disableable'
import { Accessor, createAccessor, Mixin, MixinContext } from '../mixins/mixins'
import { NthSelectable, NthSelectableMixin } from '../mixins/nthSelectable'
import { Selectable } from '../mixins/selectable'
import { Shouldable, ShouldableMixin } from '../mixins/shouldable'
import { Urlable, UrlableMixin } from '../mixins/urlable'
import { Visible, VisibleMixin } from '../mixins/visible'
import { Waitable, WaitableMixin } from '../mixins/waitable'
import { Andable, AndableMixin } from '../mixins/andable'
import { Blurable, BlurableMixin } from '../mixins/blurable'
import { Findable, FindableMixin } from '../mixins/findable'
import { Existable, ExistableMixin } from '../mixins/existable'
import { Thenable, ThenableMixin } from '../mixins/thenable'
import { Invokable, InvokableMixin } from '../mixins/invokable'
import { Lengthable, LengthableMixin } from '../mixins/lengthable'
import { Eachable, EachableMixin } from '../mixins/eachable'

interface DropdownAccessorType
  extends Andable<DropdownAccessorType>,
    Blurable<DropdownAccessorType>,
    Clickable<DropdownAccessorType>,
    Selectable<DropdownAccessorType>,
    Disableable<DropdownAccessorType>,
    Containable<DropdownAccessorType>,
    Shouldable<DropdownAccessorType>,
    Visible<DropdownAccessorType>,
    NthSelectable<DropdownAccessorType>,
    Attributable<DropdownAccessorType>,
    Urlable<DropdownAccessorType>,
    Findable<DropdownAccessorType>,
    Waitable<DropdownAccessorType>,
    Existable<DropdownAccessorType>,
    Invokable<DropdownAccessorType>,
    Thenable<DropdownAccessorType>,
    Lengthable<DropdownAccessorType>,
    Eachable<DropdownAccessorType> {
  assertOptions(...options: string[]): DropdownAccessorType
}

export const DropdownClickableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Clicks the dropdown.
   */
  click: (options?: Partial<Cypress.ClickOptions>) => {
    const button = element().find('button')
    button.click(options)
    return creator()
  },
})
/**
 * Selects dropdown option.
 */
export const DropDownSelectableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  select: (index: number) => {
    element().within(() => {
      cy.get(`button.dropdown-item`).eq(index).click()
    })
    return creator()
  },
  assertIsSelected: () => {
    throw new Error('Please use contains method')
  },
})
/**
 * Selects dropdown sibling option.
 */
export function SiblingDropDownSelectableMixin(siblingSelector: string): Mixin {
  return <T>({ element, creator }: MixinContext<T>) => ({
    select: (index: number) => {
      element()
        .next(siblingSelector)
        .within(() => {
          cy.get(`button.dropdown-item`).eq(index).click()
        })
      return creator()
    },
    assertIsSelected: () => {
      throw new Error('Please use contains method')
    },
  })
}
/**
 * Asserts dropdown option.
 */
export const DropDownAssertableOptionsMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  assertOptions: (...options: string[]) => {
    element().within(() => {
      cy.get('.dropdown-item').then(opt => {
        const actual = [...opt.toArray()].map(o => o.textContent)
        expect(actual).to.deep.eq(options)
      })
    })
    return creator()
  },
})
/**
 * Asserts dropdown sibling option.
 */
export const SiblingDropDownAssertableOptionsMixin: Mixin = <T>({ element, selector, creator }: MixinContext<T>) => ({
  assertOptions: (...options: string[]) => {
    element()
      .next(selector)
      .within(() => {
        cy.get('.dropdown-item').then(opt => {
          const actual = [...opt.toArray()].map(o => o.textContent)
          expect(actual).to.deep.eq(options)
        })
      })
    return creator()
  },
})
/**
 * Asserts dropdown containing something.
 */
export const DropDownContainableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  contains: (content: string | number | RegExp) => {
    element().find('button.dropdown-button').should('contain', content)
    return creator()
  },
})
/**
 * Asserts dropdown sibling containing something.
 */
export function SiblingDropDownContainableMixin(siblingSelector: string): Mixin {
  return <T>({ element, creator }: MixinContext<T>) => ({
    contains: (content: string | number | RegExp) => {
      element()
        .next(siblingSelector)
        .within(() => {
          cy.get('button.dropdown-button').should('contain', content)
        })
      return creator()
    },
  })
}

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
  AndableMixin,
  BlurableMixin,
  DropDownSelectableMixin,
  DropDownContainableMixin,
  DropDownAssertableOptionsMixin,
  DisableableMixin,
  ShouldableMixin,
  VisibleMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  FindableMixin,
  WaitableMixin,
  ExistableMixin,
  ThenableMixin,
  InvokableMixin,
  LengthableMixin,
  EachableMixin,
)

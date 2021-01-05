/// <reference types="cypress" />
import {
  Accessor,
  createAccessor,
  Mixin,
  MixinContext,
  Clickable,
  Containable,
  Existable,
  ExistableMixin,
  NthSelectable,
  NthSelectableMixin,
  Shouldable,
  ShouldableMixin,
  Visible,
  VisibleMixin,
  ClickableMixin,
  Attributable,
  Urlable,
  Waitable,
  AttributableMixin, UrlableMixin, WaitableMixin,
} from '../mixins'

interface AccordionAccessorType
  extends Clickable<AccordionAccessorType>,
    Existable<AccordionAccessorType>,
    Shouldable<AccordionAccessorType>,
    Containable<AccordionAccessorType>,
    Visible<AccordionAccessorType>,
    NthSelectable<AccordionAccessorType>,
    Attributable<AccordionAccessorType>,
    Urlable<AccordionAccessorType>,
    Waitable<AccordionAccessorType> {
  assertBodyExists(): AccordionAccessorType;
  assertBodyNotExists(): AccordionAccessorType;
}

export const AccordionClickableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Toggle the accordion
   */
  click: (options?: Partial<Cypress.ClickOptions>) => {
    cy.get(selector).find('.sc-bal-accordion > button').click(options)
    return creator()
  },
})


export const AccordionContainableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * It checks that the accordion label contains the given texts
   */
  contains: (content: string) => {
    cy.get(selector).find('.trigger-label > .label').contains(content)
    return creator()
  },
})

export const AccordionAssertableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Asserts that accordion is open
   */
  assertBodyExists: () => {
    cy.get(selector).should('have.attr', 'is-active')
    return creator()
  },
  /**
   * Asserts that accordion is closed
   */
  assertBodyNotExists: () => {
    cy.get(selector).should('not.have.attr', 'is-active')
    return creator()
  },
})

/**
 * AccordionAccessor is a helper object for E-2-E testing.
 * It maps the accordion behaviour to the `bal-accordion` ui component.
 *
 * ```typescript
 * import { dataTestSelector, AccordionAccessor } from '@baloise/ui-library-testing'
 *
 * describe('Accordion', () => {
 *   it('should ...', () => {
 *      const accordion = AccordionAccessor(dataTestSelector('accordion-id')).get()
 *      accordion.click()
 *      accordion.assertBodyExists()
 *      accordion.contains('Label')
 *  })
 * })
 * ```
 */
export const AccordionAccessor: Accessor<AccordionAccessorType> = createAccessor<AccordionAccessorType>(
  ClickableMixin,
  ExistableMixin,
  ShouldableMixin,
  AccordionClickableMixin,
  AccordionContainableMixin,
  AccordionAssertableMixin,
  VisibleMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
)

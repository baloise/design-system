/// <reference types="cypress" />

import { Attributable, AttributableMixin } from '../mixins/attributable'
import { Clickable, ClickableMixin } from '../mixins/clickable'
import { Containable } from '../mixins/containable'
import { Existable, ExistableMixin } from '../mixins/existable'
import { Accessor, createAccessor, Mixin, MixinContext } from '../mixins/mixins'
import { NthSelectable, NthSelectableMixin } from '../mixins/nthSelectable'
import { Shouldable, ShouldableMixin } from '../mixins/shouldable'
import { Urlable, UrlableMixin } from '../mixins/urlable'
import { Visible, VisibleMixin } from '../mixins/visible'
import { Waitable, WaitableMixin } from '../mixins/waitable'

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
  assertBodyExists(): AccordionAccessorType
  assertBodyNotExists(): AccordionAccessorType
}

export const AccordionClickableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Toggle the accordion
   */
  click: (options?: Partial<Cypress.ClickOptions>) => {
    cy.get(selector).find('bal-button > button').click(options)
    return creator()
  },
})

export const AccordionContainableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * It checks that the accordion label contains the given texts
   */
  contains: (content: string) => {
    cy.get(selector).contains(content)
    return creator()
  },
})

export const AccordionAssertableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Asserts that accordion is open
   */
  assertBodyExists: () => {
    cy.get(selector).balAccordionIsOpen()
    return creator()
  },
  /**
   * Asserts that accordion is closed
   */
  assertBodyNotExists: () => {
    cy.get(selector).balAccordionIsClosed()
    return creator()
  },
})

/**
 * AccordionAccessor is a helper object for E-2-E testing.
 * It maps the accordion behaviour to the `bal-accordion` ui component.
 *
 * ```typescript
 * import { dataTestSelector, AccordionAccessor } from '@baloise/design-system-components-testing'
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

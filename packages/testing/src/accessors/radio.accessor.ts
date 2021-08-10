/// <reference types="cypress" />

import {Attributable, AttributableMixin} from '../mixins/attributable'
import {Checkable, CheckableMixin} from '../mixins/checkable'
import {Clickable, ClickableMixin} from '../mixins/clickable'
import {Containable, ContainableMixin} from '../mixins/containable'
import {Disableable, DisableableMixin} from '../mixins/disableable'
import {Existable, ExistableMixin} from '../mixins/existable'
import {Accessor, createAccessor, Mixin, MixinContext} from '../mixins/mixins'
import {NthSelectable, NthSelectableMixin} from '../mixins/nthSelectable'
import {Selectable} from '../mixins/selectable'
import {Shouldable, ShouldableMixin} from '../mixins/shouldable'
import {Urlable, UrlableMixin} from '../mixins/urlable'
import {Visible, VisibleMixin} from '../mixins/visible'
import {Waitable, WaitableMixin} from '../mixins/waitable'

interface RadioAccessorType
  extends Checkable<RadioAccessorType>,
    Containable<RadioAccessorType>,
    Clickable<RadioAccessorType>,
    Existable<RadioAccessorType>,
    Disableable<RadioAccessorType>,
    Shouldable<RadioAccessorType>,
    Visible<RadioAccessorType>,
    NthSelectable<RadioAccessorType>,
    Attributable<RadioAccessorType>,
    Urlable<RadioAccessorType>,
    Waitable<RadioAccessorType>,
    Selectable<RadioAccessorType> {
}

export const SelectButtonSelectableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Selects option
   */
  select: (indexes: number | number[]) => {
    if (typeof indexes === 'number') {
      indexes = [indexes]
    }
    cy.get(selector).within(() => {
      ;(indexes as number[]).forEach((index: number) => cy.get(`bal-radio.bal-select-button`).eq(index).click())
    })

    return creator()
  },
})

/**
 * RadioAccessor is a helper object for E-2-E testing.
 * It maps the radio behaviour to the `bal-radio` ui component.
 *
 * ```typescript
 * import { dataTestSelector, RadioAccessor } from '@baloise/design-system-components-testing'
 *
 * describe('Radio', () => {
 *   it('should ...', () => {
 *      const radio = RadioAccessor(dataTestSelector('radio-id')).get()
 *      radio.select(1)
 *  })
 * })
 * ```
 */
export const RadioAccessor: Accessor<RadioAccessorType> = createAccessor<RadioAccessorType>(
  CheckableMixin,
  ClickableMixin,
  ContainableMixin,
  ExistableMixin,
  DisableableMixin,
  ShouldableMixin,
  VisibleMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
  SelectButtonSelectableMixin,
)

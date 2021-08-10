/// <reference types="cypress" />

import {Attributable, AttributableMixin} from '../mixins/attributable'
import {Clickable, ClickableMixin} from '../mixins/clickable'
import {Containable} from '../mixins/containable'
import {Disableable, DisableableMixin} from '../mixins/disableable'
import {Existable, ExistableMixin} from '../mixins/existable'
import {Accessor, createAccessor, Mixin, MixinContext} from '../mixins/mixins'
import {NthSelectable, NthSelectableMixin} from '../mixins/nthSelectable'
import {Shouldable, ShouldableMixin} from '../mixins/shouldable'
import {Urlable, UrlableMixin} from '../mixins/urlable'
import {Visible, VisibleMixin} from '../mixins/visible'
import {Waitable, WaitableMixin} from '../mixins/waitable'

interface ModalButtonAccessorType
  extends Clickable<ModalButtonAccessorType>,
    Containable<ModalButtonAccessorType>,
    Existable<ModalButtonAccessorType>,
    Shouldable<ModalButtonAccessorType>,
    Visible<ModalButtonAccessorType>,
    Disableable<ModalButtonAccessorType>,
    NthSelectable<ModalButtonAccessorType>,
    Attributable<ModalButtonAccessorType>,
    Urlable<ModalButtonAccessorType>,
    Waitable<ModalButtonAccessorType> {
  closeModal(): ModalButtonAccessorType
}

export const ModalButtonContainableMixin: Mixin = <T>({creator, selector}: MixinContext<T>) => ({
  /**
   * Checks if element contains content
   */
  contains: (content: string) => {
    const item = cy.get(selector).find('.modal-card')
    item.contains(content)
    return creator()
  },
})
export const CloseModalWindowMixin: Mixin = <T>({creator}: MixinContext<T>) => ({
  /**
   * Closes the modal
   */
  closeModal: () => {
    const item = cy.get('#bal-modal-close-1')
    item.click()
    return creator()
  },
})

/**
 * ModalButtonAccessor is a helper object for E-2-E testing.
 * It maps the model behaviour to the `bal-model` ui component.
 *
 * ```typescript
 * import { dataTestSelector, ModalButtonAccessor } from '@baloise/design-system-components-testing'
 *
 * describe('Model', () => {
 *   it('should ...', () => {
 *      const model = ModalButtonAccessor(dataTestSelector('model-id')).get()
 *      model.clickOpenModalButton()
 *      model.assertBigModalContent('content')
 *  })
 * })
 * ```
 */
export const ModalButtonAccessor: Accessor<ModalButtonAccessorType> = createAccessor<ModalButtonAccessorType>(
  ExistableMixin,
  ClickableMixin,
  ModalButtonContainableMixin,
  CloseModalWindowMixin,
  ShouldableMixin,
  VisibleMixin,
  DisableableMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
)

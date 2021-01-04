/// <reference types="cypress" />

import {
  Accessor,
  Attributable, AttributableMixin,
  Clickable, ClickableMixin,
  Containable, createAccessor,
  Disableable, DisableableMixin,
  Existable, ExistableMixin, Mixin, MixinContext,
  NthSelectable, NthSelectableMixin, Shouldable, ShouldableMixin,
  Urlable, UrlableMixin,
  Visible, VisibleMixin, Waitable, WaitableMixin,
} from '../mixins'

interface ModalButtonAccessorType
  extends Clickable<ModalButtonAccessorType>, Containable<ModalButtonAccessorType>, Existable<ModalButtonAccessorType>, Shouldable<ModalButtonAccessorType>,
    Visible<ModalButtonAccessorType>, Disableable<ModalButtonAccessorType>, NthSelectable<ModalButtonAccessorType>,
    Attributable<ModalButtonAccessorType>, Urlable<ModalButtonAccessorType>, Waitable<ModalButtonAccessorType> {
  closeModal(): ModalButtonAccessorType;
}

export const ModalButtonContainableMixin: Mixin = <T>({creator, selector}: MixinContext<T>) => ({
  /**
   * Checks if element contains content
   */
  contains: (content: string) => {
    const item = cy.get(selector).find('.modal-card')
    item.contains(content);
    return creator();
  }
});
export const CloseModalWindowMixin: Mixin = <T>({creator}: MixinContext<T>) => ({
  /**
   * Closes the modal
   */
  closeModal: () => {
    const item = cy.get('#bal-modal-close-1');
    item.click();
    return creator();
  }
});


/**
 * ModalButtonAccessor is a helper object for E-2-E testing.
 * It maps the model behaviour to the `bal-model` ui component.
 *
 * ```typescript
 * import { dataTestSelector, ModalButtonAccessor } from '@baloise/ui-library-testing'
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
export const ModalButtonAccessor: Accessor<ModalButtonAccessorType> =
  createAccessor<ModalButtonAccessorType>(ExistableMixin, ClickableMixin, ModalButtonContainableMixin, CloseModalWindowMixin, ShouldableMixin, VisibleMixin,
    DisableableMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin);

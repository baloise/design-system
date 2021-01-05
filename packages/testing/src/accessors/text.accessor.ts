/// <reference types="cypress" />

import {
  Accessor,
  Attributable,
  AttributableMixin, Blurable, BlurableMixin,
  Clickable, ClickableMixin,
  Containable, ContainableMixin, createAccessor,
  Disableable, DisableableMixin, Existable, ExistableMixin,
  NthSelectable, NthSelectableMixin,
  Shouldable, ShouldableMixin,
  Urlable, UrlableMixin, Visible, VisibleMixin,
  Waitable, WaitableMixin,
} from '../mixins'

interface TextAccessorType
  extends Containable<TextAccessorType>, Clickable<TextAccessorType>, Shouldable<TextAccessorType>, Blurable<TextAccessorType>, Existable<TextAccessorType>,
    Disableable<TextAccessorType>, Visible<TextAccessorType>, NthSelectable<TextAccessorType>, Attributable<TextAccessorType>,
    Urlable<TextAccessorType>, Waitable<TextAccessorType> {
}

/**
 * TextAccessor is a helper object for E-2-E testing.
 * It maps the text behaviour to the `bal-text` ui component.
 *
 * ```typescript
 * import { dataTestSelector, TextAccessor } from '@baloise/ui-library-testing'
 *
 * describe('Text', () => {
 *   it('should ...', () => {
 *      const text = TextAccessor(dataTestSelector('text-id')).get()
 *      text.contains('Label')
 *  })
 * })
 * ```
 */
export const TextAccessor: Accessor<TextAccessorType> =
  createAccessor<TextAccessorType>(ContainableMixin, ShouldableMixin, BlurableMixin, ClickableMixin, ExistableMixin, DisableableMixin,
    VisibleMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin);

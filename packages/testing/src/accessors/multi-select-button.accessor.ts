/// <reference types="cypress" />

import {Andable, AndableMixin} from '../mixins/andable';
import {Attributable, AttributableMixin} from '../mixins/attributable';
import {Blurable, BlurableMixin} from '../mixins/blurable';
import {Clickable, ClickableMixin} from '../mixins/clickable';
import {Containable, ContainableMixin} from '../mixins/containable';
import {Disableable, DisableableMixin} from '../mixins/disableable';
import {Eachable, EachableMixin} from '../mixins/eachable';
import {Existable, ExistableMixin} from '../mixins/existable';
import {Findable, FindableMixin} from '../mixins/findable';
import {Invokable, InvokableMixin} from '../mixins/invokable';
import {Lengthable, LengthableMixin} from '../mixins/lengthable';
import {Accessor, createAccessor, Mixin, MixinContext} from '../mixins/mixins';
import {NthSelectable, NthSelectableMixin} from '../mixins/nthSelectable';
import {Selectable} from '../mixins/selectable';
import {Shouldable, ShouldableMixin} from '../mixins/shouldable';
import {Thenable, ThenableMixin} from '../mixins/thenable';
import {Urlable, UrlableMixin} from '../mixins/urlable';
import {Visible, VisibleMixin} from '../mixins/visible';
import {Waitable, WaitableMixin} from '../mixins/waitable';

interface MultiSelectButtonAccessorType
  extends Andable<MultiSelectButtonAccessorType>, Blurable<MultiSelectButtonAccessorType>, Selectable<MultiSelectButtonAccessorType>,
    Containable<MultiSelectButtonAccessorType>, Existable<MultiSelectButtonAccessorType>, Clickable<MultiSelectButtonAccessorType>,
    Shouldable<MultiSelectButtonAccessorType>, Visible<MultiSelectButtonAccessorType>, Disableable<MultiSelectButtonAccessorType>,
    NthSelectable<MultiSelectButtonAccessorType>, Attributable<MultiSelectButtonAccessorType>, Urlable<MultiSelectButtonAccessorType>,
    Findable<MultiSelectButtonAccessorType>, Waitable<MultiSelectButtonAccessorType>, Invokable<MultiSelectButtonAccessorType>,
    Thenable<MultiSelectButtonAccessorType>, Lengthable<MultiSelectButtonAccessorType>, Eachable<MultiSelectButtonAccessorType> {
}

export const MultiSelectButtonSelectableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Select one of the multi select buttons.
   */
  select: (indexes: number | number[]) => {
    if (typeof indexes === 'number') {
      indexes = [indexes];
    }
    cy.get(selector).within(() => {
      (indexes as number[]).forEach((index: number) =>
        cy.get(`label.bal-control-element`).eq(index).click());
    });
    return creator();
  },
  /**
   * Assert that one of the multi select buttons is selected.
   */
  assertIsSelected: (indexes: number | number[]) => {
    if (typeof indexes === 'number') {
      indexes = [indexes];
    }
    cy.get(selector).within(() => {
      (indexes as number[]).forEach((index: number) =>
        cy.get(`label.bal-control-element`).eq(index).should('have.class', 'bal-active'));
    });
    return creator();
  }
});

export const MultiSelectButtonAccessor: Accessor<MultiSelectButtonAccessorType> =
  createAccessor<MultiSelectButtonAccessorType>(AndableMixin, BlurableMixin, MultiSelectButtonSelectableMixin, ContainableMixin, ClickableMixin,
    ExistableMixin, ShouldableMixin, VisibleMixin, DisableableMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin, FindableMixin,
    InvokableMixin, ThenableMixin, LengthableMixin, EachableMixin);

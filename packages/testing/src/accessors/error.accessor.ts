/// <reference types="cypress" />

import {Andable, AndableMixin} from "../mixins/andable";
import {Clickable, ClickableMixin} from "../mixins/clickable";
import {Existable, ExistableMixin} from "../mixins/existable";
import {Shouldable, ShouldableMixin} from "../mixins/shouldable";
import {Visible, VisibleMixin} from "../mixins/visible";
import {NthSelectable, NthSelectableMixin} from "../mixins/nthSelectable";
import {Attributable, AttributableMixin} from "../mixins/attributable";
import {Urlable, UrlableMixin} from "../mixins/urlable";
import {Findable, FindableMixin} from "../mixins/findable";
import {Waitable, WaitableMixin} from "../mixins/waitable";
import {Invokable, InvokableMixin} from "../mixins/invokable";
import {Thenable, ThenableMixin} from "../mixins/thenable";
import {Lengthable, LengthableMixin} from "../mixins/lengthable";
import {Eachable, EachableMixin} from "../mixins/eachable";
import {Accessor, createAccessor, Mixin, MixinContext} from "../mixins/mixins";

interface ErrorAccessorType
  extends Andable<ErrorAccessorType>, Clickable<ErrorAccessorType>, Existable<ErrorAccessorType>, Shouldable<ErrorAccessorType>, Visible<ErrorAccessorType>,
    NthSelectable<ErrorAccessorType>, Attributable<ErrorAccessorType>, Urlable<ErrorAccessorType>, Findable<ErrorAccessorType>,
    Waitable<ErrorAccessorType>, Invokable<ErrorAccessorType>, Thenable<ErrorAccessorType>, Lengthable<ErrorAccessorType>, Eachable<ErrorAccessorType> {
  assertError(error: string): ErrorAccessorType;

  assertNoError(): ErrorAccessorType;
}

export const ErrorAssertableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  assertError: (error: string) => {
    const message = cy.get(selector).get(`bal-error`);
    message.should('contain', error);
    return creator();
  },
  assertNoError: () => {
    const noMessage = cy.get(selector).get(`bal-error`);
    noMessage.should('be.empty');
    return creator();
  }
});

export const ErrorAccessor: Accessor<ErrorAccessorType> =
  createAccessor<ErrorAccessorType>(AndableMixin, ErrorAssertableMixin, ClickableMixin, ExistableMixin, ShouldableMixin, VisibleMixin, NthSelectableMixin,
    AttributableMixin, UrlableMixin, WaitableMixin, FindableMixin, InvokableMixin, ThenableMixin, LengthableMixin, EachableMixin);

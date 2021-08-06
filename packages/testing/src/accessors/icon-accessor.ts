/// <reference types="cypress" />

import {Andable, AndableMixin} from '../mixins/andable';
import {Attributable, AttributableMixin} from '../mixins/attributable';
import {Blurable, BlurableMixin} from '../mixins/blurable';
import {Clickable, ClickableMixin} from '../mixins/clickable';
import {Containable, ContainableMixin} from '../mixins/containable';
import {Eachable, EachableMixin} from '../mixins/eachable';
import {Existable, ExistableMixin} from '../mixins/existable';
import {Findable, FindableMixin} from '../mixins/findable';
import {Invokable, InvokableMixin} from '../mixins/invokable';
import {Lengthable, LengthableMixin} from '../mixins/lengthable';
import {Accessor, createAccessor, Mixin, MixinContext} from '../mixins/mixins';
import {NthSelectable, NthSelectableMixin} from '../mixins/nthSelectable';
import {Shouldable, ShouldableMixin} from '../mixins/shouldable';
import {Thenable, ThenableMixin} from '../mixins/thenable';
import {Urlable, UrlableMixin} from '../mixins/urlable';
import {Visible, VisibleMixin} from '../mixins/visible';
import {Waitable, WaitableMixin} from '../mixins/waitable';

interface IconAccessorType
  extends Andable<IconAccessorType>, Blurable<IconAccessorType>, Existable<IconAccessorType>, Containable<IconAccessorType>, Clickable<IconAccessorType>,
    Shouldable<IconAccessorType>, Visible<IconAccessorType>, NthSelectable<IconAccessorType>, Attributable<IconAccessorType>,
    Urlable<IconAccessorType>, Findable<IconAccessorType>, Waitable<IconAccessorType>, Invokable<IconAccessorType>, Thenable<IconAccessorType>,
    Lengthable<IconAccessorType>, Eachable<IconAccessorType> {
  assertIcon(id: string): IconAccessorType;
}
/**
 * Assert that icon from client lib is shown.
 */
export const LibIconAssertableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  assertIcon: (id: string) => {
    cy.get(selector).should('have.attr', 'src', `${id}`);
    return creator();
  }
});

export const IconAccessor: Accessor<IconAccessorType> =
  createAccessor<IconAccessorType>(AndableMixin, BlurableMixin, LibIconAssertableMixin, ExistableMixin, ContainableMixin, ClickableMixin, ShouldableMixin,
    VisibleMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, FindableMixin, WaitableMixin, InvokableMixin, ThenableMixin, LengthableMixin,
    EachableMixin);

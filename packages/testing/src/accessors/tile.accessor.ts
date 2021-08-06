/// <reference types="cypress" />

import {Andable, AndableMixin} from '../mixins/andable';
import {Attachable, AttachableMixin} from '../mixins/attachable';
import {Attributable, AttributableMixin} from '../mixins/attributable';
import {Clickable} from '../mixins/clickable';
import {Containable, ContainableMixin} from '../mixins/containable';
import {Disableable, DisableableMixin} from '../mixins/disableable';
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
import {dataTestSelector} from "../selectors";

interface TileAccessorType
  extends Andable<TileAccessorType>, Clickable<TileAccessorType>, Existable<TileAccessorType>, Containable<TileAccessorType>, Disableable<TileAccessorType>,
    Shouldable<TileAccessorType>, Visible<TileAccessorType>, NthSelectable<TileAccessorType>, Attributable<TileAccessorType>,
    Urlable<TileAccessorType>, Findable<TileAccessorType>, Waitable<TileAccessorType>, Invokable<TileAccessorType>, Thenable<TileAccessorType>,
    Lengthable<TileAccessorType>, Eachable<TileAccessorType>, Attachable<TileAccessorType> {
  assertBodyExists(): TileAccessorType;

  assertBodyNotExists(): TileAccessorType;

  containsTileContent(content: string): TileAccessorType;
}

export const TileClickableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  click: (options?: Partial<Cypress.ClickOptions>) => {
    const button = cy.get(selector);
    button.click(options);
    return creator();
  }
});
export const TileContainableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  containsTileContent: (content: string) => {
    cy.get(selector).find(dataTestSelector('tile-content')).contains(content);
    return creator();
  }
});

export const TileAccessor: Accessor<TileAccessorType> =
  createAccessor<TileAccessorType>(AndableMixin, TileClickableMixin, TileContainableMixin, ExistableMixin, DisableableMixin, ShouldableMixin, VisibleMixin,
    NthSelectableMixin, AttributableMixin, UrlableMixin, ContainableMixin, FindableMixin, WaitableMixin, InvokableMixin, ThenableMixin, LengthableMixin,
    EachableMixin, AttachableMixin);

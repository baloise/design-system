/// <reference types="cypress" />

import {Andable, AndableMixin} from '../mixins/andable';
import {Attributable, AttributableMixin} from '../mixins/attributable';
import {Blurable, BlurableMixin} from '../mixins/blurable';
import {Containable} from '../mixins/containable';
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

interface TooltipAccessorType
  extends Andable<TooltipAccessorType>, Containable<TooltipAccessorType>, Visible<TooltipAccessorType>, Blurable<TooltipAccessorType>,
    Existable<TooltipAccessorType>, Shouldable<TooltipAccessorType>, NthSelectable<TooltipAccessorType>, Attributable<TooltipAccessorType>,
    Urlable<TooltipAccessorType>, Findable<TooltipAccessorType>, Waitable<TooltipAccessorType>, Invokable<TooltipAccessorType>,
    Thenable<TooltipAccessorType>, Lengthable<TooltipAccessorType>, Eachable<TooltipAccessorType> {
  hover(): TooltipAccessorType;
}
/**
 * Hover over some element.
 */
export const HoverMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  hover: () => {
    cy.get(selector).trigger('mouseenter').parent();
    return creator();
  }
});
/**
 * Assert that tooltip contains some data.
 */
export const HoverContainableMixin: Mixin = <T>({creator}: MixinContext<T>) => ({
  contains: (content: string) => {
    const item = cy.get('.tooltip');
    item.contains(content);
    return creator();
  }
});

export const TooltipAccessor: Accessor<TooltipAccessorType> =
  createAccessor<TooltipAccessorType>(AndableMixin, HoverMixin, HoverContainableMixin, VisibleMixin, BlurableMixin, ExistableMixin, ShouldableMixin,
    NthSelectableMixin, AttributableMixin, UrlableMixin, FindableMixin, WaitableMixin, InvokableMixin, ThenableMixin, LengthableMixin, EachableMixin);


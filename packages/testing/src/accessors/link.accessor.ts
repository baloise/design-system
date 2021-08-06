/// <reference types="cypress" />

import {Andable, AndableMixin} from '../mixins/andable';
import {Attachable, AttachableMixin} from '../mixins/attachable';
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
import {Shouldable, ShouldableMixin} from '../mixins/shouldable';
import {Thenable, ThenableMixin} from '../mixins/thenable';
import {Urlable, UrlableMixin} from '../mixins/urlable';
import {Visible, VisibleMixin} from '../mixins/visible';
import {Waitable, WaitableMixin} from '../mixins/waitable';

export enum Target {
  newTab = '_blank',
  sameTab = '_self',
  parent = '_parent',
  top = '_top'
}

interface LinkAccessorType
  extends Andable<LinkAccessorType>, Blurable<LinkAccessorType>, Clickable<LinkAccessorType>, Existable<LinkAccessorType>, Shouldable<LinkAccessorType>,
    Containable<LinkAccessorType>, Disableable<LinkAccessorType>, Visible<LinkAccessorType>, NthSelectable<LinkAccessorType>,
    Attributable<LinkAccessorType>, Urlable<LinkAccessorType>, Findable<LinkAccessorType>, Waitable<LinkAccessorType>, Invokable<LinkAccessorType>,
    Thenable<LinkAccessorType>, Lengthable<LinkAccessorType>, Eachable<LinkAccessorType>, Attachable<LinkAccessorType> {
  clickLink(): LinkAccessorType;

  assertLinkOpeningTarget(target: Target): LinkAccessorType;

  assertLinkWithoutTarget(): LinkAccessorType;

  assertHrefContains(href: string): LinkAccessorType;

  assertHrefEquals(href: string): LinkAccessorType;
}

/**
 * Click link.
 */
export const LinkClickableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  clickLink: () => {
    cy.get(selector).find('a').click();
    return creator();
  }
});
/**
 * Assert links target.
 */
export const LinkWithTargetAttribute: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  assertLinkOpeningTarget: (target: Target) => {
    cy.get(selector).find('a').should('have.attr', 'target', target);
    return creator();
  }
});
/**
 * Assert that link does not have target.
 */
export const LinkWithoutTargetAttribute: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  assertLinkWithoutTarget: () => {
    cy.get(selector).find('a').should('not.have.attr', 'target');
    return creator();
  }
});
/**
 * Assert that link contains some href.
 */
export const LinkHrefContainsAssertableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  assertHrefContains: (href: string) => {
    cy.get(selector).find('a').should('have.attr', 'href').and('contain', href);
    return creator();
  }
});
/**
 * Assert that link have some href.
 */
export const LinkHrefEqualsAssertableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  assertHrefEquals: (href: string) => {
    cy.get(selector).find('a').should('have.attr', 'href', href);
    return creator();
  }
});

export const LinkAccessor: Accessor<LinkAccessorType> =
  createAccessor<LinkAccessorType>(AndableMixin, BlurableMixin, ClickableMixin, LinkWithTargetAttribute, LinkWithoutTargetAttribute,
    LinkHrefContainsAssertableMixin, LinkHrefEqualsAssertableMixin, ExistableMixin, ShouldableMixin, ContainableMixin, DisableableMixin, VisibleMixin,
    NthSelectableMixin, LinkClickableMixin, AttributableMixin, UrlableMixin, FindableMixin, WaitableMixin, InvokableMixin, ThenableMixin, LengthableMixin,
    EachableMixin, AttachableMixin);

/// <reference types="cypress" />

import {Andable, AndableMixin} from '../mixins/andable';
import {Attachable, AttachableMixin} from '../mixins/attachable';
import {Attributable, AttributableMixin} from '../mixins/attributable';
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

interface TableAccessorType
  extends Andable<TableAccessorType>, Clickable<TableAccessorType>, Containable<TableAccessorType>, Existable<TableAccessorType>,
    Shouldable<TableAccessorType>, Disableable<TableAccessorType>, Visible<TableAccessorType>, NthSelectable<TableAccessorType>,
    Attributable<TableAccessorType>, Urlable<TableAccessorType>, Findable<TableAccessorType>, Waitable<TableAccessorType>,
    Eachable<TableAccessorType>, Invokable<TableAccessorType>, Thenable<TableAccessorType>, Lengthable<TableAccessorType>, Attachable<TableAccessorType> {
  rowContains(index: number, content: string): TableAccessorType;

  clickOnRow(index: number, options?: Partial<Cypress.ClickOptions>): TableAccessorType;
}
/**
 * Click on the table row.
 */
export const TableRowClickableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  clickOnRow: (index: number, options?: Partial<Cypress.ClickOptions>) => {
    const row = cy.get(selector).find('tr').eq(index);
    row.click(options);
    return creator();
  }
});
/**
 * Assert that table row contains some data..
 */
export const TableRowContainableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  rowContains: (index: number, content: string) => {
    const row = cy.get(selector).find('tr').eq(index);
    row.contains(content);
    return creator();
  }
});

export const TableAccessor: Accessor<TableAccessorType> =
  createAccessor<TableAccessorType>(AndableMixin, TableRowClickableMixin, TableRowContainableMixin, ExistableMixin, ContainableMixin, ClickableMixin,
    ShouldableMixin, DisableableMixin, VisibleMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin, FindableMixin, EachableMixin,
    InvokableMixin, ThenableMixin, LengthableMixin, AttachableMixin);

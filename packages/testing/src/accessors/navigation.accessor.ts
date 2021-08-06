/// <reference types="cypress" />

import {ListSelectableMixin} from './list.accessor';
import {Andable, AndableMixin} from '../mixins/andable';
import {Attributable, AttributableMixin} from '../mixins/attributable';
import {Clickable, ClickableMixin} from '../mixins/clickable';
import {Containable, ContainableMixin} from '../mixins/containable';
import {Disableable, DisableableMixin} from '../mixins/disableable';
import {Eachable, EachableMixin} from '../mixins/eachable';
import {Existable, ExistableMixin} from '../mixins/existable';
import {Findable, FindableMixin} from '../mixins/findable';
import {Invokable, InvokableMixin} from '../mixins/invokable';
import {Lengthable, LengthableMixin} from '../mixins/lengthable';
import {Accessor, createAccessor} from '../mixins/mixins';
import {NthSelectable, NthSelectableMixin} from '../mixins/nthSelectable';
import {Selectable} from '../mixins/selectable';
import {Shouldable, ShouldableMixin} from '../mixins/shouldable';
import {Thenable, ThenableMixin} from '../mixins/thenable';
import {Urlable, UrlableMixin} from '../mixins/urlable';
import {Visible, VisibleMixin} from '../mixins/visible';
import {Waitable, WaitableMixin} from '../mixins/waitable';

interface NavigationAccessorType
  extends Andable<NavigationAccessorType>, Clickable<NavigationAccessorType>, Disableable<NavigationAccessorType>, Existable<NavigationAccessorType>,
    Selectable<NavigationAccessorType>, Containable<NavigationAccessorType>, Shouldable<NavigationAccessorType>, Visible<NavigationAccessorType>,
    NthSelectable<NavigationAccessorType>, Attributable<NavigationAccessorType>, Urlable<NavigationAccessorType>, Findable<NavigationAccessorType>,
    Waitable<NavigationAccessorType>, Invokable<NavigationAccessorType>, Thenable<NavigationAccessorType>, Lengthable<NavigationAccessorType>,
    Eachable<NavigationAccessorType> {
}

export const NavigationAccessor: Accessor<NavigationAccessorType> =
  createAccessor<NavigationAccessorType>(AndableMixin, ListSelectableMixin, ExistableMixin, DisableableMixin, ClickableMixin, ContainableMixin,
    ShouldableMixin, VisibleMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, FindableMixin, WaitableMixin, InvokableMixin, ThenableMixin,
    LengthableMixin, EachableMixin);

/// <reference types="cypress" />


import {ErrorAssertableMixin} from './error.accessor';
import {InputValueAssertableMixin} from './input.accessor';
import {Andable, AndableMixin} from '../mixins/andable';
import {Attributable, AttributableMixin} from '../mixins/attributable';
import {Blurable, BlurableMixin} from '../mixins/blurable';
import {Clearable, ClearableMixin} from '../mixins/clearable';
import {Clickable, ClickableMixin} from '../mixins/clickable';
import {Containable, ContainableMixin} from '../mixins/containable';
import {Eachable, EachableMixin} from '../mixins/eachable';
import {Findable, FindableMixin} from '../mixins/findable';
import {Invokable, InvokableMixin} from '../mixins/invokable';
import {Lengthable, LengthableMixin} from '../mixins/lengthable';
import {Accessor, createAccessor} from '../mixins/mixins';
import {NthSelectable, NthSelectableMixin} from '../mixins/nthSelectable';
import {Selectable} from '../mixins/selectable';
import {Shouldable, ShouldableMixin} from '../mixins/shouldable';
import {Thenable, ThenableMixin} from '../mixins/thenable';
import {Typeable, TypeableMixin} from '../mixins/typeable';
import {Urlable, UrlableMixin} from '../mixins/urlable';
import {Waitable, WaitableMixin} from '../mixins/waitable';
import {
  SiblingDropDownAssertableOptionsMixin,
  SiblingDropDownContainableMixin,
  SiblingDropDownSelectableMixin
} from "./dropdown.accessor";

export interface TypeaheadAccessorType
  extends Andable<TypeaheadAccessorType>, Clickable<TypeaheadAccessorType>, Typeable<TypeaheadAccessorType>, Blurable<TypeaheadAccessorType>,
    Clearable<TypeaheadAccessorType>, Containable<TypeaheadAccessorType>, Selectable<TypeaheadAccessorType>, Shouldable<TypeaheadAccessorType>,
    NthSelectable<TypeaheadAccessorType>, Attributable<TypeaheadAccessorType>, Urlable<TypeaheadAccessorType>, Findable<TypeaheadAccessorType>,
    Waitable<TypeaheadAccessorType>, Invokable<TypeaheadAccessorType>, Thenable<TypeaheadAccessorType>, Lengthable<TypeaheadAccessorType>,
    Eachable<TypeaheadAccessorType> {
  assertValue(value: any): TypeaheadAccessorType;

  contains(content: string | number | RegExp): TypeaheadAccessorType;

  assertError(name: string, error: string): TypeaheadAccessorType;

  assertNoError(name: string): TypeaheadAccessorType;

  assertOptions(...options: string[]): TypeaheadAccessorType;
}

export const TypeaheadAccessor: Accessor<TypeaheadAccessorType> =
  createAccessor<TypeaheadAccessorType>(AndableMixin, ClickableMixin, TypeableMixin, BlurableMixin, ClearableMixin, ContainableMixin,
    InputValueAssertableMixin, ErrorAssertableMixin, ShouldableMixin, NthSelectableMixin, SiblingDropDownAssertableOptionsMixin('.dropdown-menu'),
    SiblingDropDownContainableMixin('.dropdown-menu'), SiblingDropDownSelectableMixin('.dropdown-menu'), AttributableMixin,
    UrlableMixin, FindableMixin, WaitableMixin, InvokableMixin, ThenableMixin, LengthableMixin, EachableMixin);

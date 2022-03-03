/// <reference types="cypress" />

import { ErrorAssertableMixin } from './error.accessor'
import { Andable, AndableMixin } from './mixins/andable'
import { Attachable, AttachableMixin } from './mixins/attachable'
import { Attributable, AttributableMixin } from './mixins/attributable'
import { Blurable, BlurableMixin } from './mixins/blurable'
import { Clearable, ClearableMixin } from './mixins/clearable'
import { Clickable, ClickableMixin } from './mixins/clickable'
import { Containable, ContainableMixin } from './mixins/containable'
import { Disableable, DisableableMixin } from './mixins/disableable'
import { Eachable, EachableMixin } from './mixins/eachable'
import { Existable, ExistableMixin } from './mixins/existable'
import { Findable, FindableMixin } from './mixins/findable'
import { Invokable, InvokableMixin } from './mixins/invokable'
import { Lengthable, LengthableMixin } from './mixins/lengthable'
import { Accessor, createAccessor, Mixin, MixinContext } from './mixins/mixins'
import { NthSelectable, NthSelectableMixin } from './mixins/nthSelectable'
import { Shouldable, ShouldableMixin } from './mixins/shouldable'
import { Thenable, ThenableMixin } from './mixins/thenable'
import { Typeable, TypeableMixin } from './mixins/typeable'
import { Urlable, UrlableMixin } from './mixins/urlable'
import { Visible, VisibleMixin } from './mixins/visible'
import { Waitable, WaitableMixin } from './mixins/waitable'

interface InputAccessorType
  extends Andable<InputAccessorType>,
    Clickable<InputAccessorType>,
    Typeable<InputAccessorType>,
    Blurable<InputAccessorType>,
    Clearable<InputAccessorType>,
    Visible<InputAccessorType>,
    Containable<InputAccessorType>,
    Existable<InputAccessorType>,
    Shouldable<InputAccessorType>,
    Disableable<InputAccessorType>,
    NthSelectable<InputAccessorType>,
    Attributable<InputAccessorType>,
    Urlable<InputAccessorType>,
    Findable<InputAccessorType>,
    Waitable<InputAccessorType>,
    Invokable<InputAccessorType>,
    Thenable<InputAccessorType>,
    Lengthable<InputAccessorType>,
    Eachable<InputAccessorType>,
    Attachable<InputAccessorType> {
  assertValue(value: any): InputAccessorType

  contains(content: string | number | RegExp): InputAccessorType

  assertError(error: string): InputAccessorType

  assertNoError(): InputAccessorType
}

export const InputValueAssertableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  assertValue: (value: any) => {
    element.should('have.value', value)
    return creator()
  },
})

export const InputAccessor: Accessor<InputAccessorType> = createAccessor<InputAccessorType>(
  AndableMixin,
  ClickableMixin,
  TypeableMixin,
  BlurableMixin,
  ShouldableMixin,
  InputValueAssertableMixin,
  ClearableMixin,
  ContainableMixin,
  ErrorAssertableMixin,
  ExistableMixin,
  DisableableMixin,
  VisibleMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  FindableMixin,
  WaitableMixin,
  InvokableMixin,
  ThenableMixin,
  LengthableMixin,
  EachableMixin,
  AttachableMixin,
)

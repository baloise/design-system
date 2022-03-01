/// <reference types="cypress" />

import { Andable, AndableMixin } from './mixins/andable'
import { Attributable, AttributableMixin } from './mixins/attributable'
import { Clickable, ClickableMixin } from './mixins/clickable'
import { Eachable, EachableMixin } from './mixins/eachable'
import { Existable, ExistableMixin } from './mixins/existable'
import { Findable, FindableMixin } from './mixins/findable'
import { Invokable, InvokableMixin } from './mixins/invokable'
import { Lengthable, LengthableMixin } from './mixins/lengthable'
import { Accessor, createAccessor, Mixin, MixinContext } from './mixins/mixins'
import { NthSelectable, NthSelectableMixin } from './mixins/nthSelectable'
import { Shouldable, ShouldableMixin } from './mixins/shouldable'
import { Thenable, ThenableMixin } from './mixins/thenable'
import { Urlable, UrlableMixin } from './mixins/urlable'
import { Visible, VisibleMixin } from './mixins/visible'
import { Waitable, WaitableMixin } from './mixins/waitable'

interface ErrorAccessorType
  extends Andable<ErrorAccessorType>,
    Clickable<ErrorAccessorType>,
    Existable<ErrorAccessorType>,
    Shouldable<ErrorAccessorType>,
    Visible<ErrorAccessorType>,
    NthSelectable<ErrorAccessorType>,
    Attributable<ErrorAccessorType>,
    Urlable<ErrorAccessorType>,
    Findable<ErrorAccessorType>,
    Waitable<ErrorAccessorType>,
    Invokable<ErrorAccessorType>,
    Thenable<ErrorAccessorType>,
    Lengthable<ErrorAccessorType>,
    Eachable<ErrorAccessorType> {
  assertError(error: string): ErrorAccessorType

  assertNoError(): ErrorAccessorType
}

/**
 * TODO: adjust to the DS
 */
export const ErrorAssertableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  assertError: (error: string) => {
    const message = element.get(`cip-error`)
    message.should('contain', error)
    return creator()
  },
  assertNoError: () => {
    const noMessage = element.get(`cip-error`)
    noMessage.should('be.empty')
    return creator()
  },
})

export const ErrorAccessor: Accessor<ErrorAccessorType> = createAccessor<ErrorAccessorType>(
  AndableMixin,
  ErrorAssertableMixin,
  ClickableMixin,
  ExistableMixin,
  ShouldableMixin,
  VisibleMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
  FindableMixin,
  InvokableMixin,
  ThenableMixin,
  LengthableMixin,
  EachableMixin,
)

import { Andable, AndableMixin } from './mixins/andable'
import { Attributable, AttributableMixin } from './mixins/attributable'
import { Blurable, BlurableMixin } from './mixins/blurable'
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
import { Urlable, UrlableMixin } from './mixins/urlable'
import { Visible, VisibleMixin } from './mixins/visible'
import { Waitable, WaitableMixin } from './mixins/waitable'

interface ToastAccessorType
  extends Andable<ToastAccessorType>,
    Blurable<ToastAccessorType>,
    Clickable<ToastAccessorType>,
    Containable<ToastAccessorType>,
    Existable<ToastAccessorType>,
    Shouldable<ToastAccessorType>,
    Disableable<ToastAccessorType>,
    Visible<ToastAccessorType>,
    NthSelectable<ToastAccessorType>,
    Attributable<ToastAccessorType>,
    Urlable<ToastAccessorType>,
    Findable<ToastAccessorType>,
    Waitable<ToastAccessorType>,
    Invokable<ToastAccessorType>,
    Thenable<ToastAccessorType>,
    Lengthable<ToastAccessorType>,
    Eachable<ToastAccessorType> {
  assertToast(content: string): ToastAccessorType
}

export const SuccessToastableMixin: Mixin = <T>({ creator }: MixinContext<T>) => ({
  assertToast: (content: string) => {
    cy.balToastFind().first().contains(content)
    return creator()
  },
})

export const ToastAccessor: Accessor<ToastAccessorType> = createAccessor<ToastAccessorType>(
  AndableMixin,
  BlurableMixin,
  SuccessToastableMixin,
  ContainableMixin,
  ClickableMixin,
  VisibleMixin,
  ExistableMixin,
  DisableableMixin,
  ShouldableMixin,
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

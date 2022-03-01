/// <reference types="cypress" />

import { Andable, AndableMixin } from './mixins/andable'
import { Attributable, AttributableMixin } from './mixins/attributable'
import { Blurable, BlurableMixin } from './mixins/blurable'
import { Checkable, CheckableMixin } from './mixins/checkable'
import { Clickable, ClickableMixin } from './mixins/clickable'
import { Containable, ContainableMixin } from './mixins/containable'
import { Disableable, DisableableMixin } from './mixins/disableable'
import { Eachable, EachableMixin } from './mixins/eachable'
import { Existable, ExistableMixin } from './mixins/existable'
import { Findable, FindableMixin } from './mixins/findable'
import { Invokable, InvokableMixin } from './mixins/invokable'
import { Lengthable, LengthableMixin } from './mixins/lengthable'
import { Accessor, createAccessor } from './mixins/mixins'
import { NthSelectable, NthSelectableMixin } from './mixins/nthSelectable'
import { Shouldable, ShouldableMixin } from './mixins/shouldable'
import { Thenable, ThenableMixin } from './mixins/thenable'
import { Urlable, UrlableMixin } from './mixins/urlable'
import { Visible, VisibleMixin } from './mixins/visible'
import { Waitable, WaitableMixin } from './mixins/waitable'

interface RadioAccessorType
  extends Andable<RadioAccessorType>,
    Blurable<RadioAccessorType>,
    Checkable<RadioAccessorType>,
    Containable<RadioAccessorType>,
    Clickable<RadioAccessorType>,
    Existable<RadioAccessorType>,
    Disableable<RadioAccessorType>,
    Shouldable<RadioAccessorType>,
    Visible<RadioAccessorType>,
    NthSelectable<RadioAccessorType>,
    Attributable<RadioAccessorType>,
    Urlable<RadioAccessorType>,
    Findable<RadioAccessorType>,
    Waitable<RadioAccessorType>,
    Invokable<RadioAccessorType>,
    Thenable<RadioAccessorType>,
    Lengthable<RadioAccessorType>,
    Eachable<RadioAccessorType> {}

export const RadioAccessor: Accessor<RadioAccessorType> = createAccessor<RadioAccessorType>(
  AndableMixin,
  BlurableMixin,
  CheckableMixin,
  ClickableMixin,
  ContainableMixin,
  ExistableMixin,
  DisableableMixin,
  ShouldableMixin,
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
)

/// <reference types="cypress" />

import { Andable, AndableMixin } from './mixins/andable'
import { Attachable, AttachableMixin } from './mixins/attachable'
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
import { Accessor, createAccessor } from './mixins/mixins'
import { NthSelectable, NthSelectableMixin } from './mixins/nthSelectable'
import { Shouldable, ShouldableMixin } from './mixins/shouldable'
import { Thenable, ThenableMixin } from './mixins/thenable'
import { Urlable, UrlableMixin } from './mixins/urlable'
import { Visible, VisibleMixin } from './mixins/visible'
import { Waitable, WaitableMixin } from './mixins/waitable'

interface ButtonAccessorType
  extends Andable<ButtonAccessorType>,
    Blurable<ButtonAccessorType>,
    Clickable<ButtonAccessorType>,
    Existable<ButtonAccessorType>,
    Shouldable<ButtonAccessorType>,
    Containable<ButtonAccessorType>,
    Disableable<ButtonAccessorType>,
    Visible<ButtonAccessorType>,
    NthSelectable<ButtonAccessorType>,
    Attributable<ButtonAccessorType>,
    Urlable<ButtonAccessorType>,
    Findable<ButtonAccessorType>,
    Waitable<ButtonAccessorType>,
    Invokable<ButtonAccessorType>,
    Thenable<ButtonAccessorType>,
    Lengthable<ButtonAccessorType>,
    Eachable<ButtonAccessorType>,
    Attachable<ButtonAccessorType> {}

export const ButtonAccessor: Accessor<ButtonAccessorType> = createAccessor<ButtonAccessorType>(
  AndableMixin,
  ClickableMixin,
  ExistableMixin,
  BlurableMixin,
  ShouldableMixin,
  ContainableMixin,
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

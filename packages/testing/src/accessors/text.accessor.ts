/// <reference types="cypress" />

import { Attributable, AttributableMixin } from '../mixins/attributable'
import { Blurable, BlurableMixin } from '../mixins/blurable'
import { Clickable, ClickableMixin } from '../mixins/clickable'
import { Containable, ContainableMixin } from '../mixins/containable'
import { Disableable, DisableableMixin } from '../mixins/disableable'
import { Existable, ExistableMixin } from '../mixins/existable'
import { Accessor, createAccessor } from '../mixins/mixins'
import { NthSelectable, NthSelectableMixin } from '../mixins/nthSelectable'
import { Shouldable, ShouldableMixin } from '../mixins/shouldable'
import { Urlable, UrlableMixin } from '../mixins/urlable'
import { Visible, VisibleMixin } from '../mixins/visible'
import { Waitable, WaitableMixin } from '../mixins/waitable'

interface TextAccessorType
  extends Containable<TextAccessorType>,
    Clickable<TextAccessorType>,
    Shouldable<TextAccessorType>,
    Blurable<TextAccessorType>,
    Existable<TextAccessorType>,
    Disableable<TextAccessorType>,
    Visible<TextAccessorType>,
    NthSelectable<TextAccessorType>,
    Attributable<TextAccessorType>,
    Urlable<TextAccessorType>,
    Waitable<TextAccessorType> {}

/**
 * TextAccessor is a helper object for E-2-E testing.
 * It maps the text behaviour to the `bal-text` ui component.
 *
 * ```typescript
 * import { dataTestSelector, TextAccessor } from '@baloise/design-system-components-testing'
 *
 * describe('Text', () => {
 *   it('should ...', () => {
 *      const text = TextAccessor(dataTestSelector('text-id')).get()
 *      text.contains('Label')
 *  })
 * })
 * ```
 */
export const TextAccessor: Accessor<TextAccessorType> = createAccessor<TextAccessorType>(
  ContainableMixin,
  ShouldableMixin,
  BlurableMixin,
  ClickableMixin,
  ExistableMixin,
  DisableableMixin,
  VisibleMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
)

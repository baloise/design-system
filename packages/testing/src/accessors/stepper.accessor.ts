import {Andable, AndableMixin} from '../mixins/andable';
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
import {Selectable} from '../mixins/selectable';
import {Shouldable, ShouldableMixin} from '../mixins/shouldable';
import {Thenable, ThenableMixin} from '../mixins/thenable';
import {Urlable, UrlableMixin} from '../mixins/urlable';
import {Visible, VisibleMixin} from '../mixins/visible';
import {Waitable, WaitableMixin} from '../mixins/waitable';

interface StepperAccessorType
  extends Andable<StepperAccessorType>, Blurable<StepperAccessorType>, Selectable<StepperAccessorType>, Clickable<StepperAccessorType>,
    Containable<StepperAccessorType>, Existable<StepperAccessorType>, Shouldable<StepperAccessorType>, Disableable<StepperAccessorType>,
    Visible<StepperAccessorType>, NthSelectable<StepperAccessorType>, Attributable<StepperAccessorType>, Urlable<StepperAccessorType>,
    Findable<StepperAccessorType>, Waitable<StepperAccessorType>, Invokable<StepperAccessorType>, Thenable<StepperAccessorType>,
    Lengthable<StepperAccessorType>, Eachable<StepperAccessorType> {
  assertActive(index: number): void;
}

export const StepperSelectableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  select: (index: number) => {
    cy.get(selector).within(() => {
      cy.get(`bal-stepper-step`).eq(index).click();
    });
    return creator();
  },
  assertIsSelected: (index: number) => {
    cy.get(selector).within(() => {
      cy.get(`bal-stepper-step`).eq(index).should('have.class', 'bal-stepper__step--is-active');
    });
    return creator();
  }
});

export const StepperAccessor: Accessor<StepperAccessorType> =
  createAccessor<StepperAccessorType>(AndableMixin, BlurableMixin, StepperSelectableMixin, ContainableMixin, ClickableMixin, ExistableMixin, DisableableMixin,
    ShouldableMixin, VisibleMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin, FindableMixin, InvokableMixin, ThenableMixin,
    LengthableMixin, EachableMixin);

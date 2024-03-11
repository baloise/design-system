import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  NgZone,
  forwardRef,
} from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import type { Components } from '@baloise/design-system-components'
import { defineCustomElement } from '@baloise/design-system-components/components/bal-checkbox-group'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalCheckboxGroupInputs, BalCheckboxGroupMethods, BalCheckboxGroupOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalCheckboxGroup),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalCheckboxGroupInputs,
  methods: BalCheckboxGroupMethods,
})
@Component({
  selector: 'bal-checkbox-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalCheckboxGroupInputs,
  outputs: BalCheckboxGroupOutputs,
})
export class BalCheckboxGroup extends ValueAccessor {
  protected el: HTMLElement

  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
    injector: Injector,
  ) {
    super(injector, r)
    c.detach()
    this.el = r.nativeElement
    proxyOutputs(this, this.el, BalCheckboxGroupOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalCheckboxGroup extends Components.BalCheckboxGroup {
  /** Emitted when the toggle has focus. */
  balFocus: EventEmitter<BalEvents.BalCheckboxCustomEvent<FocusEvent>>
  /** Emitted when the toggle loses focus. */
  balBlur: EventEmitter<BalEvents.BalCheckboxCustomEvent<FocusEvent>>
  /** Emitted when the value property has changed. */
  balChange: EventEmitter<BalEvents.BalCheckboxCustomEvent<boolean>>
}

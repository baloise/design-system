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
import { defineCustomElement } from '@baloise/design-system-components/components/bal-radio-group'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalRadioGroupInputs, BalRadioGroupMethods, BalRadioGroupOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalRadioGroup),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalRadioGroupInputs,
  methods: BalRadioGroupMethods,
})
@Component({
  selector: 'bal-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalRadioGroupInputs,
  outputs: BalRadioGroupOutputs,
})
export class BalRadioGroup extends ValueAccessor {
  protected el: HTMLElement

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone, injector: Injector) {
    super(injector, r)
    c.detach()
    this.el = r.nativeElement
    proxyOutputs(this, this.el, BalRadioGroupOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalRadioGroup extends Components.BalRadioGroup {
  /** Emitted when the checked property has changed. */
  balChange: EventEmitter<BalEvents.BalRadioGroupCustomEvent<boolean | number | string>>
  /** Emitted when the toggle has focus. */
  balFocus: EventEmitter<BalEvents.BalRadioGroupCustomEvent<FocusEvent>>
  /** Emitted when the toggle loses focus. */
  balBlur: EventEmitter<BalEvents.BalRadioGroupCustomEvent<FocusEvent>>
}

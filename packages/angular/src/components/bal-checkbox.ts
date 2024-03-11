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

import type { Components } from '@baloise/ds-core'
import { defineCustomElement } from '@baloise/ds-core/components/bal-checkbox'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalCheckboxInputs, BalCheckboxMethods, BalCheckboxOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalCheckbox),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalCheckboxInputs,
  methods: BalCheckboxMethods,
})
@Component({
  selector: 'bal-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalCheckboxInputs,
  outputs: BalCheckboxOutputs,
})
export class BalCheckbox extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalCheckboxOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }

  override writeValue(value: any) {
    this.elementRef.nativeElement.checked = this.lastValue = value == null ? false : value
    this.onStatusChange()
  }
}

export declare interface BalCheckbox extends Components.BalCheckbox {
  /** Emitted when the toggle has focus. */
  balFocus: EventEmitter<BalEvents.BalCheckboxCustomEvent<FocusEvent>>
  /** Emitted when the toggle loses focus. */
  balBlur: EventEmitter<BalEvents.BalCheckboxCustomEvent<FocusEvent>>
  /** Emitted when the value property has changed. */
  balChange: EventEmitter<BalEvents.BalCheckboxCustomEvent<boolean>>
}

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
import { defineCustomElement } from '@baloise/ds-core/components/bal-datepicker'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalDatepickerInputs, BalDatepickerMethods, BalDatepickerOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalDatepicker),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalDatepickerInputs,
  methods: BalDatepickerMethods,
})
@Component({
  selector: 'bal-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalDatepickerInputs,
  outputs: BalDatepickerOutputs,
})
export class BalDatepicker extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalDatepickerOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalDatepicker extends Components.BalDatepicker {
  /** Emitted when a option got selected. */
  balChange: EventEmitter<BalEvents.BalDatepickerCustomEvent<string | undefined>>
  /** Emitted when a keyboard input occurred. */
  balInput: EventEmitter<BalEvents.BalDatepickerCustomEvent<string | undefined>>
  /** Emitted when the input loses focus. */
  balBlur: EventEmitter<BalEvents.BalDatepickerCustomEvent<FocusEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalDatepickerCustomEvent<FocusEvent>>
  /** Emitted when the input has clicked. */
  balInputClick: EventEmitter<BalEvents.BalDatepickerCustomEvent<MouseEvent>>
  /** Emitted when the icon has clicked. */
  balIconClick: EventEmitter<BalEvents.BalDatepickerCustomEvent<MouseEvent>>
}

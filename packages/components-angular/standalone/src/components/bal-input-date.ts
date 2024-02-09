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
import { defineCustomElement } from '@baloise/design-system-components/components/bal-input-date'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalInputDateInputs, BalInputDateMethods, BalInputDateOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalInputDate),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalInputDateInputs,
  methods: BalInputDateMethods,
})
@Component({
  selector: 'bal-input-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalInputDateInputs,
  outputs: BalInputDateOutputs,
})
export class BalInputDate extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalInputDateOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalInputDate extends Components.BalInputDate {
  /** Emitted when a keyboard key has pressed. */
  balKeyPress: EventEmitter<BalEvents.BalInputDateCustomEvent<KeyboardEvent>>
  /** Emitted when a option got selected. */
  balChange: EventEmitter<BalEvents.BalInputDateCustomEvent<string | undefined>>
  /** Emitted when a keyboard input occurred. */
  balInput: EventEmitter<BalEvents.BalInputDateCustomEvent<string | undefined>>
  /** Emitted when the input loses focus. */
  balBlur: EventEmitter<BalEvents.BalInputDateCustomEvent<FocusEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalInputDateCustomEvent<FocusEvent>>
}

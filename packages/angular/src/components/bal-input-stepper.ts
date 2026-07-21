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
import { defineCustomElement } from '@baloise/ds-core/components/bal-input-stepper'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalInputStepperInputs, BalInputStepperMethods, BalInputStepperOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalInputStepper),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalInputStepperInputs,
  methods: BalInputStepperMethods,
})
@Component({
  selector: 'bal-input-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalInputStepperInputs,
  outputs: BalInputStepperOutputs,
})
export class BalInputStepper extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalInputStepperOutputs)
  }

  @HostListener('balInput', ['$event'])
  handleBalInput(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }

  override registerOnChange(fn: (_: number | null) => void) {
    super.registerOnChange(value => {
      fn(value === '' ? null : parseFloat(value))
    })
  }
}

export declare interface BalInputStepper extends Components.BalInputStepper {
  /** Emitted when the input value has changed. */
  balChange: EventEmitter<BalEvents.BalInputStepperCustomEvent<number | undefined>>
  /** Emitted when the input value has changed. */
  balInput: EventEmitter<BalEvents.BalInputStepperCustomEvent<number | undefined>>
  /** Emitted when the input value has increased. */
  balIncrease: EventEmitter<BalEvents.BalInputStepperCustomEvent<number | undefined>>
  /** Emitted when the input value has decreased. */
  balDecrease: EventEmitter<BalEvents.BalInputStepperCustomEvent<number | undefined>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalInputStepperCustomEvent<FocusEvent>>
  /** Emitted when a keyboard input occurred. */
  balBlur: EventEmitter<BalEvents.BalInputStepperCustomEvent<FocusEvent>>
}

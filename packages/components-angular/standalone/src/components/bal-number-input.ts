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
import { defineCustomElement } from '@baloise/design-system-components/components/bal-number-input'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalNumberInputInputs, BalNumberInputMethods, BalNumberInputOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalNumberInput),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalNumberInputInputs,
  methods: BalNumberInputMethods,
})
@Component({
  selector: 'bal-number-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalNumberInputInputs,
  outputs: BalNumberInputOutputs,
})
export class BalNumberInput extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalNumberInputOutputs)
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

export declare interface BalNumberInput extends Components.BalNumberInput {
  /** Emitted when a keyboard input occurred. */
  balInput: EventEmitter<BalEvents.BalNumberInputCustomEvent<number | undefined>>
  /** Emitted when the value has changed. */
  balChange: EventEmitter<BalEvents.BalNumberInputCustomEvent<number | undefined>>
  /** Emitted when the input loses focus. */
  balBlur: EventEmitter<BalEvents.BalNumberInputCustomEvent<FocusEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalNumberInputCustomEvent<FocusEvent>>
  /** Emitted when a keyboard key has pressed. */
  balKeyPress: EventEmitter<BalEvents.BalNumberInputCustomEvent<KeyboardEvent>>
}

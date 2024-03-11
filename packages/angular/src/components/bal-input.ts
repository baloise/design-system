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
import { defineCustomElement } from '@baloise/ds-core/components/bal-input'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalInputInputs, BalInputMethods, BalInputOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalInput),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalInputInputs,
  methods: BalInputMethods,
})
@Component({
  selector: 'bal-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalInputInputs,
  outputs: BalInputOutputs,
})
export class BalInput extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalInputOutputs)
  }

  @HostListener('balInput', ['$event'])
  handleBalInput(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalInput extends Components.BalInput {
  /** Emitted when a keyboard input occurred. */
  balInput: EventEmitter<BalEvents.BalInputCustomEvent<string | undefined>>
  /** Emitted when a keyboard input occurred. */
  balBlur: EventEmitter<BalEvents.BalInputCustomEvent<FocusEvent>>
  /** Emitted when a keyboard key has pressed. */
  balKeyPress: EventEmitter<BalEvents.BalInputCustomEvent<KeyboardEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalInputCustomEvent<FocusEvent>>
  /** Emitted when the input value has changed. */
  balChange: EventEmitter<BalEvents.BalInputCustomEvent<string | undefined>>
}

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
import { defineCustomElement } from '@baloise/design-system-components/components/bal-time-input'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalTimeInputInputs, BalTimeInputMethods, BalTimeInputOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalTimeInput),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalTimeInputInputs,
  methods: BalTimeInputMethods,
})
@Component({
  selector: 'bal-time-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalTimeInputInputs,
  outputs: BalTimeInputOutputs,
})
export class BalTimeInput extends ValueAccessor {
  protected el: HTMLElement

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone, injector: Injector) {
    super(injector, r)
    c.detach()
    this.el = r.nativeElement
    proxyOutputs(this, this.el, BalTimeInputOutputs)
  }

  @HostListener('balInput', ['$event'])
  handleBalInput(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalTimeInput extends Components.BalTimeInput {
  /** Emitted when a keyboard input occurred. */
  balInput: EventEmitter<BalEvents.BalTimeInputCustomEvent<string | undefined>>
  /** Emitted when the value has changed. */
  balChange: EventEmitter<BalEvents.BalTimeInputCustomEvent<string | undefined>>
  /** Emitted when the input loses focus. */
  balBlur: EventEmitter<BalEvents.BalTimeInputCustomEvent<FocusEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalTimeInputCustomEvent<FocusEvent>>
  /** Emitted when a keyboard key has pressed. */
  balKeyPress: EventEmitter<BalEvents.BalTimeInputCustomEvent<KeyboardEvent>>
  /** Emitted when the input has clicked. */
  balClick: EventEmitter<BalEvents.BalTimeInputCustomEvent<MouseEvent>>
}

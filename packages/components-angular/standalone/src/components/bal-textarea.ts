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
import { defineCustomElement } from '@baloise/design-system-components/components/bal-textarea'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalTextareaInputs, BalTextareaMethods, BalTextareaOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalTextarea),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalTextareaInputs,
  methods: BalTextareaMethods,
})
@Component({
  selector: 'bal-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalTextareaInputs,
  outputs: BalTextareaOutputs,
})
export class BalTextarea extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalTextareaOutputs)
  }

  @HostListener('balInput', ['$event'])
  handleBalInput(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalTextarea extends Components.BalTextarea {
  /** Emitted when the input value has changed.. */
  balChange: EventEmitter<BalEvents.BalTextareaCustomEvent<string | undefined>>
  /** Emitted when a keyboard input occurred. */
  balInput: EventEmitter<BalEvents.BalTextareaCustomEvent<string | undefined>>
  /** Emitted when a keyboard input occurred. */
  balBlur: EventEmitter<BalEvents.BalTextareaCustomEvent<FocusEvent>>
  /** Emitted when a keyboard key has pressed. */
  balKeyPress: EventEmitter<BalEvents.BalTextareaCustomEvent<KeyboardEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalTextareaCustomEvent<FocusEvent>>
}

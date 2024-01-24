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
import { defineCustomElement } from '@baloise/design-system-components/components/bal-date'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalDateInputs, BalDateMethods, BalDateOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalDate),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalDateInputs,
  methods: BalDateMethods,
})
@Component({
  selector: 'bal-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalDateInputs,
  outputs: BalDateOutputs,
})
export class BalDate extends ValueAccessor {
  protected el: HTMLElement

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone, injector: Injector) {
    super(injector, r)
    c.detach()
    this.el = r.nativeElement
    proxyOutputs(this, this.el, BalDateOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalDate extends Components.BalDate {
  /** Emitted when a keyboard input occurred. */
  balInput: EventEmitter<BalEvents.BalDateCustomEvent<string | undefined>>
  /** Emitted when a option got selected. */
  balChange: EventEmitter<BalEvents.BalDateCustomEvent<string | undefined>>
  /** Emitted before the animation starts */
  balWillAnimate: EventEmitter<BalEvents.BalDateCustomEvent<boolean>>
  /** Emitted after the animation has finished */
  balDidAnimate: EventEmitter<BalEvents.BalDateCustomEvent<boolean>>
  /** Emitted when the input loses focus. */
  balBlur: EventEmitter<BalEvents.BalDateCustomEvent<FocusEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalDateCustomEvent<FocusEvent>>
  /** Emitted when the input has clicked. */
  balInputClick: EventEmitter<BalEvents.BalDateCustomEvent<MouseEvent>>
  /** Emitted when the icon has clicked. */
  balIconClick: EventEmitter<BalEvents.BalDateCustomEvent<MouseEvent>>
}

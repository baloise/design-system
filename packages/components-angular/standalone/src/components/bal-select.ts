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
import { defineCustomElement } from '@baloise/design-system-components/components/bal-select'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalSelectInputs, BalSelectMethods, BalSelectOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalSelect),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalSelectInputs,
  methods: BalSelectMethods,
})
@Component({
  selector: 'bal-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalSelectInputs,
  outputs: BalSelectOutputs,
})
export class BalSelect extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalSelectOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalSelect extends Components.BalSelect {
  /** Emitted when a option got selected. */
  balChange: EventEmitter<BalEvents.BalSelectCustomEvent<string | string[] | undefined>>
  /** Emitted when the input got clicked. */
  balInputClick: EventEmitter<BalEvents.BalSelectCustomEvent<MouseEvent>>
  /** Emitted when a keyboard input occurred. */
  balInput: EventEmitter<BalEvents.BalSelectCustomEvent<string>>
  /** Emitted when the input loses focus. */
  balBlur: EventEmitter<BalEvents.BalSelectCustomEvent<FocusEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalSelectCustomEvent<FocusEvent>>
  /** Emitted when the user cancels the input. */
  balCancel: EventEmitter<BalEvents.BalSelectCustomEvent<KeyboardEvent>>
  /** Emitted when the input has focus and key from the keyboard go hit. */
  balKeyPress: EventEmitter<BalEvents.BalSelectCustomEvent<KeyboardEvent>>
}

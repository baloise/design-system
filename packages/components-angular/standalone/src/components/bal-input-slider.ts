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
import { defineCustomElement } from '@baloise/design-system-components/components/bal-input-slider'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalInputSliderInputs, BalInputSliderMethods, BalInputSliderOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalInputSlider),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalInputSliderInputs,
  methods: BalInputSliderMethods,
})
@Component({
  selector: 'bal-input-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalInputSliderInputs,
  outputs: BalInputSliderOutputs,
})
export class BalInputSlider extends ValueAccessor {
  protected el: HTMLElement

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone, injector: Injector) {
    super(injector, r)
    c.detach()
    this.el = r.nativeElement
    proxyOutputs(this, this.el, BalInputSliderOutputs)
  }

  @HostListener('balInput', ['$event'])
  handleBalInput(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalInputSlider extends Components.BalInputSlider {
  /** Emitted when a keyboard input occurred. */
  balInput: EventEmitter<BalEvents.BalInputSliderCustomEvent<null | number | string>>
  /** Emitted when a keyboard input occurred. */
  balBlur: EventEmitter<BalEvents.BalInputSliderCustomEvent<FocusEvent>>
  /** Emitted when a keyboard key has pressed. */
  balKeyPress: EventEmitter<BalEvents.BalInputSliderCustomEvent<KeyboardEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalInputSliderCustomEvent<FocusEvent>>
  /** Emitted when the input value has changed. */
  balChange: EventEmitter<BalEvents.BalInputSliderCustomEvent<null | number | string>>
}

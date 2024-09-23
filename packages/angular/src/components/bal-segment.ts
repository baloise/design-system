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
import { defineCustomElement as defineSegment } from '@baloise/ds-core/components/bal-segment'
import { defineCustomElement as defineSegmentItem } from '@baloise/ds-core/components/bal-segment-item'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalSegmentInputs, BalSegmentMethods, BalSegmentOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalSegment),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: () => {
    defineSegment();
    defineSegmentItem();
  },
  inputs: BalSegmentInputs,
  methods: BalSegmentMethods,
})
@Component({
  selector: 'bal-segment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalSegmentInputs,
  outputs: BalSegmentOutputs,
})
export class BalSegment extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalSegmentOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalSegment extends Components.BalSegment {
  /** Emitted when the checked property has changed. */
  balChange: EventEmitter<BalEvents.BalSegmentCustomEvent<boolean | number | string>>
  /** Emitted when the toggle loses focus. */
  balBlur: EventEmitter<BalEvents.BalSegmentCustomEvent<FocusEvent>>
}

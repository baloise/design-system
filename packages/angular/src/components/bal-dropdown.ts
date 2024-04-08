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
import { defineCustomElement as defineOptionDropdown } from '@baloise/ds-core/components/bal-dropdown'
import { defineCustomElement as defineOptionList } from '@baloise/ds-core/components/bal-option-list'
import { defineCustomElement as defineOption } from '@baloise/ds-core/components/bal-option'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalDropdownInputs, BalDropdownMethods, BalDropdownOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalDropdown),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: () => {
    defineOption()
    defineOptionList()
    defineOptionDropdown()
  },
  inputs: BalDropdownInputs,
  methods: BalDropdownMethods,
})
@Component({
  selector: 'bal-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalDropdownInputs,
  outputs: BalDropdownOutputs,
})
export class BalDropdown extends ValueAccessor {
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
    proxyOutputs(this, this.el, BalDropdownOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalDropdown extends Components.BalDropdown {
  /** Emitted when a option got selected. */
  balChange: EventEmitter<BalEvents.BalDropdownCustomEvent<string | string[] | undefined>>
}

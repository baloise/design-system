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

import type { Components, FileUploadRejectedFile } from '@baloise/design-system-components'
import { defineCustomElement } from '@baloise/design-system-components/components/bal-file-upload'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalFileUploadInputs, BalFileUploadMethods, BalFileUploadOutputs } from '../generated/meta'

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalFileUpload),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: BalFileUploadInputs,
  methods: BalFileUploadMethods,
})
@Component({
  selector: 'bal-file-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  providers: [accessorProvider],
  standalone: true,
  inputs: BalFileUploadInputs,
  outputs: BalFileUploadOutputs,
})
export class BalFileUpload extends ValueAccessor {
  protected el: HTMLElement

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone, injector: Injector) {
    super(injector, r)
    c.detach()
    this.el = r.nativeElement
    proxyOutputs(this, this.el, BalFileUploadOutputs)
  }

  @HostListener('balChange', ['$event'])
  handleBalChange(event: CustomEvent<any>): void {
    this.handleValueChange(event)
  }
}

export declare interface BalFileUpload extends Components.BalFileUpload {
  /** Triggers when a file is added or removed. */
  balChange: EventEmitter<BalEvents.BalFileUploadCustomEvent<File[]>>
  /** Triggers when a file is added. */
  balFilesAdded: EventEmitter<BalEvents.BalFileUploadCustomEvent<File[]>>
  /** Triggers when a file is removed. */
  balFilesRemoved: EventEmitter<BalEvents.BalFileUploadCustomEvent<File[]>>
  /** Triggers when a file is rejected due to not allowed MIME-Type and so on. */
  balRejectedFile: EventEmitter<BalEvents.BalFileUploadCustomEvent<FileUploadRejectedFile>>
  /** Emitted when the input has clicked. */
  balInputClick: EventEmitter<BalEvents.BalFileUploadCustomEvent<MouseEvent>>
  /** Emitted when the input loses focus. */
  balBlur: EventEmitter<BalEvents.BalFileUploadCustomEvent<FocusEvent>>
  /** Emitted when the input has focus. */
  balFocus: EventEmitter<BalEvents.BalFileUploadCustomEvent<FocusEvent>>
}

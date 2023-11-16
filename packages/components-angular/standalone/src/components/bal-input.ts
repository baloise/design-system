import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  Inject,
  NgZone,
  OnInit,
  forwardRef,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms'

import type { Components } from '@baloise/design-system-components'
import { defineCustomElement } from '@baloise/design-system-components/components/bal-input'

import { ProxyCmp, proxyOutputs } from '../generated/angular-component-lib/utils'
import { ValueAccessor } from '../generated/value-accessor'
import { BalConfigToken, BaloiseDesignSystemAngularConfig } from '..'

const INPUT_INPUTS = [
  'accept',
  'allowedKeyPress',
  'autocapitalize',
  'autocomplete',
  'autocorrect',
  'autofocus',
  'clickable',
  'debounce',
  'disabled',
  'inputmode',
  'invalid',
  'mask',
  'max',
  'maxLength',
  'min',
  'minLength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'readonly',
  'required',
  'spellcheck',
  'suffix',
  'textAlign',
  'type',
  'value',
]

const accessorProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*@__PURE__*/ forwardRef(() => BalInput),
  multi: true,
}

@ProxyCmp({
  defineCustomElementFn: defineCustomElement,
  inputs: INPUT_INPUTS,
  methods: ['setFocus', 'getInputElement'],
})
@Component({
  selector: 'bal-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: INPUT_INPUTS,
  providers: [accessorProvider],
  standalone: true,
  // outputs: ['balInput', 'balBlur', 'balKeyPress', 'balFocus', 'balChange'],
})
export class BalInput extends ValueAccessor {
  protected el: HTMLElement

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone, injector: Injector) {
    super(injector, r)
    c.detach()
    this.el = r.nativeElement
    proxyOutputs(this, this.el, ['balInput', 'balBlur', 'balKeyPress', 'balFocus', 'balChange'])
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

/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter } from '@angular/core'
import {
  addProxyOutputListener,
  ProxyCmp,
  proxyOutputs,
  removeProxyOutputListener,
} from './angular-component-lib/utils'

import { Components } from '@baloise/ui-library'

import { Input as IInput } from '@baloise/ui-library/dist/types/components/bal-input/bal-input'
export declare interface BalInput extends Components.BalInput {}
@ProxyCmp({
  inputs: [
    'autoComplete',
    'balTabindex',
    'clickable',
    'disabled',
    'inverted',
    'maxLength',
    'minLength',
    'name',
    'numberKeyboard',
    'onlyNumbers',
    'placeholder',
    'readonly',
    'type',
    'value',
  ],
  methods: ['setFocus'],
})
@Component({
  selector: 'bal-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: [
    'autoComplete',
    'balTabindex',
    'clickable',
    'disabled',
    'inverted',
    'maxLength',
    'minLength',
    'name',
    'numberKeyboard',
    'onlyNumbers',
    'placeholder',
    'readonly',
    'type',
    'value',
  ],
  outputs: ['balInput', 'balBlur', 'balClick', 'balKeyPress', 'balFocus'],
})
export class BalInput {
  /** Emitted when a keyboard input occurred. */
  // ngBalInput!: EventEmitter<string>
  balInput!: EventEmitter<string>
  /** Emitted when a keyboard input occurred. */
  ngBalBlur!: EventEmitter<FocusEvent>
  /** Emitted when the input has clicked. */
  ngBalClick!: EventEmitter<MouseEvent>
  /** Emitted when a keyboard key has pressed. */
  ngBalKeyPress!: EventEmitter<KeyboardEvent>
  /** Emitted when the input has focus. */
  ngBalFocus!: EventEmitter<FocusEvent>
  protected el: HTMLElement
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach()
    this.el = r.nativeElement
    proxyOutputs(this, this.el, ['balInput', 'balBlur', 'balClick', 'balKeyPress', 'balFocus'])
  }

  // ngOnInit() {
  //   addProxyOutputListener(this, this.el, ['balInput', 'balBlur', 'balClick', 'balKeyPress', 'balFocus'])
  // }

  // ngOnDestroy() {
  //   removeProxyOutputListener(this, this.el, ['balInput', 'balBlur', 'balClick', 'balKeyPress', 'balFocus'])
  // }
}


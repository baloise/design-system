import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsInput as DsInputElement } from '../generated/proxies'
import { DsValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-input` proxy with `ControlValueAccessor` support (value: `string | null`, change
 * event: `dsChange`). Consumers only ever import `DsInput` to use `<ds-input>` at all, so registering
 * `NG_VALUE_ACCESSOR` here — rather than on a separate directive — means `formControlName`/`ngModel` work
 * without any extra opt-in step.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. Keep this list in sync with the
 * `@Component` decorator for `DsInput` in `../generated/proxies.ts` whenever `ds-input`'s props/events change.
 */
@Component({
  selector: 'ds-input',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: [
    'accept',
    'allowedKeyPress',
    'autoInvalidOff',
    'autocapitalize',
    'autocomplete',
    'autocorrect',
    'autofocus',
    'color',
    'debounce',
    'description',
    'disabled',
    'inputmode',
    'invalid',
    'invalidText',
    'label',
    'loading',
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
    'type',
    'value',
  ],
  outputs: ['dsBlur', 'dsKeyPress', 'dsFocus', 'dsClick', 'dsInput', 'dsChange'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInput),
      multi: true,
    },
  ],
})
export class DsInput extends DsInputElement implements ControlValueAccessor, OnInit, OnDestroy {
  private readonly cva = new DsValueAccessor<string | null>(inject(ElementRef).nativeElement, inject(Injector), {
    changeEvent: 'dsChange',
    valueProp: 'value',
  })

  ngOnInit(): void {
    this.cva.init()
  }

  ngOnDestroy(): void {
    this.cva.destroy()
  }

  writeValue(value: string | null): void {
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(isDisabled: boolean): void {
    this.cva.setDisabledState(isDisabled)
  }
}

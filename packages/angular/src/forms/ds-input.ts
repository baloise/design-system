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
import { DsInputInputs, DsInputOutputs } from '../generated/meta'
import { DsInput as DsInputElement } from '../generated/proxies'
import { DsValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-input` proxy with `ControlValueAccessor` support (value: `string | null`, change
 * event: `dsChange`). Consumers only ever import `DsInput` to use `<ds-input>` at all, so registering
 * `NG_VALUE_ACCESSOR` here — rather than on a separate directive — means `formControlName`/`ngModel` work
 * without any extra opt-in step.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsInputInputs`/`DsInputOutputs`
 * are generated from `../generated/proxies.ts` (see `packages/core/config/generate-angular-meta.mjs`), so
 * this stays in sync automatically whenever `ds-input`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-input',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsInputInputs,
  outputs: DsInputOutputs,
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

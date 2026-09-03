import { Injector } from '@angular/core'
import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms'
import { Subscription } from 'rxjs'

interface DsFormElement {
  disabled: boolean
  invalid: boolean
  invalidText: string
  autoInvalidOff: boolean
  [prop: string]: unknown
}

/**
 * `ControlValueAccessor` logic shared by the design-system's form-component wrappers, used via composition
 * rather than inheritance: the concrete wrapper (e.g. `DsInput`) already extends the generated proxy class
 * for its inputs/outputs, and Angular doesn't allow a `@Directive()` to extend a `@Component()` (`NG0903`) —
 * so this can't be a base class the wrapper also `extends`. Instead the wrapper constructs one as a field
 * (`new DsValueAccessor(inject(ElementRef).nativeElement, inject(Injector), config)`) and delegates its four
 * `ControlValueAccessor` methods plus `init`/`destroy` (from the wrapper's own `ngOnInit`/`ngOnDestroy`) to
 * it. Deliberately a plain, undecorated class implementing no Angular-recognized lifecycle interface (no
 * `@Injectable()`, no `OnInit`/`OnDestroy`) — it's always constructed and driven manually, never resolved or
 * hooked into by Angular's own DI/lifecycle machinery, so `element`/`injector` are passed in explicitly by
 * the wrapper's own `inject()` calls rather than this class calling `inject()` itself.
 *
 * Subclasses configure which DOM event carries value changes (`changeEvent`) and which property holds the
 * value (`valueProp`); this handles writeValue/registerOnChange/registerOnTouched/setDisabledState, plus
 * deriving `invalid`/`invalidText` from `NgControl` once the control is touched.
 */
export class DsValueAccessor<Value> implements ControlValueAccessor {
  private ngControl: NgControl | null = null
  private statusSubscription?: Subscription

  private onChange: (value: Value) => void = () => {}
  private onTouched: () => void = () => {}

  constructor(
    private readonly element: HTMLElement & DsFormElement,
    private readonly injector: Injector,
    private readonly config: { changeEvent: string; valueProp: string },
  ) {}

  private readonly handleChange = (event: Event) => {
    this.onChange((event as CustomEvent<Value>).detail)
  }

  private readonly handleBlur = () => {
    this.onTouched()
    this.updateInvalidState()
  }

  init(): void {
    // Resolved lazily (not from the constructor) to avoid a circular dependency: NgControl depends on the
    // NG_VALUE_ACCESSOR the wrapper component provides.
    this.ngControl = this.injector.get(NgControl, null)

    this.element.addEventListener(this.config.changeEvent, this.handleChange)
    this.element.addEventListener('dsBlur', this.handleBlur)

    // `NgControl.control` (e.g. `FormControlName.control`) is assigned by that directive's own
    // `ngOnChanges`, which may not have run yet at this point — sibling directives on the same
    // element don't have a guaranteed relative hook order. Deferring to a microtask lets the
    // current synchronous change-detection pass (which includes that `ngOnChanges`) finish first.
    queueMicrotask(() => {
      // `events` (not `statusChanges`) so a bare `markAsTouched()`/`markAllAsTouched()` — e.g. a
      // submit-button pattern with no value or status change — still re-derives invalid state.
      this.statusSubscription = this.ngControl?.control?.events?.subscribe(() => this.updateInvalidState())
      this.updateInvalidState()
    })
  }

  destroy(): void {
    this.element.removeEventListener(this.config.changeEvent, this.handleChange)
    this.element.removeEventListener('dsBlur', this.handleBlur)
    this.statusSubscription?.unsubscribe()
  }

  writeValue(value: Value): void {
    this.element[this.config.valueProp] = value
  }

  registerOnChange(fn: (value: Value) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.element.disabled = isDisabled
  }

  private updateInvalidState(): void {
    const element = this.element
    if (element.autoInvalidOff) {
      return
    }

    const control = this.ngControl?.control
    const isInvalid = !!control?.touched && !!control?.invalid

    element.invalid = isInvalid
    element.invalidText = isInvalid ? this.firstErrorMessage(control?.errors ?? null) : ''
  }

  private firstErrorMessage(errors: ValidationErrors | null): string {
    const [key, value] = Object.entries(errors ?? {})[0] ?? []
    if (key === undefined) {
      return ''
    }
    return typeof value === 'string' ? value : key
  }
}

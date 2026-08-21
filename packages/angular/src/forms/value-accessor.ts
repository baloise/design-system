import { Directive, ElementRef, inject, Injector, OnDestroy, OnInit } from '@angular/core'
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
 * Shared `ControlValueAccessor` base for design-system form components. Subclasses declare which
 * DOM event carries value changes (`changeEvent`) and which property holds the value (`valueProp`);
 * the rest — writeValue/registerOnChange/registerOnTouched/setDisabledState, plus deriving
 * `invalid`/`invalidText` from `NgControl` once the control is touched — is handled here.
 */
@Directive()
export abstract class DsValueAccessor<Value> implements ControlValueAccessor, OnInit, OnDestroy {
  protected abstract readonly changeEvent: string
  protected abstract readonly valueProp: string

  private readonly elementRef = inject(ElementRef<HTMLElement & DsFormElement>)
  private readonly injector = inject(Injector)

  private ngControl: NgControl | null = null
  private statusSubscription?: Subscription

  private onChange: (value: Value) => void = () => {}
  private onTouched: () => void = () => {}

  private readonly handleChange = (event: Event) => {
    this.onChange((event as CustomEvent<Value>).detail)
  }

  private readonly handleBlur = () => {
    this.onTouched()
    this.updateInvalidState()
  }

  ngOnInit(): void {
    // Resolved lazily via the injector (not the constructor) to avoid a circular dependency:
    // NgControl depends on the NG_VALUE_ACCESSOR this directive provides.
    this.ngControl = this.injector.get(NgControl, null)

    const element = this.elementRef.nativeElement
    element.addEventListener(this.changeEvent, this.handleChange)
    element.addEventListener('dsBlur', this.handleBlur)

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

  ngOnDestroy(): void {
    const element = this.elementRef.nativeElement
    element.removeEventListener(this.changeEvent, this.handleChange)
    element.removeEventListener('dsBlur', this.handleBlur)
    this.statusSubscription?.unsubscribe()
  }

  writeValue(value: Value): void {
    this.elementRef.nativeElement[this.valueProp] = value
  }

  registerOnChange(fn: (value: Value) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled
  }

  private updateInvalidState(): void {
    const element = this.elementRef.nativeElement
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

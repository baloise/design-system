import { Directive, ElementRef, HostListener } from '@angular/core'
import { ControlValueAccessor, FormControl } from '@angular/forms'
import { ReplaySubject, Subject, takeUntil } from 'rxjs'
import { BaloiseDesignSystemAngularConfig } from '..'

@Directive()
export class ValueAccessor implements ControlValueAccessor {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  protected invalidSubject = new Subject<void>()

  private onChange: (value: any) => void = () => {
    /**/
  }

  private onTouched: () => void = () => {
    /**/
  }

  protected lastValue: any

  public control!: FormControl
  public config!: BaloiseDesignSystemAngularConfig

  constructor(protected el: ElementRef) {}

  ngOnInit(): void {
    this.invalidSubject.pipe(takeUntil(this.destroyed$)).subscribe({
      next: () => {
        this.setInvalidState()
      },
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }

  writeValue(value: any) {
    this.el.nativeElement.value = this.lastValue = value == null ? '' : value
    this.invalidSubject.next()
  }

  handleChangeEvent(event: CustomEvent<any>) {
    if (this.el.nativeElement === event.target) {
      const value = event.detail
      if (value !== this.lastValue) {
        this.lastValue = value
        this.onChange(value)
      }
    }
  }

  @HostListener('balBlur', ['$event.target'])
  handleBlurEvent(el: any) {
    if (el === this.el.nativeElement) {
      this.onTouched()
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = value => {
      fn(value)
      this.invalidSubject.next()
    }
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = () => {
      fn()
      this.invalidSubject.next()
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.el.nativeElement.disabled = isDisabled

    const field = this.getField()
    if (field) {
      field.disabled = isDisabled
    }
  }

  getField(): any | undefined {
    if (this.el && this.el.nativeElement) {
      return this.el.nativeElement.closest('bal-field') || undefined
    }
    return undefined
  }

  setInvalidState() {
    if (this.config?.forms?.setInvalid === true) {
      const invalid = this.control.touched && this.control.invalid
      this.el.nativeElement.invalid = invalid

      const field = this.getField()
      if (field) {
        field.invalid = invalid
      }
    }
  }
}

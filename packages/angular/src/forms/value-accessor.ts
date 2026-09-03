import { ElementRef, inject, Injector, OnDestroy, OnInit } from '@angular/core'
import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms'
import { Subscription } from 'rxjs'

interface DsFormElement {
  disabled: boolean
  invalid: boolean
  invalidText: string
  autoInvalidOff: boolean
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
 * Subclasses configure which DOM event carries value changes (`changeEvent`), which DOM event marks the
 * control touched (`blurEvent`), and which property holds the value (`valueProp`); this handles
 * writeValue/registerOnChange/registerOnTouched/setDisabledState, plus deriving `invalid`/`invalidText`
 * from `NgControl` once the control is touched.
 *
 * `Element` is the concrete native element interface (e.g. `HTMLDsInputElement`) and `K` the key of its
 * value property (e.g. `'value'`, or `'checked'` for a future `ds-checkbox`) — tying `valueProp` to an
 * actual key of `Element` means a typo or a mismatched property doesn't silently compile. Constrained to
 * `EventTarget` (not `HTMLElement`): the generated `HTMLDs*Element` interfaces don't structurally satisfy
 * `HTMLElement` (e.g. their spec-accurate `autocorrect: InputAutocorrect` collides with lib.dom's own,
 * differently-typed `autocorrect`), and this class only ever needs `addEventListener`/`removeEventListener`
 * plus the `DsFormElement` properties, both of which `EventTarget & DsFormElement` already covers.
 */
export class DsValueAccessor<
  Element extends EventTarget & DsFormElement,
  K extends keyof Element,
> implements ControlValueAccessor {
  private ngControl: NgControl | null = null
  private statusSubscription?: Subscription
  // The `AbstractControl` instance currently backing `statusSubscription`, so `subscribeToControl()` can
  // tell a rebind (e.g. a consumer replacing the whole `FormGroup`) apart from a no-op re-check.
  private subscribedControl: NgControl['control'] = null
  private destroyed = false

  private onChange: (value: Element[K]) => void = () => {}
  private onTouched: () => void = () => {}

  constructor(
    private readonly element: Element,
    private readonly injector: Injector,
    private readonly config: { changeEvent: string; blurEvent: string; valueProp: K },
  ) {}

  private readonly handleChange = (event: Event) => {
    this.onChange((event as CustomEvent<Element[K]>).detail)
  }

  private readonly handleBlur = () => {
    // Just notify the control; don't also derive invalid state from here. `onTouched()` (wired up by
    // e.g. `FormControlName`) marks the control touched, which — like the value change `onChange()`
    // triggers on the change event — is itself observed via the `control.events` subscription below,
    // so invalid state always reacts to the control's own authoritative state rather than assuming
    // `blurEvent` and the change event fire in any particular order relative to each other.
    this.onTouched()
  }

  init(): void {
    this.destroyed = false

    // Resolved lazily (not from the constructor) to avoid a circular dependency: NgControl depends on the
    // NG_VALUE_ACCESSOR the wrapper component provides.
    this.ngControl = this.injector.get(NgControl, null)

    this.element.addEventListener(this.config.changeEvent, this.handleChange)
    this.element.addEventListener(this.config.blurEvent, this.handleBlur)

    // `NgControl.control` (e.g. `FormControlName.control`) is assigned by that directive's own
    // `ngOnChanges`, which may not have run yet at this point — sibling directives on the same
    // element don't have a guaranteed relative hook order. Deferring to a microtask lets the
    // current synchronous change-detection pass (which includes that `ngOnChanges`) finish first.
    queueMicrotask(() => {
      // `init()`/`destroy()` can both run within the same synchronous tick (e.g. a fast `*ngIf`
      // toggle) — bail out rather than subscribing after the fact and leaking.
      if (this.destroyed) {
        return
      }

      // Also re-derives invalid state as a side effect (see `subscribeToControl()`).
      this.subscribeToControl()
    })
  }

  /**
   * Re-checks `NgControl.control` against the instance `statusSubscription` is currently attached to, and
   * re-subscribes if it changed. `NgControl.control` is a plain property, not observable: a consumer
   * replacing the whole bound form (e.g. `this.form = new FormGroup({...})` rather than `patchValue`/
   * `reset`) makes the directive (e.g. `FormControlName`) repoint `control` at a new `AbstractControl`
   * with no event marking the swap, so without this check `statusSubscription` would keep listening to
   * the old, discarded control and `invalid`/`invalidText` would freeze at their pre-swap values. Called
   * from `writeValue()` (see there) rather than a lifecycle hook: Angular's forms machinery always calls
   * `writeValue()` as part of `setUpControl()` when a directive like `FormControlName` re-points `control`
   * at a new instance — synchronously, as part of checking the *host* view, so this fires reliably even
   * when the wrapper component itself is `OnPush` and not otherwise marked dirty.
   */
  private subscribeToControl(): void {
    const control = this.ngControl?.control ?? null
    if (control === this.subscribedControl) {
      return
    }

    this.statusSubscription?.unsubscribe()
    this.subscribedControl = control
    // `events` (not `statusChanges`) so a bare `markAsTouched()`/`markAllAsTouched()` — e.g. a
    // submit-button pattern with no value or status change — still re-derives invalid state.
    this.statusSubscription = control?.events?.subscribe(() => this.updateInvalidState())
    // Re-derive immediately too: the new control's `touched`/`invalid` state may already differ from
    // the old one (e.g. the new control is already touched-and-invalid), and nothing else guarantees a
    // fresh `events` emission right after the swap.
    this.updateInvalidState()
  }

  destroy(): void {
    this.destroyed = true
    this.element.removeEventListener(this.config.changeEvent, this.handleChange)
    this.element.removeEventListener(this.config.blurEvent, this.handleBlur)
    this.statusSubscription?.unsubscribe()
    this.subscribedControl = null
  }

  writeValue(value: Element[K]): void {
    // Also re-checks the subscribed control (see `subscribeToControl()`): Angular calls `writeValue()`
    // synchronously whenever `setUpControl()` (re-)runs, which includes a consumer swapping the whole
    // bound `AbstractControl`, so this is the reliable point to notice that rather than a lifecycle hook.
    this.subscribeToControl()
    this.element[this.config.valueProp] = value
  }

  registerOnChange(fn: (value: Element[K]) => void): void {
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

    // No bound `NgControl` (e.g. `<ds-input>` used outside reactive forms/`ngModel`) — there's nothing to
    // derive `invalid`/`invalidText` from, so leave whatever the consumer has set on the element alone
    // rather than overwriting it with a false negative.
    const control = this.ngControl?.control
    if (!control) {
      return
    }

    const isInvalid = !!control.touched && !!control.invalid

    element.invalid = isInvalid
    element.invalidText = isInvalid ? this.firstErrorMessage(control.errors) : ''
  }

  private firstErrorMessage(errors: ValidationErrors | null): string {
    const [key, value] = Object.entries(errors ?? {})[0] ?? []
    if (key === undefined) {
      return ''
    }
    return typeof value === 'string' ? value : key
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T

/**
 * Class mixin (the standard pattern for adding behavior to a class whose base is dynamic — used the same
 * way by e.g. Angular Material's `mixinDisabled`/`mixinColor`) that adds full `ControlValueAccessor` support
 * to `Base`, wired up to a `DsValueAccessor` constructed from `config`. This is what lets every form
 * component's wrapper (`DsInput`, and future ones under `src/forms/`) skip re-declaring the same
 * `NG_VALUE_ACCESSOR` delegation by hand: `class DsInput extends withValueAccessor<HTMLDsInputElement,
 * 'value'>(config)(DsInputElement) {}`.
 *
 * A mixin — a function returning `class extends Base { ... }` — rather than a second, separately `extends`-ed
 * base class: JS/TS only allow a class to `extends` one thing, and the wrapper already needs to extend the
 * generated proxy class (`DsInputElement`) for its `@Input`/`@Output` bindings, so the CVA behavior has to be
 * layered onto that same chain rather than living in a class of its own.
 */
export function withValueAccessor<Element extends EventTarget & DsFormElement, K extends keyof Element>(config: {
  changeEvent: string
  blurEvent: string
  valueProp: K
}) {
  return function <TBase extends Constructor>(Base: TBase) {
    return class extends Base implements ControlValueAccessor, OnInit, OnDestroy {
      // Public rather than private: a mixin's anonymous class type is part of this function's public return
      // type, and TS can't emit a `.d.ts` declaration for an exported type that has a private/protected member.
      readonly controlValueAccessor = new DsValueAccessor<Element, K>(
        inject(ElementRef).nativeElement,
        inject(Injector),
        config,
      )

      ngOnInit(): void {
        this.controlValueAccessor.init()
      }

      ngOnDestroy(): void {
        this.controlValueAccessor.destroy()
      }

      writeValue(value: Element[K]): void {
        this.controlValueAccessor.writeValue(value)
      }

      registerOnChange(fn: (value: Element[K]) => void): void {
        this.controlValueAccessor.registerOnChange(fn)
      }

      registerOnTouched(fn: () => void): void {
        this.controlValueAccessor.registerOnTouched(fn)
      }

      setDisabledState(isDisabled: boolean): void {
        this.controlValueAccessor.setDisabledState(isDisabled)
      }
    }
  }
}

import { computed, Inject, Injectable, OnDestroy, signal } from '@angular/core'
import type { DsBreakpointObserver, DsBreakpoints, DsBreakpointSubject, DsBreakpointsUtil } from '@helvetia-design/core'
import { DsTokenBreakpointSubject, DsTokenBreakpoints } from '../utils/token'

@Injectable({ providedIn: 'root' })
export class DsBreakpointsService implements DsBreakpointObserver, OnDestroy {
  private readonly _state = signal<DsBreakpoints>({
    mobile: false,
    tablet: false,
    touch: false,
    desktop: false,
    desktopLg: false,
    desktopXl: false,
    desktop2Xl: false,
  })

  readonly state = computed(() => this._state())
  readonly mobile = computed(() => this._state().mobile)
  readonly tablet = computed(() => this._state().tablet)
  readonly touch = computed(() => this._state().touch)
  readonly desktop = computed(() => this._state().desktop)
  readonly desktopLg = computed(() => this._state().desktopLg)
  readonly desktopXl = computed(() => this._state().desktopXl)
  readonly desktop2Xl = computed(() => this._state().desktop2Xl)

  constructor(
    @Inject(DsTokenBreakpoints) private breakpoints: DsBreakpointsUtil,
    @Inject(DsTokenBreakpointSubject) private breakpointSubject: DsBreakpointSubject,
  ) {
    this._state.set(this.breakpoints.toObject())
    this.breakpointSubject.attach(this)
  }

  listenToBreakpoint(breakpoints: DsBreakpoints): void {
    this._state.set(breakpoints)
  }

  ngOnDestroy(): void {
    this.breakpointSubject.detach(this)
  }
}

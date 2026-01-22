import { ApplicationRef, computed, Inject, Injectable, OnDestroy, signal } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import type { BalBreakpointObserver, BalBreakpoints, BalBreakpointSubject, BalBreakpointsUtil } from '@baloise/ds-core'

import { BalTokenBreakpointSubject, BalTokenBreakpoints } from '../utils/token'

@Injectable({
  providedIn: 'root',
})
export class BalBreakpointsService implements BalBreakpointObserver, OnDestroy {
  private readonly _state = signal({
    mobile: false,
    tablet: false,
    touch: false,
    desktop: false,
    highDefinition: false,
    widescreen: false,
    fullhd: false,
  } as BalBreakpoints)

  readonly state = computed(() => this._state())
  readonly mobile = computed(() => this._state().mobile)
  readonly tablet = computed(() => this._state().tablet)
  readonly touch = computed(() => this._state().touch)
  readonly desktop = computed(() => this._state().desktop)
  readonly highDefinition = computed(() => this._state().highDefinition)
  readonly widescreen = computed(() => this._state().widescreen)
  readonly fullhd = computed(() => this._state().fullhd)

  constructor(
    private app: ApplicationRef,
    @Inject(BalTokenBreakpoints) private breakpoints: BalBreakpointsUtil,
    @Inject(BalTokenBreakpointSubject) private breakpointSubject: BalBreakpointSubject,
  ) {
    this._state.set(this.breakpoints.toObject())
    this.breakpointSubject.attach(this)
  }

  breakpointListener(breakpoints: BalBreakpoints): void {
    this._state.set(breakpoints)
    this.app.tick()
  }

  ngOnDestroy() {
    this.breakpointSubject.detach(this)
  }
}

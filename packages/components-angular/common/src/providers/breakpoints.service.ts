import { ApplicationRef, Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import type {
  BalBreakpointObserver,
  BalBreakpoints,
  BalBreakpointSubject,
  BalBreakpointsUtil,
} from '@baloise/design-system-components/components'

import { BalTokenBreakpointSubject, BalTokenBreakpoints } from '../utils/token'

@Injectable({
  providedIn: 'root',
})
export class BalBreakpointsService implements BalBreakpointObserver {
  private _breakpoints$!: BehaviorSubject<BalBreakpoints>

  state$: Observable<BalBreakpoints>
  mobile$: Observable<boolean>
  tablet$: Observable<boolean>
  touch$: Observable<boolean>
  desktop$: Observable<boolean>
  highDefinition$: Observable<boolean>
  widescreen$: Observable<boolean>
  fullhd$: Observable<boolean>

  constructor(
    private app: ApplicationRef,
    @Inject(BalTokenBreakpoints) private breakpoints: BalBreakpointsUtil,
    @Inject(BalTokenBreakpointSubject) private breakpointSubject: BalBreakpointSubject,
  ) {
    this._breakpoints$ = new BehaviorSubject<BalBreakpoints>(this.breakpoints.toObject())

    this.state$ = this._breakpoints$.asObservable()
    this.mobile$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.mobile))
    this.tablet$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.tablet))
    this.touch$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.touch))
    this.desktop$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.desktop))
    this.highDefinition$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.highDefinition))
    this.widescreen$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.widescreen))
    this.fullhd$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.fullhd))

    this.breakpointSubject.attach(this)
  }

  breakpointListener(breakpoints: BalBreakpoints): void {
    this._breakpoints$.next(breakpoints)
    this.app.tick()
  }

  ngOnDestroy() {
    this.breakpointSubject.detach(this)
  }

  get value(): BalBreakpoints {
    if (this._breakpoints$) {
      return this._breakpoints$.getValue()
    }
    return this.breakpoints.toObject()
  }
}

import { ApplicationRef, Injectable } from '@angular/core'
import {
  BalBreakpointObserver,
  BalBreakpoints,
  balBreakpointSubject,
  balBreakpoints,
} from '@baloise/design-system-components'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class BalBreakpointsService implements BalBreakpointObserver {
  private _breakpoints$ = new BehaviorSubject<BalBreakpoints>(balBreakpoints.toObject())

  state$: Observable<BalBreakpoints>
  mobile$: Observable<boolean>
  tablet$: Observable<boolean>
  touch$: Observable<boolean>
  desktop$: Observable<boolean>
  highDefinition$: Observable<boolean>
  widescreen$: Observable<boolean>
  fullhd$: Observable<boolean>

  constructor(private app: ApplicationRef) {
    this.state$ = this._breakpoints$.asObservable()
    this.mobile$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.mobile))
    this.tablet$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.tablet))
    this.touch$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.touch))
    this.desktop$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.desktop))
    this.highDefinition$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.highDefinition))
    this.widescreen$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.widescreen))
    this.fullhd$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.fullhd))

    balBreakpointSubject.attach(this)
  }

  breakpointListener(breakpoints: BalBreakpoints): void {
    this._breakpoints$.next(breakpoints)
    this.app.tick()
  }

  ngOnDestroy() {
    balBreakpointSubject.detach(this)
  }

  get value(): BalBreakpoints {
    if (this._breakpoints$) {
      return this._breakpoints$.getValue()
    }
    return balBreakpoints.toObject()
  }
}

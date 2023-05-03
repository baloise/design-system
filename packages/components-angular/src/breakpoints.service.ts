import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import {
  Breakpoints,
  BreakpointsHandler,
  BreakpointsHandlerType,
  initialBreakpoints,
} from '@baloise/design-system-components'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class BalBreakpointsService {
  private _breakpoints$: BehaviorSubject<Breakpoints>
  private readonly breakpointsHandler: BreakpointsHandlerType

  state$: Observable<Breakpoints>
  mobile$: Observable<boolean>
  tablet$: Observable<boolean>
  touch$: Observable<boolean>
  desktop$: Observable<boolean>
  highDefinition$: Observable<boolean>
  widescreen$: Observable<boolean>
  fullhd$: Observable<boolean>

  constructor() {
    this._breakpoints$ = new BehaviorSubject<Breakpoints>(initialBreakpoints)
    this.state$ = this._breakpoints$.asObservable()
    this.mobile$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.mobile))
    this.tablet$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.tablet))
    this.touch$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.touch))
    this.desktop$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.desktop))
    this.highDefinition$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.highDefinition))
    this.widescreen$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.widescreen))
    this.fullhd$ = this._breakpoints$.asObservable().pipe(map(breakpoints => breakpoints.fullhd))

    this.breakpointsHandler = BreakpointsHandler()
    if (this.breakpointsHandler) {
      this.breakpointsHandler.connect(breakpoints => this.onChange(breakpoints))
    }
  }

  ngOnDestroy() {
    if (this.breakpointsHandler) {
      this.breakpointsHandler.disconnect()
    }
  }

  get value(): Breakpoints {
    if (this._breakpoints$) {
      return this._breakpoints$.getValue()
    }
    return initialBreakpoints
  }

  private onChange(breakpoints: Breakpoints) {
    if (this._breakpoints$) {
      this._breakpoints$.next(breakpoints)
    }
  }
}

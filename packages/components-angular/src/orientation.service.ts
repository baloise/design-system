import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, map } from 'rxjs'
import {
  Orientation,
  OrientationHandler,
  OrientationHandlerType,
  initialOrientation,
} from '@baloise/design-system-components'

@Injectable({
  providedIn: 'root',
})
export class BalOrientationService {
  private _orientation$: BehaviorSubject<Orientation>
  private readonly orientationHandler: OrientationHandlerType

  state$: Observable<Orientation>
  portrait$: Observable<boolean>
  landscape$: Observable<boolean>

  constructor() {
    this._orientation$ = new BehaviorSubject<Orientation>(initialOrientation)
    this.state$ = this._orientation$.asObservable()
    this.portrait$ = this._orientation$.asObservable().pipe(map(orientation => orientation.portrait))
    this.landscape$ = this._orientation$.asObservable().pipe(map(orientation => orientation.landscape))

    this.orientationHandler = OrientationHandler()
    if (this.orientationHandler) {
      this.orientationHandler.connect(breakpoints => this.onChange(breakpoints))
    }
  }

  ngOnDestroy() {
    if (this.orientationHandler) {
      this.orientationHandler.disconnect()
    }
  }

  get value(): Orientation {
    if (this._orientation$) {
      return this._orientation$.getValue()
    }
    return initialOrientation
  }

  private onChange(orientation: Orientation) {
    if (this._orientation$) {
      this._orientation$.next(orientation)
    }
  }
}

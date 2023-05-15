import { ApplicationRef, Injectable } from '@angular/core'
import { BehaviorSubject, Observable, map } from 'rxjs'
import {
  balOrientationSubject,
  BalOrientationInfo,
  balDevice,
  BalOrientationObserver,
} from '@baloise/design-system-components'

@Injectable({
  providedIn: 'root',
})
export class BalOrientationService implements BalOrientationObserver {
  private _orientation$ = new BehaviorSubject<BalOrientationInfo>(balDevice.orientation.toObject())

  state$: Observable<BalOrientationInfo>
  portrait$: Observable<boolean>
  landscape$: Observable<boolean>

  constructor(private app: ApplicationRef) {
    this.state$ = this._orientation$.asObservable()
    this.portrait$ = this._orientation$.asObservable().pipe(map(orientation => orientation.portrait))
    this.landscape$ = this._orientation$.asObservable().pipe(map(orientation => orientation.landscape))

    balOrientationSubject.attach(this)
  }

  orientationListener(info: BalOrientationInfo): void {
    this._orientation$.next(info)
    this.app.tick()
  }

  ngOnDestroy() {
    balOrientationSubject.detach(this)
  }

  get value(): BalOrientationInfo {
    if (this._orientation$) {
      return this._orientation$.getValue()
    }
    return balDevice.orientation.toObject()
  }
}

import { ApplicationRef, Inject, Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, Observable, map } from 'rxjs'

import type { BalDevice, BalOrientationInfo, BalOrientationObserver, BalOrientationSubject } from '@baloise/ds-core'

import { BalTokenDevice, BalTokenOrientationSubject } from '../utils/token'

@Injectable({
  providedIn: 'root',
})
export class BalOrientationService implements BalOrientationObserver, OnDestroy {
  private _orientation$!: BehaviorSubject<BalOrientationInfo>

  state$: Observable<BalOrientationInfo>
  portrait$: Observable<boolean>
  landscape$: Observable<boolean>

  constructor(
    private app: ApplicationRef,
    @Inject(BalTokenDevice) private device: BalDevice,
    @Inject(BalTokenOrientationSubject) private orientationSubject: BalOrientationSubject,
  ) {
    this._orientation$ = new BehaviorSubject<BalOrientationInfo>(device.orientation.toObject())

    this.state$ = this._orientation$.asObservable()
    this.portrait$ = this._orientation$.asObservable().pipe(map(orientation => orientation.portrait))
    this.landscape$ = this._orientation$.asObservable().pipe(map(orientation => orientation.landscape))

    this.orientationSubject.attach(this)
  }

  orientationListener(info: BalOrientationInfo): void {
    this._orientation$.next(info)
    this.app.tick()
  }

  ngOnDestroy() {
    this.orientationSubject.detach(this)
  }

  get value(): BalOrientationInfo {
    if (this._orientation$) {
      return this._orientation$.getValue()
    }
    return this.device.orientation.toObject()
  }
}

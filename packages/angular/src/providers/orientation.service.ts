import { ApplicationRef, computed, Inject, Injectable, OnDestroy, signal } from '@angular/core'
import { BehaviorSubject, Observable, map } from 'rxjs'

import type { BalDevice, BalOrientationInfo, BalOrientationObserver, BalOrientationSubject } from '@baloise/ds-core'

import { BalTokenDevice, BalTokenOrientationSubject } from '../utils/token'

@Injectable({
  providedIn: 'root',
})
export class BalOrientationService implements BalOrientationObserver, OnDestroy {
  private readonly _state = signal({ portrait: false, landscape: false } as BalOrientationInfo)

  readonly state = computed(() => this._state())
  readonly portrait = computed(() => this._state().portrait)
  readonly landscape = computed(() => this._state().landscape)

  constructor(
    private app: ApplicationRef,
    @Inject(BalTokenDevice) private device: BalDevice,
    @Inject(BalTokenOrientationSubject) private orientationSubject: BalOrientationSubject,
  ) {
    this._state.set(device.orientation.toObject())
    this.orientationSubject.attach(this)
  }

  orientationListener(info: BalOrientationInfo): void {
    this._state.set(info)
    this.app.tick()
  }

  ngOnDestroy() {
    this.orientationSubject.detach(this)
  }
}

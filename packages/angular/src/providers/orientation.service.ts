import { computed, Inject, Injectable, OnDestroy, signal } from '@angular/core'
import type { DsDevice, DsOrientationInfo, DsOrientationObserver, DsOrientationSubject } from '@helvetia-design/core'
import { DsTokenDevice, DsTokenOrientationSubject } from '../utils/token'

@Injectable({ providedIn: 'root' })
export class DsOrientationService implements DsOrientationObserver, OnDestroy {
  private readonly _state = signal<DsOrientationInfo>({ portrait: false, landscape: false })

  readonly state = computed(() => this._state())
  readonly portrait = computed(() => this._state().portrait)
  readonly landscape = computed(() => this._state().landscape)

  constructor(
    @Inject(DsTokenDevice) private device: DsDevice,
    @Inject(DsTokenOrientationSubject) private orientationSubject: DsOrientationSubject,
  ) {
    this._state.set(this.device.orientation.toObject())
    this.orientationSubject.attach(this)
  }

  listenToOrientation(info: DsOrientationInfo): void {
    this._state.set(info)
  }

  ngOnDestroy(): void {
    this.orientationSubject.detach(this)
  }
}

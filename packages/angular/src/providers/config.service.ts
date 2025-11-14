/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, Inject, Injectable, OnDestroy, signal } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import type { BalConfigObserver, BalConfigState, BalIcons, BalLanguage, BalRegion } from '@baloise/ds-core'

import { BalTokenConfig } from '../utils/token'

interface ConfigUtils {
  defaultConfig: any
  attachToConfig: (observer: BalConfigObserver) => void
  detachFromConfig: (observer: BalConfigObserver) => void
  updateBalAllowedLanguages: (allowedLanguages: BalLanguage[]) => void
  updateBalAnimated: (animated: boolean) => void
  updateBalIcons: (icons: BalIcons) => void
  updateBalLanguage: (language: BalLanguage) => void
  updateBalRegion: (region: BalRegion) => void
}

@Injectable({
  providedIn: 'root',
})
export class BalConfigService implements BalConfigObserver, OnDestroy {
  private readonly _state = signal({} as BalConfigState)
  public readonly state = computed(() => this._state())

  constructor(@Inject(BalTokenConfig) private config: ConfigUtils) {
    this.config.attachToConfig(this)
  }

  setLanguage(language: BalLanguage) {
    this.config.updateBalLanguage(language)
  }

  setRegion(region: BalRegion) {
    this.config.updateBalRegion(region)
  }

  setAnimated(animated: boolean) {
    this.config.updateBalAnimated(animated)
  }

  setIcons(icons: BalIcons) {
    this.config.updateBalIcons(icons)
  }

  setAllowedLanguages(languages: BalLanguage[]) {
    this.config.updateBalAllowedLanguages(languages)
  }

  configChanged(state: BalConfigState): void {
    this._state.set(state)
  }

  ngOnDestroy(): void {
    this.config.detachFromConfig(this)
  }
}

import { computed, Inject, Injectable, OnDestroy, signal } from '@angular/core'
import { defaultConfig } from '@helvetia-design/core'
import type { DsConfigObserver, DsConfigState, DsIcons, DsLanguage, DsRegion } from '@helvetia-design/core'
import { DsTokenConfig, type DsConfigUtils } from '../utils/token'

@Injectable({ providedIn: 'root' })
export class DsConfigService implements DsConfigObserver, OnDestroy {
  private readonly _state = signal<DsConfigState>({ ...defaultConfig })

  readonly state = computed(() => this._state())

  constructor(@Inject(DsTokenConfig) private config: DsConfigUtils) {
    this.config.attachToConfig(this)
  }

  setLanguage(language: DsLanguage): void {
    this.config.updateDsLanguage(language)
  }

  setRegion(region: DsRegion): void {
    this.config.updateDsRegion(region)
  }

  setAnimated(animated: boolean): void {
    this.config.updateDsAnimated(animated)
  }

  setIcons(icons: DsIcons): void {
    this.config.updateDsIcons(icons)
  }

  setAllowedLanguages(languages: DsLanguage[]): void {
    this.config.updateDsAllowedLanguages(languages)
  }

  configChanged(state: DsConfigState): void {
    this._state.set(state)
  }

  ngOnDestroy(): void {
    this.config.detachFromConfig(this)
  }
}

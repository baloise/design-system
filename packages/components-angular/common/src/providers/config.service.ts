import { Injectable, OnDestroy } from '@angular/core'
import {
  BalConfigObserver,
  BalConfigState,
  BalIcons,
  BalLanguage,
  BalRegion,
  attachToConfig,
  defaultConfig,
  detachFromConfig,
  updateBalAllowedLanguages,
  updateBalAnimated,
  updateBalIcons,
  updateBalLanguage,
  updateBalRegion,
} from '@baloise/design-system-components'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BalConfigService implements BalConfigObserver, OnDestroy {
  private subject = new BehaviorSubject(defaultConfig)
  public state$ = this.subject.asObservable()

  constructor() {
    attachToConfig(this)
  }

  setLanguage(language: BalLanguage) {
    updateBalLanguage(language)
  }

  setRegion(region: BalRegion) {
    updateBalRegion(region)
  }

  setAnimated(animated: boolean) {
    updateBalAnimated(animated)
  }

  setIcons(icons: BalIcons) {
    updateBalIcons(icons)
  }

  setAllowedLanguages(languages: BalLanguage[]) {
    updateBalAllowedLanguages(languages)
  }

  configChanged(state: BalConfigState): void {
    this.subject.next(state)
  }

  ngOnDestroy(): void {
    detachFromConfig(this)
  }
}

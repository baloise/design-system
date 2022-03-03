import { BALOISE_SESSION_KEY } from './config.const'
import { BalConfig, BalConfigState, BalLanguage, BalRegion } from './config.types'
import { BalConfigObserver } from './observable/observer'

export class Config {
  private _observers: BalConfigObserver[] = []
  private _config: BalConfigState = {
    region: 'CH',
    language: 'de',
    allowedLanguages: ['de', 'fr', 'it', 'en'],
  }

  get locale(): string {
    return `${this._config.language}-${this._config.region}`
  }

  get region(): BalRegion {
    return this._config.region
  }

  set region(region: BalRegion) {
    if (region !== this._config.region) {
      this._config.region = region
      this._notify()
    }
  }

  get language(): BalLanguage {
    return this._config.language
  }

  set language(language: BalLanguage) {
    if (language !== this._config.language) {
      this._config.language = language
      this._notify()
    }
  }

  get allowedLanguages(): BalLanguage[] {
    return this._config.allowedLanguages
  }

  set allowedLanguages(allowedLanguages: BalLanguage[]) {
    if (allowedLanguages !== this._config.allowedLanguages) {
      this._config.allowedLanguages = allowedLanguages
      this._notify()
    }
  }

  attach(observer: BalConfigObserver): void {
    const isExist = this._observers.includes(observer)
    if (isExist) {
      return console.log('Subject: Observer has been attached already.')
    }

    this._observers.push(observer)
    observer.configChanged(this._config)
  }

  detach(observer: BalConfigObserver): void {
    const observerIndex = this._observers.indexOf(observer)
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.')
    }

    this._observers.splice(observerIndex, 1)
  }

  toString() {
    return JSON.stringify(this._config)
  }

  reset(config: BalConfig) {
    this._config = {
      ...this._config,
      ...config,
    }
    this._notify()
  }

  private _notify() {
    for (const observer of this._observers) {
      observer.configChanged(this._config)
    }
    saveConfig(window, this._config)
  }
}

export const config = /*@__PURE__*/ new Config()

export const configFromSession = (win: Window): any => {
  try {
    const configStr = win.sessionStorage.getItem(BALOISE_SESSION_KEY)
    return configStr !== null ? JSON.parse(configStr) : {}
  } catch (e) {
    return {}
  }
}

export const saveConfig = (win: Window, c: any) => {
  try {
    win.sessionStorage.setItem(BALOISE_SESSION_KEY, JSON.stringify(c))
  } catch (e) {
    return
  }
}

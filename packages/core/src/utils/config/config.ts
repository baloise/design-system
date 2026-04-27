import { DsLogger } from '../log'
import { DS_ANIMATION_KEY } from './config.const'
import { defaultConfig } from './config.default'
import { DsBrand, DsConfig, DsConfigState, DsIcons, DsLanguage, DsRegion } from './config.types'
import { DsConfigObserver } from './observable/observer'

export class Config {
  private _componentObservers: DsConfigObserver[] = []
  private _observers: DsConfigObserver[] = []
  private _config: DsConfigState = defaultConfig

  public _jmp?: (c: any) => any
  public _raf?: (c: any) => number
  public _ael?: (el: any, eventName: string, listener: any, options: any) => void
  public _rel?: (el: any, eventName: string, listener: any, options: any) => void
  public _ce?: (eventName: string, opts?: any) => any

  get brand(): DsBrand {
    return this._config.brand
  }

  set brand(brand: DsBrand) {
    if (brand !== this._config.brand) {
      this._config.brand = brand
      this._notify()
    }
  }

  get locale(): string {
    return `${this._config.language}-${this._config.region}`
  }

  get region(): DsRegion {
    return this._config.region
  }

  set region(region: DsRegion) {
    if (region !== this._config.region) {
      this._config.region = region
      this._notify()
    }
  }

  get language(): DsLanguage {
    return this._config.language
  }

  set language(language: DsLanguage) {
    if (language !== this._config.language) {
      if (this._config.allowedLanguages.includes(language)) {
        this._config.language = language
      } else {
        this._config.language = this._config.fallbackLanguage
      }

      this._notify()
    }
  }

  get allowedLanguages(): DsLanguage[] {
    return this._config.allowedLanguages
  }

  set allowedLanguages(allowedLanguages: DsLanguage[]) {
    if (allowedLanguages !== this._config.allowedLanguages) {
      this._config.allowedLanguages = allowedLanguages
      this._notify()
    }
  }

  get icons(): DsIcons {
    return this._config.icons
  }

  set icons(icons: DsIcons) {
    this._config.icons = {
      ...this._config.icons,
      ...icons,
    }
    this._notify()
  }

  get logger(): DsLogger {
    return this._config.logger
  }

  set logger(logger: DsLogger) {
    this._config.logger = { ...logger }
    this._notify()
  }

  get animated(): boolean {
    return this._config.animated
  }

  set animated(animated: boolean) {
    this._config.animated = animated
    this._notify()
  }

  get httpFormSubmit(): boolean {
    return this._config.httpFormSubmit
  }

  set httpFormSubmit(httpFormSubmit: boolean) {
    this._config.httpFormSubmit = httpFormSubmit
    this._notify()
  }

  attach(observer: DsConfigObserver): void {
    const isExist = this._observers.includes(observer)
    if (isExist) {
      return console.log('Subject: Observer has been attached already.')
    }

    this._observers.push(observer)
    observer.configChanged(this._config)
  }

  detach(observer: DsConfigObserver): void {
    const observerIndex = this._observers.indexOf(observer)
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.')
    }

    this._observers.splice(observerIndex, 1)
  }

  attachComponent(observer: DsConfigObserver): void {
    const isExist = this._componentObservers.includes(observer)
    if (isExist) {
      return console.log('Subject: Observer has been attached already.')
    }

    this._componentObservers.push(observer)
    observer.configChanged(this._config)
  }

  detachComponent(observer: DsConfigObserver): void {
    const observerIndex = this._componentObservers.indexOf(observer)
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.')
    }

    this._componentObservers.splice(observerIndex, 1)
  }

  toString() {
    return JSON.stringify(this._config)
  }

  reset(config: DsConfig) {
    this._config = {
      ...this._config,
      ...config,
      icons: {
        ...this._config.icons,
        ...config.icons,
      },
    }
    this._notify(false)
  }

  private _notify(all = true) {
    for (const observer of this._componentObservers) {
      observer.configChanged(this._config)
    }

    if (all) {
      for (const observer of this._observers) {
        observer.configChanged(this._config)
      }
    }
  }
}

export const config = /*@__PURE__*/ new Config()

export const configFromLocalStorage = (win: Window): any => {
  try {
    const animated = JSON.parse(win.localStorage.getItem(DS_ANIMATION_KEY) || 'true')

    if (animated !== null) {
      return {
        animated,
      }
    }

    return {}
  } catch (e) {
    return {}
  }
}

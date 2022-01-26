import { baloiseDesignSystemConfig } from './config'
import { BALOISE_SESSION_KEY } from './config.const'
import {
  BaloiseDesignSystemBaseConfig,
  BaloiseDesignSystemDynamicConfig,
  BaloiseDesignSystemUserConfig,
} from './config.types'
import { ConfigObserver } from './observable/observer'
import { Subject } from './observable/subject'

export class ConfigStore implements Subject {
  private state: BaloiseDesignSystemBaseConfig = {
    applyPolyfills: false,
    region: 'CH',
    language: 'de',
  }

  private observers: ConfigObserver[] = []

  constructor(private win: Window) {}

  attach(observer: ConfigObserver): void {
    const isExist = this.observers.includes(observer)
    if (isExist) {
      return console.log('Subject: Observer has been attached already.')
    }

    this.observers.push(observer)
  }

  detach(observer: ConfigObserver): void {
    const observerIndex = this.observers.indexOf(observer)
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.')
    }

    this.observers.splice(observerIndex, 1)
  }

  reset(userConfig: BaloiseDesignSystemUserConfig): void {
    this.state = {
      ...this.state,
      ...this.configFromSession(),
      ...userConfig,
    }
    this.notify()
  }

  patch(dynamicConfig: BaloiseDesignSystemDynamicConfig): void {
    this.state = {
      ...this.state,
      ...dynamicConfig,
    }
    this.notify()
  }

  toString() {
    return JSON.stringify(this.state)
  }

  notify() {
    if (this.win) {
      if (!(this.win as any).BaloiseDesignSystem) {
        ;(this.win as any).BaloiseDesignSystem = {}
      }
      ;(this.win as any).BaloiseDesignSystem.config = baloiseDesignSystemConfig
      this.saveConfig()
    }
    for (const observer of this.observers) {
      observer.configChanged(baloiseDesignSystemConfig)
    }
  }

  private configFromSession(): any {
    try {
      const configStr = this.win.sessionStorage.getItem(BALOISE_SESSION_KEY)
      return configStr !== null ? JSON.parse(configStr) : {}
    } catch (e) {
      return {}
    }
  }

  private saveConfig() {
    try {
      this.win.sessionStorage.setItem(BALOISE_SESSION_KEY, this.toString())
    } catch (e) {
      return
    }
  }
}

export const configStore = new ConfigStore(window)

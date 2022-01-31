import { BaloiseDesignSystemConfig } from './config'
import { BALOISE_SESSION_KEY } from './config.const'
import { BalConfigState, BalConfig } from './config.types'
import { BalConfigObserver } from './observable/observer'
import { Subject } from './observable/subject'

export const defaultState: BalConfigState = {
  region: 'CH',
  language: 'de',
}

export class BalConfigStore implements Subject {
  state: BalConfigState = {
    region: 'CH',
    language: 'de',
  }

  private observers: BalConfigObserver[] = []

  constructor(private win: Window) {}

  attach(observer: BalConfigObserver): void {
    const isExist = this.observers.includes(observer)
    if (isExist) {
      return console.log('Subject: Observer has been attached already.')
    }

    this.observers.push(observer)
  }

  detach(observer: BalConfigObserver): void {
    const observerIndex = this.observers.indexOf(observer)
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.')
    }

    this.observers.splice(observerIndex, 1)
  }

  reset(config: BalConfig): void {
    this.state = {
      ...defaultState,
      ...this.configFromSession(),
      ...config,
    }
    this.notify()
  }

  patch(config: BalConfig): void {
    this.state = {
      ...this.state,
      ...config,
    }
    this.notify()
  }

  toString() {
    return JSON.stringify(this.state)
  }

  notify() {
    this.attachToWindow()
    for (const observer of this.observers) {
      observer.configChanged(BaloiseDesignSystemConfig)
    }
  }

  attachToWindow() {
    if (this.win) {
      if (!(this.win as any).BaloiseDesignSystem) {
        ;(this.win as any).BaloiseDesignSystem = {}
      }
      ;(this.win as any).BaloiseDesignSystem.config = BaloiseDesignSystemConfig
      this.saveConfig()
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

export const balConfigStore = new BalConfigStore(window)

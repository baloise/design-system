import { BalConfigObserver } from '../types'
import { Config } from './config'
import { BalConfigState, BalLanguage, BalRegion } from './config.types'

export * from './initialize'
export * from './config.types'
export * from './config'
export * from './observable/observer'

export type BalConfigChangeFn = (config: BalConfigState) => void

export const onBalConfigChange = (callback: BalConfigChangeFn) => {
  attachComponentToConfig({
    configChanged(state) {
      callback(state)
    },
  })
}

export const useBalConfig = (): Config | undefined => {
  if (typeof (window as any) === 'undefined') {
    return
  }

  const win = window as any
  return win && win.BaloiseDesignSystem && win.BaloiseDesignSystem.config
}

export const attachComponentToConfig = (observer: BalConfigObserver): void => {
  const config = useBalConfig()

  if (config) {
    config.attach(observer)
  }
}

export const detachComponentToConfig = (observer: BalConfigObserver): void => {
  const config = useBalConfig()

  if (config) {
    config.detach(observer)
  }
}

export const updateBalLanguge = (language: BalLanguage): void => {
  const config = useBalConfig()

  if (config) {
    config.language = language
  }
}

export const updateBalRegion = (region: BalRegion): void => {
  const config = useBalConfig()

  if (config) {
    config.region = region
  }
}

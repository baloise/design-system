import { dsBrowser } from '../browser'
import { Config } from './config'
import { DsConfigState, DsIcons, DsLanguage, DsRegion } from './config.types'
import { DsConfigObserver } from './observable/observer'

export type DsConfigChangeFn = (config: DsConfigState) => void

export const onDsConfigChange = (callback: DsConfigChangeFn) => {
  attachToConfig({
    configChanged(state) {
      callback(state)
    },
  })
}

export const useDsConfig = (): Config | undefined => {
  if (!dsBrowser.hasWindow) {
    return undefined
  }

  const win = window as any
  return win && win.DesignSystem && win.DesignSystem.config
}

export const attachToConfig = (observer: DsConfigObserver): void => {
  const config = useDsConfig()

  if (config) {
    config.attach(observer)
  }
}

export const detachFromConfig = (observer: DsConfigObserver): void => {
  const config = useDsConfig()

  if (config) {
    config.detach(observer)
  }
}

export const attachComponentToConfig = (observer: DsConfigObserver): void => {
  const config = useDsConfig()

  if (config) {
    config.attachComponent(observer)
  }
}

export const detachComponentFromConfig = (observer: DsConfigObserver): void => {
  const config = useDsConfig()

  if (config) {
    config.detachComponent(observer)
  }
}

export const updateDsLanguage = (language: DsLanguage): void => {
  const config = useDsConfig()

  if (config) {
    config.language = language
  }
}

export const updateDsRegion = (region: DsRegion): void => {
  const config = useDsConfig()

  if (config) {
    config.region = region
  }
}

export const updateDsAllowedLanguages = (allowedLanguages: DsLanguage[]): void => {
  const config = useDsConfig()

  if (config) {
    config.allowedLanguages = allowedLanguages
  }
}

export const updateDsIcons = (icons: DsIcons): void => {
  const config = useDsConfig()

  if (config) {
    config.icons = {
      ...config.icons,
      ...icons,
    }
  }
}

export const updateDsAnimated = (animated: boolean): void => {
  const config = useDsConfig()

  if (config) {
    config.animated = animated
  }
}

export const updateDsLogger = (components: string[]): void => {
  const config = useDsConfig()

  if (config) {
    config.logger.components = components
    config.logger.render = true
    config.logger.custom = true
    config.logger.event = true
    config.logger.lifecycle = true
  }
}

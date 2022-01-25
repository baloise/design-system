const BALOISE_SESSION_KEY = 'baloise-persist-config'

export interface BaloiseDesignSystemUserConfig {
  applyPolyfills?: boolean
  dateFormat?: string
  decimalSeperator?: string
  thousandSeperator?: string
}

export interface BaloiseDesignSystemConfig {
  applyPolyfills: boolean
  dateFormat: string
  decimalSeperator: string
  thousandSeperator: string
}

export const baloiseDesignSystemDefaultConfig: BaloiseDesignSystemConfig = {
  applyPolyfills: false,
  dateFormat: 'd.M.yyyy',
  decimalSeperator: '.',
  thousandSeperator: "'",
}

export const initialize = (userConfig: BaloiseDesignSystemUserConfig = {}) => {
  if (typeof (window as any) === 'undefined') {
    return
  }

  const win = window as any
  const BaloiseDesignSystem = (win.BaloiseDesignSystem = win.BaloiseDesignSystem || {})

  BaloiseDesignSystem.config = { ...baloiseDesignSystemDefaultConfig, ...configFromSession(win), ...userConfig }
  win.BaloiseDesignSystem = BaloiseDesignSystem

  saveConfig(win, BaloiseDesignSystem.config)
  BaloiseDesignSystem.saveConfig = saveConfig
}

export const getConfig = (): BaloiseDesignSystemConfig => {
  if (typeof (window as any) === 'undefined') {
    return baloiseDesignSystemDefaultConfig
  }

  const win = window
  const BaloiseDesignSystem = (win as any).BaloiseDesignSystem
  return BaloiseDesignSystem.config
}

export const configFromSession = (win: Window): any => {
  try {
    const configStr = win.sessionStorage.getItem(BALOISE_SESSION_KEY)
    return configStr !== null ? JSON.parse(configStr) : {}
  } catch (e) {
    return {}
  }
}

export const saveConfig = (win: any, c: BaloiseDesignSystemConfig) => {
  try {
    win.sessionStorage.setItem(BALOISE_SESSION_KEY, JSON.stringify(c))
    win.BaloiseDesignSystem.config = c
  } catch (e) {
    return
  }
}

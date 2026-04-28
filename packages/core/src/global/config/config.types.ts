import { DsLogger } from '../../utils'

export type DsRegion = 'CH' | 'DE' | 'BE' | 'LU'

export type DsSwissLanguage = 'de' | 'fr' | 'it' | 'en'
export type DsLuxembourgLanguage = 'fr' | 'de' | 'en'
export type DsLuxembourgInternationalLanguage = DsLuxembourgLanguage | 'es' | 'pl' | 'pt' | 'sv' | 'fi'
export type DsBelgiumLanguage = 'fr' | 'nl'
export type DsGermanLanguage = 'de'
export type DsBrand = 'baloise' | 'helvetia'

export type DsLanguage =
  | DsSwissLanguage
  | DsLuxembourgLanguage
  | DsLuxembourgInternationalLanguage
  | DsBelgiumLanguage
  | DsGermanLanguage

export type DsIcons = { [key: string]: string }

export interface DsConfig {
  brand?: DsBrand
  region?: DsRegion
  language?: DsLanguage
  allowedLanguages?: DsLanguage[]
  icons?: DsIcons
  fallbackLanguage?: DsLanguage
  logger?: DsLogger
  animated?: boolean
  httpFormSubmit?: boolean
  _generateHydrateForCustomElementsOutput?: boolean
  _jmp?: (c: any) => any
  _raf?: (c: any) => number
  _ael?: (el: any, eventName: string, listener: any, options: any) => void
  _rel?: (el: any, eventName: string, listener: any, options: any) => void
  _ce?: (eventName: string, opts?: any) => any
}

export interface DsConfigState {
  brand: DsBrand
  region: DsRegion
  language: DsLanguage
  allowedLanguages: DsLanguage[]
  icons: DsIcons
  fallbackLanguage: DsLanguage
  logger: DsLogger
  animated: boolean
  httpFormSubmit: boolean
  _generateHydrateForCustomElementsOutput: boolean
}

export interface DsPlatformConfig {
  jmp?: (c: any) => any
  raf?: (c: any) => number
  ael?: (el: any, eventName: string, listener: any, options: any) => void
  rel?: (el: any, eventName: string, listener: any, options: any) => void
  ce?: (eventName: string, opts?: any) => any
}

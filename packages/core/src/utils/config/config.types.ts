import { BalLogger } from '../log'

export type BalRegion = 'CH' | 'DE' | 'BE' | 'LU'

export type BalSwissLanguage = 'de' | 'fr' | 'it' | 'en'
export type BalLuxembourgLanguage = 'fr' | 'de' | 'en'
export type BalLuxembourgInternationalLanguage = BalLuxembourgLanguage | 'es' | 'pl' | 'pt' | 'sv' | 'fi'
export type BalBelgiumLanguage = 'fr' | 'nl'
export type BalGermanLanguage = 'de'

export type BalLanguage =
  | BalSwissLanguage
  | BalLuxembourgLanguage
  | BalLuxembourgInternationalLanguage
  | BalBelgiumLanguage
  | BalGermanLanguage

export type BalIcons = { [key: string]: string }

export interface BalConfig {
  region?: BalRegion
  language?: BalLanguage
  allowedLanguages?: BalLanguage[]
  icons?: BalIcons
  fallbackLanguage?: BalLanguage
  logger?: BalLogger
  animated?: boolean
  httpFormSubmit?: boolean
  _generateHydrateForCustomElementsOutput?: boolean
  _jmp?: (c: any) => any
  _raf?: (c: any) => number
  _ael?: (el: any, eventName: string, listener: any, options: any) => void
  _rel?: (el: any, eventName: string, listener: any, options: any) => void
  _ce?: (eventName: string, opts?: any) => any
}

export interface BalConfigState {
  region: BalRegion
  language: BalLanguage
  allowedLanguages: BalLanguage[]
  icons: BalIcons
  fallbackLanguage: BalLanguage
  logger: BalLogger
  animated: boolean
  httpFormSubmit: boolean
  _generateHydrateForCustomElementsOutput: boolean
}

export interface BalPlatformConfig {
  jmp?: (c: any) => any
  raf?: (c: any) => number
  ael?: (el: any, eventName: string, listener: any, options: any) => void
  rel?: (el: any, eventName: string, listener: any, options: any) => void
  ce?: (eventName: string, opts?: any) => any
}

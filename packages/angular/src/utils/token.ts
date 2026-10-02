import { InjectionToken } from '@angular/core'
import type {
  DsBreakpointSubject,
  DsBreakpointsUtil,
  DsConfigObserver,
  DsDevice,
  DsIcons,
  DsLanguage,
  DsOrientationSubject,
  DsRegion,
} from '@helvetia-design/core'

export interface DsConfigUtils {
  attachToConfig(observer: DsConfigObserver): void
  detachFromConfig(observer: DsConfigObserver): void
  updateDsLanguage(language: DsLanguage): void
  updateDsRegion(region: DsRegion): void
  updateDsAnimated(animated: boolean): void
  updateDsIcons(icons: DsIcons): void
  updateDsAllowedLanguages(languages: DsLanguage[]): void
}

export const DsTokenBreakpoints = new InjectionToken<DsBreakpointsUtil>('DsTokenBreakpoints')
export const DsTokenBreakpointSubject = new InjectionToken<DsBreakpointSubject>('DsTokenBreakpointSubject')
export const DsTokenDevice = new InjectionToken<DsDevice>('DsTokenDevice')
export const DsTokenOrientationSubject = new InjectionToken<DsOrientationSubject>('DsTokenOrientationSubject')
export const DsTokenConfig = new InjectionToken<DsConfigUtils>('DsTokenConfig')

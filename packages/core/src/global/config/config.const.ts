import { DsBrand, DsConfig, DsLanguage, DsRegion } from './config.types'

export const DS_ANIMATION_KEY = 'ds-animated'

export const DS_CONFIG_META_NAME = 'design-system-config'

// key = HTMLElement.dataset key (camelCase form of the meta tag's data-* attribute)
// value = parses the raw string attribute and assigns it onto the partial config
export const DS_CONFIG_META_ATTRIBUTE_MAP: Record<string, (cfg: Partial<DsConfig>, raw: string) => void> = {
  brand: (cfg, raw) => (cfg.brand = raw as DsBrand),
  region: (cfg, raw) => (cfg.region = raw as DsRegion),
  language: (cfg, raw) => (cfg.language = raw as DsLanguage),
  fallbackLanguage: (cfg, raw) => (cfg.fallbackLanguage = raw as DsLanguage),
  allowedLanguages: (cfg, raw) => (cfg.allowedLanguages = raw.split(',').map(s => s.trim()) as DsLanguage[]),
  animated: (cfg, raw) => (cfg.animated = raw !== 'false'),
}

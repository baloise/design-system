import { DS_CONFIG_META_ATTRIBUTE_MAP, DS_CONFIG_META_NAME } from './config.const'
import { DsConfig } from './config.types'

export const configFromMetaTag = (win: Window): Partial<DsConfig> => {
  try {
    const doc = win.document

    if (!doc) {
      return {}
    }

    const meta = doc.querySelector<HTMLMetaElement>(`meta[name="${DS_CONFIG_META_NAME}"]`)

    if (!meta) {
      return {}
    }

    const result: Partial<DsConfig> = {}

    for (const [dataKey, apply] of Object.entries(DS_CONFIG_META_ATTRIBUTE_MAP)) {
      const raw = meta.dataset[dataKey]

      if (raw !== undefined) {
        apply(result, raw)
      }
    }

    return result
  } catch {
    return {}
  }
}

import { setPlatformHelpers } from '@stencil/core/internal'

import { tags } from './constants/tags.constant'
import { dsBrowser } from '../utils'
import { DsConfig, DsPlatformConfig, setupDsConfig } from './config'
import { VERSION } from './constants/version.constant'
import { dsSnackbarController, dsToastController } from '../components/alert/alert.controller'

export const initializeDesignSystem = (
  userConfig: DsConfig = {},
  platformConfig: DsPlatformConfig | undefined = undefined,
  win = {} as any,
) => {
  if (Object.keys(win).length === 0 && dsBrowser.hasWindow) {
    win = window as any
  }

  win.DesignSystem = win.DesignSystem || {}

  if (platformConfig) {
    setPlatformHelpers(platformConfig)
  }
  setupDsConfig(
    {
      ...userConfig,
      ...platformConfig,
    },
    win,
  )

  win.DesignSystem.toastController = dsToastController
  win.DesignSystem.snackbarController = dsSnackbarController
  win.DesignSystem.initialize = () => setupDsConfig(win.DesignSystem.config, win)
  win.DesignSystem.version = VERSION

  if (userConfig._generateHydrateForCustomElementsOutput) {
    generateHydrateForCustomElementsOutput(tags)
  }
}

/**
 * This function generates the CSS needed for custom elements hydration and inserts it into the document head.
 * The CSS rules include styles for slot fallback and the hydrated class.
 *
 * This is copied from the Stencil core library.
 * src/runtime/bootstrap-lazy.ts
 */
const generateHydrateForCustomElementsOutput = (cmpTags = [] as string[]) => {
  const SLOT_FB_CSS = 'slot-fb{display:contents}slot-fb[hidden]{display:none}'
  const HYDRATED_CSS = '{visibility:hidden}.hydrated{visibility:inherit}'
  const win = typeof window !== 'undefined' ? window : ({} as any)

  if (!win.document) {
    console.warn('Stencil: No document found. Skipping bootstrapping lazy components.')
    return
  }

  const head = win.document.head
  const metaCharset = /* @__PURE__ */ head.querySelector('meta[charset]')
  const dataStyles = /* @__PURE__ */ win.document.createElement('style')

  if (cmpTags.length > 0) {
    dataStyles.textContent += SLOT_FB_CSS
    dataStyles.textContent += cmpTags.sort() + HYDRATED_CSS

    if (dataStyles.innerHTML.length) {
      dataStyles.setAttribute('data-styles', '')
      head.insertBefore(dataStyles, metaCharset ? metaCharset.nextSibling : head.firstChild)
    }
  }
}

import { setPlatformHelpers } from '@stencil/core/internal'

import tags from '../../../resources/data/tags-all.json'
import { balSnackbarController } from './components/bal-snackbar/bal-snackbar.controller'
import { balToastController } from './components/bal-toast/bal-toast.controller'
import { balBrowser } from './utils/browser'
import { BalConfig, BalPlatformConfig, setupConfig } from './utils/config'
import { VERSION } from './utils/constants/version.constant'

export const initializeBaloiseDesignSystem = (
  userConfig: BalConfig = {},
  platformConfig: BalPlatformConfig | undefined = undefined,
  win = {} as any,
) => {
  if (Object.keys(win).length === 0 && balBrowser.hasWindow) {
    win = window as any
  }

  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  if (platformConfig) {
    setPlatformHelpers(platformConfig)
  }
  setupConfig(
    {
      ...userConfig,
      ...platformConfig,
    },
    win,
  )

  win.BaloiseDesignSystem.toastController = balToastController
  win.BaloiseDesignSystem.snackbarController = balSnackbarController
  win.BaloiseDesignSystem.initialize = () => setupConfig(win.BaloiseDesignSystem.config, win)
  win.BaloiseDesignSystem.version = VERSION

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
const generateHydrateForCustomElementsOutput = (cmpTags = []) => {
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

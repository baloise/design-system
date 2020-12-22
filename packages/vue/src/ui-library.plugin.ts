import Vue, { PluginObject } from 'vue'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'

Vue.config.ignoredElements = [/bal-\w*/]

export type BalUiLibraryPluginOption = {
  defineCustomeElements: boolean
}

const BalUiLibraryPluginOptionDefaults: BalUiLibraryPluginOption = {
  defineCustomeElements: true,
}

export const BalUiLibraryPlugin: PluginObject<BalUiLibraryPluginOption> = {
  install(_VueInstance, options): void {
    options = {
      ...BalUiLibraryPluginOptionDefaults,
      ...options,
    }

    if (options.defineCustomeElements === true) {
      applyPolyfills().then(() => defineCustomElements())
    }

    // VueInstance.$balUtils = utils
    // VueInstance.prototype.$balUtils = utils
  },
}

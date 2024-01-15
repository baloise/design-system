'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.updateTsConfig = exports.TS_CONFIG_APP = void 0
exports.TS_CONFIG_APP = 'tsconfig.app.json'
function updateTsConfig(host) {
  if (host.exists(exports.TS_CONFIG_APP)) {
    const json = host.readJson(exports.TS_CONFIG_APP)
    if (json && json.files) {
      const files = json.files
      if (!files.includes('src/polyfills.ts')) {
        json.files = ['src/polyfills.ts', ...files]
      }
      const newTsConfig = JSON.stringify(json, undefined, 2)
      return host.overwrite(exports.TS_CONFIG_APP, newTsConfig)
    }
  }
}
exports.updateTsConfig = updateTsConfig
//# sourceMappingURL=ts-config.gen.js.map

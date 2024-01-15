'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
const schematics_1 = require('@angular-devkit/schematics')
const utility_1 = require('@schematics/angular/utility')
const polyfills_gen_1 = require('./generators/polyfills.gen')
const zone_flags_gen_1 = require('./generators/zone-flags.gen')
const project_gen_1 = require('./generators/project.gen')
const ts_config_gen_1 = require('./generators/ts-config.gen')
const styles_1 = require('./generators/styles')
const i18n_gen_1 = require('./generators/i18n.gen')
const app_get_1 = require('./generators/app.get')
function default_1(options) {
  return (host, context) =>
    __awaiter(this, void 0, void 0, function* () {
      const actions = []
      actions.push((0, schematics_1.mergeWith)((0, polyfills_gen_1.createPolyfillsFile)()))
      actions.push((0, schematics_1.mergeWith)((0, zone_flags_gen_1.createZoneFlagsFile)()))
      ;(0, project_gen_1.updateProjectConfig)(host)
      ;(0, ts_config_gen_1.updateTsConfig)(host)
      ;(0, styles_1.addStyles)(host)
      actions.push(
        (0, utility_1.addRootProvider)(options.project, ({ code, external }) => {
          return code`
    ${external('provideBaloiseDesignSystem', '@baloise/design-system-components-angular/standalone')}({
      defaults: {
        region: '${options.region}',
      }
    })`
        }),
      )
      if (options.i18n) {
        actions.push((0, schematics_1.mergeWith)((0, i18n_gen_1.createI18nFile)()))
        actions.push(
          (0, utility_1.addRootProvider)(options.project, ({ code, external }) => {
            return code`
    {
      provide: ${external('APP_INITIALIZER', '@angular/core')},
      useFactory: ${external('initializeI18n', './i18n.initialize')},
      multi: true,
      deps: [${external('TranslocoService', '@ngneat/transloco')}, ${external(
              'BalConfigService',
              '@baloise/design-system-components-angular/standalone',
            )}],
    }`
          }),
        )
      }
      const nxExample = 'src/app/nx-welcome.component.ts'
      if (host.exists(nxExample)) {
        host.delete(nxExample)
      }
      ;(0, app_get_1.updateAppComponent)(host, options)
      actions.push((0, utility_1.addDependency)('@baloise/design-system-components-angular', 'latest'))
      return (0, schematics_1.chain)(actions)(host, context)
    })
}
exports.default = default_1
//# sourceMappingURL=index.js.map

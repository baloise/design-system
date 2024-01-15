'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createI18nFile = void 0
const schematics_1 = require('@angular-devkit/schematics')
function createI18nFile() {
  return (0, schematics_1.apply)((0, schematics_1.url)(`./files/i18n.initialize`), [
    (0, schematics_1.template)({
      ts: 'ts',
    }),
    (0, schematics_1.move)('/', 'src/app'),
  ])
}
exports.createI18nFile = createI18nFile
//# sourceMappingURL=i18n.gen.js.map

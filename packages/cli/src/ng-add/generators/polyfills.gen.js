'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createPolyfillsFile = void 0
const schematics_1 = require('@angular-devkit/schematics')
function createPolyfillsFile() {
  return (0, schematics_1.apply)((0, schematics_1.url)(`./files/polyfills`), [
    (0, schematics_1.template)({
      ts: 'ts',
    }),
    (0, schematics_1.move)('/', 'src'),
  ])
}
exports.createPolyfillsFile = createPolyfillsFile
//# sourceMappingURL=polyfills.gen.js.map

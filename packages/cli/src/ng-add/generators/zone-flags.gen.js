'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createZoneFlagsFile = void 0
const schematics_1 = require('@angular-devkit/schematics')
function createZoneFlagsFile() {
  return (0, schematics_1.apply)((0, schematics_1.url)(`./files/zone-flags`), [
    (0, schematics_1.template)({
      ts: 'ts',
    }),
    (0, schematics_1.move)('/', 'src'),
  ])
}
exports.createZoneFlagsFile = createZoneFlagsFile
//# sourceMappingURL=zone-flags.gen.js.map

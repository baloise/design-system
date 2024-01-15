'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getWorkspace = exports.getAngularWorkspace = exports.getNXWorkspace = exports.isNxWorkspace = void 0
const schematics_1 = require('@angular-devkit/schematics')
function isNxWorkspace(host) {
  return host.exists('project.json')
}
exports.isNxWorkspace = isNxWorkspace
function getNXWorkspace(host) {
  return getWorkspace(host, 'project.json')
}
exports.getNXWorkspace = getNXWorkspace
function getAngularWorkspace(host) {
  return getWorkspace(host, 'angular.json')
}
exports.getAngularWorkspace = getAngularWorkspace
function getWorkspace(host, path) {
  const configBuffer = host.read(path)
  if (configBuffer === null) {
    throw new schematics_1.SchematicsException(`Could not find (${path})`)
  }
  const config = configBuffer.toString()
  return JSON.parse(config)
}
exports.getWorkspace = getWorkspace
//# sourceMappingURL=workspace.js.map

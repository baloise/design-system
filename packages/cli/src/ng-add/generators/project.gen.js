'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.updateProjectConfig = void 0
const workspace_1 = require('../utils/workspace')
const POLYFILLS = ['./src/polyfills.ts']
const BUDGETS = [
  {
    type: 'initial',
    maximumWarning: '3mb',
    maximumError: '5mb',
  },
  {
    type: 'anyComponentStyle',
    maximumWarning: '2kb',
    maximumError: '4kb',
  },
]
function updateProjectConfig(host) {
  if ((0, workspace_1.isNxWorkspace)(host)) {
    /**
     * Nx Workspace
     */
    const nxConfig = (0, workspace_1.getNXWorkspace)(host)
    nxConfig.targets.build.options.polyfills = POLYFILLS
    nxConfig.targets.build.configurations.production.budgets = BUDGETS
    const newNxConfig = JSON.stringify(nxConfig, undefined, 2)
    return host.overwrite('project.json', newNxConfig)
  } else {
    /**
     * Angular Workspace
     */
    const angularConfig = (0, workspace_1.getAngularWorkspace)(host)
    const projectName = Object.keys(angularConfig.projects)[0]
    angularConfig.projects[projectName].architect.build.options.polyfills = POLYFILLS
    angularConfig.projects[projectName].architect.build.configurations.production.budgets.budgets = BUDGETS
    const newNxConfig = JSON.stringify(angularConfig, undefined, 2)
    return host.overwrite('angular.json', newNxConfig)
  }
}
exports.updateProjectConfig = updateProjectConfig
//# sourceMappingURL=project.gen.js.map

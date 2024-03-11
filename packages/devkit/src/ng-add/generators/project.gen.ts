import { Tree } from '@angular-devkit/schematics'
import { getAngularWorkspace, getNXWorkspace, isNxWorkspace } from '../utils/workspace'

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

export function updateProjectConfig(host: Tree) {
  if (isNxWorkspace(host)) {
    /**
     * Nx Workspace
     */
    const nxConfig = getNXWorkspace(host)
    nxConfig.targets.build.options.polyfills = POLYFILLS
    nxConfig.targets.build.configurations.production.budgets = BUDGETS
    const newNxConfig = JSON.stringify(nxConfig, undefined, 2)
    return host.overwrite('project.json', newNxConfig)
  } else {
    /**
     * Angular Workspace
     */
    const angularConfig = getAngularWorkspace(host) as any
    const projectName = Object.keys(angularConfig.projects)[0]
    angularConfig.projects[projectName].architect.build.options.polyfills = POLYFILLS
    angularConfig.projects[projectName].architect.build.configurations.production.budgets.budgets = BUDGETS
    const newNxConfig = JSON.stringify(angularConfig, undefined, 2)
    return host.overwrite('angular.json', newNxConfig)
  }
}

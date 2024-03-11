import { SchematicsException, Tree } from '@angular-devkit/schematics'
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models'

export function isNxWorkspace(host: Tree): boolean {
  return host.exists('project.json')
}

export function getNXWorkspace(host: Tree): any {
  return getWorkspace(host, 'project.json')
}

export function getAngularWorkspace(host: Tree): WorkspaceSchema {
  return getWorkspace(host, 'angular.json')
}

export function getWorkspace(host: Tree, path: string): WorkspaceSchema {
  const configBuffer = host.read(path)
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`)
  }
  const config = configBuffer.toString()

  return JSON.parse(config)
}

export function getPrefix(host: Tree) {
  if (isNxWorkspace(host)) {
    const config = getNXWorkspace(host)
    return config.prefix
  } else {
    const config = getAngularWorkspace(host)
    const projektKeys = Object.keys(config.projects)
    const mainProject = config.projects[projektKeys[0]]
    return mainProject.prefix
  }
}

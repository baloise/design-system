import { join } from 'path'
import { PrePublishExecutorSchema } from './schema'
import { readdir } from 'fs/promises'
import { copy } from 'fs-extra'

export default async function runExecutor(options: PrePublishExecutorSchema) {
  try {
    const packagesPath = join(options.workspaceRoot, 'packages')
    const packages = (await readdir(packagesPath, { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    const distDeploymentPackages = [
      'brand-icons',
      'icons',
      'devkit',
      'maps',
      'testing',
      'angular',
      'angular-common',
      'angular-module',
      'angular-legacy',
    ]

    for (let index = 0; index < packages.length; index++) {
      const packageName = packages[index]

      const deploymentFolder = distDeploymentPackages.includes(packageName) ? 'dist' : ''

      await copy(
        join(options.workspaceRoot, 'LICENSE'),
        join(options.workspaceRoot, 'packages', packageName, deploymentFolder, 'LICENSE'),
      )
      await copy(
        join(options.workspaceRoot, 'README.md'),
        join(options.workspaceRoot, 'packages', packageName, deploymentFolder, 'README.md'),
      )
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}

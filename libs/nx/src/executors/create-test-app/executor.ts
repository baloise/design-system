import { readdir } from 'fs/promises'
import { join } from 'path'
import prompts from 'prompts'
import { runCommand } from '../utils'
import { CreateTestAppExecutorSchema } from './schema'

export default async function runExecutor(options: CreateTestAppExecutorSchema) {
  try {
    let selectedFramework = options.framework

    if (!selectedFramework) {
      const frameworks: Array<'angular' | 'react'> = ['angular', 'react']
      const framework = await prompts([
        {
          type: 'select',
          name: 'value',
          message: 'Which framework do you want to use?',
          choices: frameworks,
          instructions: false,
        },
      ])
      selectedFramework = frameworks[framework.value]
    }

    const basePath = join(options.workspaceRoot, 'test', selectedFramework, 'base')
    const basePackages = (await readdir(basePath, { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => name !== 'app')

    if (basePackages.length === 0) {
      console.error(`No base packages found for ${selectedFramework}`)
      return { success: false }
    }

    let version = options.version || basePackages[0]
    if (!options.version && basePackages.length > 1) {
      const response = await prompts([
        {
          type: 'select',
          name: 'version',
          message: `What version of the ${selectedFramework} you want to create?`,
          choices: [
            ...basePackages.map(value => {
              return { value }
            }),
          ],
          instructions: false,
        },
      ])
      version = response.version
    }

    if (!version) {
      console.error('Please select a valid version')
      return { success: false }
    }

    if (options.build) {
      await runCommand(`bash build.sh ${version}`, join(options.workspaceRoot, 'test', selectedFramework))
    }

    if (options.start) {
      await runCommand(`npm start`, join(options.workspaceRoot, 'test', selectedFramework, version))
    }

    if (options.test) {
      await runCommand(`npm run e2e`, join(options.workspaceRoot, 'test', selectedFramework, version))
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}

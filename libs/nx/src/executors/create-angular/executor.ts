import { join } from 'path'
import prompts from 'prompts'
import { readdir } from 'fs/promises'
import { CreateAngularExecutorSchema } from './schema'
import { runCommand } from '../utils'

export default async function runExecutor(options: CreateAngularExecutorSchema) {
  try {
    const angularBasePath = join(options.workspaceRoot, 'test', 'angular', 'base')
    const angularBasePackages = (await readdir(angularBasePath, { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => name !== 'app')

    const response = await prompts([
      {
        type: 'select',
        name: 'version',
        message: 'What angular version you want to create?',
        choices: [
          ...angularBasePackages.map(value => {
            return { value }
          }),
        ],
        instructions: false,
      },
    ])

    const { version } = response

    if (!version) {
      console.error('Please select a valid version')
      return { success: false }
    }

    if (options.build) {
      await runCommand(`bash build.sh ${version}`, join(options.workspaceRoot, 'test', 'angular'))
    }

    if (options.start) {
      await runCommand(`npm start`, join(options.workspaceRoot, 'test', 'angular', version))
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}

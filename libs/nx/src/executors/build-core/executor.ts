import { copy } from 'fs-extra'
import { mkdir, readFile, rm, writeFile } from 'fs/promises'
import { dirname, join, sep } from 'path'
import {
  createSourceFile,
  filterInterfaceDeclaration,
  filterModuleDeclaration,
  filterVariableStatement,
  parseFunctionComment,
  parseSelectorComment,
  runCommand,
  scan,
} from '../utils'
import { BuildCoreExecutorSchema } from './schema'

export default async function runExecutor(options: BuildCoreExecutorSchema) {
  try {
    // pre build tasks
    await createContributorList(options)

    // stencil build task
    await runCommand('npx stencil build', join(process.cwd(), options.projectRoot))

    // post build tasks
    await createTagList()
    await copyToDocs(options)
    await cleanUp(options)
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}

/********************************************************************************
 * pre build task
 ********************************************************************************/

// This script loads all the contributors from the GitHub API
// for the documentation
async function createContributorList(options: BuildCoreExecutorSchema) {
  const filePath = join(options.projectRoot, '../../resources/data/contributors.json')
  let contributors = []
  try {
    const res = await fetch('https://api.github.com/repos/baloise/design-system/contributors')
    const json = await res.json()
    contributors = json
      .filter(c => c.type === 'User')
      .map(u => ({
        url: u.html_url,
        name: u.login,
        avatar: u.avatar_url,
      }))
  } catch (_) {
    //
  }
  await writeFile(filePath, JSON.stringify(contributors, undefined, 2))
}

/********************************************************************************
 * post build task
 ********************************************************************************/

// This script creates a list with all the main component tags.
export async function createTagList() {
  const content = await readFile(join('resources/data/components.json'), 'utf-8')
  const json = JSON.parse(content)
  const componentTags = json.components.map(component => component.tag).filter(tag => !tag.startsWith('ds-doc'))

  const filePathAllTags = join('packages/core/src/global/constants/tags.constant.ts')
  await mkdir(dirname(filePathAllTags), { recursive: true })
  await writeFile(filePathAllTags, `export const tags = ${JSON.stringify(componentTags, undefined, 2)}`)

  const reducedTags = componentTags.reduce((acc, newTag) => {
    const hasComponent = acc.some(tag => newTag.startsWith(tag))
    if (!hasComponent && newTag !== 'ds-tab-item' && newTag !== 'ds-notices') {
      acc.push(newTag)
    }
    return acc
  }, [])

  const filePath = join('resources/data/tags.json')
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, JSON.stringify(reducedTags, undefined, 2))
}

async function copyToDocs(options: BuildCoreExecutorSchema) {
  await copy(join(options.projectRoot, 'www'), join('e2e/generated/www'))
}

async function cleanUp(options: BuildCoreExecutorSchema) {
  await rm(join(options.projectRoot, 'icons'), { recursive: true, force: true })
  await rm(join(options.projectRoot, 'playwright'), { recursive: true, force: true })
}

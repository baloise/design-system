import path from 'node:path'
import { SourceFile } from 'ts-morph'
import { CreateComponentWrapperOptions } from './types'
import { ComponentCompilerMeta } from '@stencil/core/internal'
import { createStencilReactComponents } from './create-stencil-react-components'
import { createStencilNextWrapper } from './create-next-wrapper'

/**
 * Asynchronously creates component wrappers for Stencil components.
 *
 * @param {Object} options - The options for creating component wrappers.
 * @param {string} options.stencilPackageName - The name of the Stencil package.
 * @param {Array} options.components - The list of components to create wrappers for.
 * @param {string} options.outDir - The output directory for the generated files.
 * @param {string} options.customElementsDir - The directory for custom elements.
 * @param {Array} [options.excludeComponents] - The list of components to exclude.
 * @param {Object} options.project - The project object used to create source files.
 * @param {boolean} [options.hydrateModule] - Flag indicating whether to create a hydrate module.
 *
 * @returns {Promise<SourceFile[]>} A promise that resolves to an array of created source files.
 */
export const createComponentWrappers = async ({
  stencilPackageName,
  components,
  outDir,
  customElementsDir,
  excludeComponents,
  project,
  hydrateModule,
}: CreateComponentWrapperOptions) => {
  const sourceFiles: SourceFile[] = []
  const filteredComponents = getFilteredComponents(excludeComponents ?? [], components)
  const fileContents: Record<string, string> = {}
  const outputPath = hydrateModule ? path.join(outDir, 'components.server.ts') : path.join(outDir, 'components.ts')
  const stencilReactComponent = createStencilReactComponents({
    components: filteredComponents,
    stencilPackageName,
    customElementsDir,
    hydrateModule,
  })

  fileContents[outputPath] = stencilReactComponent

  if (hydrateModule) {
    const outputPath = path.join(outDir, 'components.ts')
    const clientReExport = createStencilNextWrapper({
      components: filteredComponents,
    })
    fileContents[outputPath] = clientReExport
  }

  await Promise.all(
    Object.entries(fileContents).map(async ([filePath, content]) => {
      const sourceFile = project.createSourceFile(filePath, content, {
        overwrite: true,
      })
      await sourceFile.save()
      sourceFiles.push(sourceFile)
    }),
  )

  return sourceFiles
}

/**
 * Filters out internal and excluded components from a list of components.
 *
 * @param excludeComponents - An array of component tag names to exclude.
 * @param componets - An array of ComponentCompilerMeta objects to filter.
 * @returns An array of ComponentCompilerMeta objects that are not internal and not in the excludeComponents list.
 */
const getFilteredComponents = (
  excludeComponents: string[],
  componets: ComponentCompilerMeta[],
): ComponentCompilerMeta[] =>
  componets.filter(c => {
    if (c.internal === true) {
      /**
       * Skip internal components
       */
      return false
    }

    if (excludeComponents.includes(c.tagName)) {
      /**
       * Skip excluded components
       */
      return false
    }

    return true
  })

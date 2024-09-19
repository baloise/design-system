import { CopyResults, OutputTargetCustom, OutputTargetDistCustomElements } from '@stencil/core/internal'
import { OutputTargetReactOptions } from './types'
import { DIST_CUSTOM_ELEMENTS, DIST_CUSTOM_ELEMENTS_DEFAULT_DIR, HYDRATE_OUTPUT_TARGET, PLUGIN_NAME } from './constants'
import { isNill } from './utils'
import { createComponentWrappers } from './create-component-wrappers'
import { Project } from 'ts-morph'
import { dirname, join } from 'path'
import { Config } from '@stencil/core'

/**
 * Generates a custom output target for React components using Stencil.
 *
 * @param {Object} options - The options for the React output target.
 * @param {string} options.outDir - The output directory for the generated React components.
 * @param {string[]} [options.excludeComponents] - An array of component names to exclude from the output.
 * @param {string} options.stencilPackageName - The name of the Stencil package.
 * @param {boolean} [options.hydrateModule] - Flag indicating whether to include the hydrate module.
 * @returns {OutputTargetCustom} The custom output target configuration.
 *
 * @throws {Error} If the required `dist-custom-elements` output target is not defined in the Stencil configuration.
 * @throws {Error} If the `dist-custom-elements` output target does not have `externalRuntime: false` set.
 * @throws {Error} If the `hydrateModule` option is set but the `dist-hydrate-script` output target is not defined.
 * @throws {Error} If the `outDir` option is not provided.
 * @throws {Error} If the `stencilPackageName` option is not provided and cannot be derived from the package.json file.
 */
export const reactOutputTarget = ({
  outDir,
  excludeComponents,
  stencilPackageName,
  hydrateModule,
}: OutputTargetReactOptions): OutputTargetCustom => {
  let customElementsDir = DIST_CUSTOM_ELEMENTS_DEFAULT_DIR
  let derrivedStencilPackageName = stencilPackageName

  return {
    type: 'custom',
    name: PLUGIN_NAME,
    validate: config => {
      const outputTargets = config.outputTargets || []
      const customElementsOutputTarget = outputTargets.find(
        outputTarget => outputTarget.type === DIST_CUSTOM_ELEMENTS,
      ) as OutputTargetDistCustomElements

      if (isNill(customElementsOutputTarget)) {
        throw new Error(
          `The '${PLUGIN_NAME}' requires '${DIST_CUSTOM_ELEMENTS}' output target. Add { type: '${DIST_CUSTOM_ELEMENTS}' }, to the outputTargets config.`,
        )
      } else {
        customElementsDir = customElementsOutputTarget.dir ?? DIST_CUSTOM_ELEMENTS_DEFAULT_DIR
        /**
         * Validate the configuration for `dist-custom-elements` output target to ensure that
         * the bundle generates its own runtime. This is important because we need to ensure that
         * the Stencil runtime has hydration flags set which the default Stencil runtime does not have.
         */
        if (customElementsOutputTarget.externalRuntime !== false) {
          throw new Error(
            `The '${PLUGIN_NAME}' requires the '${DIST_CUSTOM_ELEMENTS}' output target to have 'externalRuntime: false' set in its configuration.`,
          )
        }
      }

      /**
       * Validate the configuration to ensure that the dist-hydrate-script
       * output target is defined in the Stencil configuration if the hydrateModule is provided.
       */
      if (hydrateModule) {
        const hydrateOutputTarget = outputTargets.find(outputTarget => outputTarget.type === HYDRATE_OUTPUT_TARGET)
        if (isNill(hydrateOutputTarget)) {
          throw new Error(
            `The '${PLUGIN_NAME}' requires '${HYDRATE_OUTPUT_TARGET}' output target when the 'hydrateModule' option is set. Add { type: '${HYDRATE_OUTPUT_TARGET}' }, to the outputTargets config.`,
          )
        }
      }

      if (isNill(outDir)) {
        throw new Error(`The '${PLUGIN_NAME}' requires an 'outDir' option to be provided.`)
      }

      if (isNill(derrivedStencilPackageName)) {
        // check if the package.json file exists
        if (config.sys && config.packageJsonFilePath) {
          const { name: packageName } = JSON.parse(config.sys.readFileSync(config.packageJsonFilePath, 'utf8'))
          derrivedStencilPackageName = packageName
        }

        if (!isNill(derrivedStencilPackageName)) {
          throw new Error(
            `The '${PLUGIN_NAME}' could not find the package name in the package.json file: ${config.packageJsonFilePath}. Please provide the stencilPackageName manually to the ${PLUGIN_NAME} output target.`,
          )
        }
      }
    },
    async generator(config, compilerCtx, buildCtx) {
      const timespan = buildCtx.createTimeSpan(`generate ${PLUGIN_NAME} started`, true)
      const components = buildCtx.components

      const project = new Project()

      const sourceFiles = await createComponentWrappers({
        outDir,
        components,
        stencilPackageName: derrivedStencilPackageName as string,
        customElementsDir,
        excludeComponents,
        project,
        hydrateModule,
      })

      await Promise.all(
        sourceFiles.map(sourceFile => compilerCtx.fs.writeFile(sourceFile.getFilePath(), sourceFile.getFullText())),
      )

      await copyResources(config, outDir)

      timespan.finish(`generate ${PLUGIN_NAME} finished`)
    },
  }
}

/**
 * Copies resources from the source directory to the destination directory.
 *
 * @param {Config} config - The configuration object which includes system utilities.
 * @param {string} outDir - The output directory where resources will be copied.
 * @returns {Promise<CopyResults>} - A promise that resolves with the results of the copy operation.
 * @throws {Error} - Throws an error if the stencil is not properly initialized.
 */
async function copyResources(config: Config, outDir: string): Promise<CopyResults> {
  if (!config.sys || !config.sys.copy || !config.sys.glob) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer')
  }
  const srcDirectory = join(__dirname, '../../../', 'react-component-lib')
  const destDirectory = join(outDir, 'react-component-lib')

  return config.sys.copy(
    [
      {
        src: srcDirectory,
        dest: destDirectory,
        keepDirStructure: false,
        warn: false,
      },
    ],
    srcDirectory,
  )
}

import { ComponentCompilerMeta } from '@stencil/core/internal'
import { Project } from 'ts-morph'

/**
 * Describes the fields of a package.json file necessary to generate the Stencil-React bindings
 */
export interface PackageJSON {
  types: string
}

export interface OutputTargetReactOptions {
  /**
   * Specify the output directory or path where the generated React components will be saved.
   */
  outDir: string
  /**
   * Specify the components that should be excluded from the React output target.
   */
  excludeComponents?: string[]
  /**
   * The package name of the Stencil project.
   *
   * This value is automatically detected from the package.json file of the Stencil project.
   * If the validation fails, you can manually assign the package name.
   */
  stencilPackageName?: string
  /**
   * To enable server side rendering, provide the path to the hydrate module, e.g. `my-component/hydrate`.
   * By default this value is undefined and server side rendering is disabled.
   */
  hydrateModule?: string
}

export interface CreateComponentWrapperOptions {
  stencilPackageName: string
  components: ComponentCompilerMeta[]
  customElementsDir: string
  outDir: string
  excludeComponents?: string[]
  project: Project
  hydrateModule?: string
}

export interface CreateStencilReactComponentOptions {
  components: ComponentCompilerMeta[]
  stencilPackageName: string
  customElementsDir: string
  hydrateModule?: string
}

export interface CreateStencilNextWrapperOptions {
  components: ComponentCompilerMeta[]
}

export interface ReactEvent {
  originalName: string
  name: string
  type: string
}

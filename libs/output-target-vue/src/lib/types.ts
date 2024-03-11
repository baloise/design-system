export interface OutputTargetVue {
  componentCorePackage?: string
  proxiesFile: string
  excludeComponents?: string[]
  componentModels?: ComponentModelConfig[]
  loaderDir?: string
  includeDefineCustomElements?: boolean
  includeImportCustomElements?: boolean
  includeInternalComponents?: boolean
  customElementsDir?: string
}

export interface ComponentModelConfig {
  elements: string | string[]
  event: string
  targetAttr: string
  externalEvent?: string
}

export interface PackageJSON {
  types: string
}

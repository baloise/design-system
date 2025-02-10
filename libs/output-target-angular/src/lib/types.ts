export interface OutputTargetAngular {
  componentCorePackage?: string
  directivesProxyFile: string
  directivesMetaFile: string
  directivesArrayFile?: string
  directivesUtilsFile?: string
  outputType: 'standalone' | 'module'
  valueAccessorConfigs?: ValueAccessorConfig[]
  excludeComponents?: string[]
  componentGroups?: { [key: string]: ComponentGroup }
}

export interface ComponentGroup {
  components?: string[]
  providers?: ComponentProvider[]
  declarations?: ComponentProvider[]
}

export interface ComponentProvider {
  import: string
  name: string
}

export type ValueAccessorTypes = 'text' | 'radio' | 'select' | 'number' | 'boolean'

export interface ValueAccessorConfig {
  elementSelectors: string | string[]
  event: string
  targetAttr: string
  type: ValueAccessorTypes
}

export interface PackageJSON {
  types: string
}

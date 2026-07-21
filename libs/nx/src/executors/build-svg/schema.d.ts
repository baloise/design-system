import type { PluginConfig } from 'svgo'

export interface BuildSvgExecutorSchema {
  projectName: string
  projectRoot: string
  jsOutput: boolean
  jsOutputName: string
  jsOutputPath: string
  jsInlineData: boolean
  jsonPath: string
  svgOptimize: boolean
  svgPlugins: PluginConfig[]
  svgReplaceBlack: boolean
  dsMinSet: string[]
  dsMinSetPath: string
} // eslint-disable-line

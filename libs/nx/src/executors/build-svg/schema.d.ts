import type { PluginConfig } from 'svgo'

export interface BuildSvgExecutorSchema {
  projectName: string
  projectRoot: string
  subPackages: string[]
  svgPlugins: PluginConfig[]
  svgReplaceBlack: boolean
  svgGroundColor?: string
} // eslint-disable-line

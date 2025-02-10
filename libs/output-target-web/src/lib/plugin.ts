import type { Config, OutputTargetCustom } from '@stencil/core/internal'
import type { OutputTargetWeb } from './types'
import { webProxyOutput } from './output-web'

export const webOutputTarget = (outputTarget: OutputTargetWeb): OutputTargetCustom => ({
  type: 'custom',
  name: 'web-library',
  validate(config) {
    return normalizeOutputTarget(config, outputTarget)
  },
  async generator(config, compilerCtx, buildCtx) {
    const timespan = buildCtx.createTimeSpan(`generate web started`, true)

    await webProxyOutput(config, compilerCtx, outputTarget, buildCtx.components)

    timespan.finish(`generate web finished`)
  },
})

export function normalizeOutputTarget(config: Config, outputTarget: any) {
  const results: OutputTargetWeb = {
    ...outputTarget,
  }

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself')
  }

  if (outputTarget.dir == null) {
    throw new Error('dir is required')
  }

  if (outputTarget.isTest !== true) {
    results.isTest = false
  }

  return results
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config, OutputTargetCustom } from '@stencil/core/internal'
import { normalizePath } from './utils'
import { angularDirectiveProxyOutput } from './output-angular'
import type { OutputTargetAngular } from './types'
import { join, isAbsolute } from 'path'

export const angularOutputTarget = (outputTarget: OutputTargetAngular): OutputTargetCustom => {
  return {
    type: 'custom',
    name: 'angular-library-' + outputTarget.outputType || 'module',
    validate(config) {
      return normalizeOutputTarget(config, outputTarget)
    },
    async generator(config, compilerCtx, buildCtx) {
      const timespan = buildCtx.createTimeSpan(
        `generate angular ${outputTarget.outputType || 'module'} proxies started`,
        true,
      )

      await angularDirectiveProxyOutput(compilerCtx, outputTarget, buildCtx.components, config)

      timespan.finish(`generate angular ${outputTarget.outputType || 'module'} proxies finished`)
    },
  }
}

export function normalizeOutputTarget(config: Config, outputTarget: any) {
  const results: OutputTargetAngular = {
    ...outputTarget,
    excludeComponents: outputTarget.excludeComponents || [],
    valueAccessorConfig: outputTarget.valueAccessorConfig || [],
  }

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself')
  }
  if (outputTarget.directivesProxyFile == null) {
    throw new Error('directivesProxyFile is required')
  }
  if (outputTarget.directivesMetaFile == null) {
    throw new Error('directivesMetaFile is required')
  }

  if (outputTarget.directivesProxyFile && !isAbsolute(outputTarget.directivesProxyFile)) {
    results.directivesProxyFile = normalizePath(join(config.rootDir, outputTarget.directivesProxyFile))
  }

  if (outputTarget.directivesMetaFile && !isAbsolute(outputTarget.directivesMetaFile)) {
    results.directivesMetaFile = normalizePath(join(config.rootDir, outputTarget.directivesMetaFile))
  }

  if (outputTarget.directivesArrayFile && !isAbsolute(outputTarget.directivesArrayFile)) {
    results.directivesArrayFile = normalizePath(join(config.rootDir, outputTarget.directivesArrayFile))
  }

  if (outputTarget.directivesUtilsFile && !isAbsolute(outputTarget.directivesUtilsFile)) {
    results.directivesUtilsFile = normalizePath(join(config.rootDir, outputTarget.directivesUtilsFile))
  }

  return results
}

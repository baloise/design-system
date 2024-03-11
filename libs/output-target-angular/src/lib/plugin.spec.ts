import { Config } from '@stencil/core/internal'
import { OutputTargetAngular } from './types'
import { normalizeOutputTarget } from './plugin'

describe('normalizeOutputTarget', () => {
  const config: Config = {
    rootDir: '/dev/',
  }

  it('should return fail if proxiesFile is not set', () => {
    expect(() => {
      normalizeOutputTarget({}, {})
    }).toThrow(new Error('rootDir is not set and it should be set by stencil itself'))
  })

  it('should return fail if proxiesFile is not set', () => {
    expect(() => {
      normalizeOutputTarget(config, {})
    }).toThrow(new Error('directivesProxyFile is required'))
  })

  it('should return defaults for excludeComponents and valueAccessorConfig', () => {
    const results: OutputTargetAngular = normalizeOutputTarget(config, {
      directivesProxyFile: '/component-library-angular/src/components.ts',
      directivesMetaFile: '/component-library-angular/src/meta.ts',
      outputType: 'standalone',
    })

    expect(results).toEqual({
      directivesProxyFile: '/component-library-angular/src/components.ts',
      directivesMetaFile: '/component-library-angular/src/meta.ts',
      outputType: 'standalone',
      excludeComponents: [],
      valueAccessorConfig: [],
    } as OutputTargetAngular)
  })
})

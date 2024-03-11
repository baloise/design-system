import { Config } from '@stencil/core/internal'
import { OutputTargetVue } from './types'
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
    }).toThrow(new Error('proxiesFile is required'))
  })

  it('should return defaults for excludedComponents and includeDefineCustomElements', () => {
    const results: OutputTargetVue = normalizeOutputTarget(config, {
      proxiesFile: '../component-library-vue/src/components.ts',
    })

    expect(results).toEqual({
      proxiesFile: '../component-library-vue/src/components.ts',
      excludeComponents: [],
      componentModels: [],
      includeDefineCustomElements: true,
    } as OutputTargetVue)
  })

  it('DefineCustomElements should be false when set that way', () => {
    const results: OutputTargetVue = normalizeOutputTarget(config, {
      proxiesFile: '../component-library-vue/src/components.ts',
      includeDefineCustomElements: false,
    })

    expect(results.includeDefineCustomElements).toEqual(false)
  })

  it('DefineCustomElements should be true when set that way', () => {
    const results: OutputTargetVue = normalizeOutputTarget(config, {
      proxiesFile: '../component-library-vue/src/components.ts',
      includeDefineCustomElements: true,
    })

    expect(results.includeDefineCustomElements).toEqual(true)
  })
})

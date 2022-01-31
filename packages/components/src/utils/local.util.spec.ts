import { BaloiseDesignSystemConfig } from '../config/config'
import { localstring } from './local.util'

describe('local.util', () => {
  describe('localstring', () => {
    test('should return the default value de-CH', () => {
      expect(localstring()).toBe('de-CH')
    })
    test('should return the new set default value', () => {
      BaloiseDesignSystemConfig.region = 'BE'
      BaloiseDesignSystemConfig.language = 'fr'
      expect(localstring()).toBe('fr-BE')
    })
  })
})

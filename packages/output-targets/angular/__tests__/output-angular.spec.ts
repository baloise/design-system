import { ComponentCompilerMeta } from '@stencil/core/internal'
import { generateProxies } from '../src/output-angular'
import { PackageJSON, OutputTargetAngular } from '../src/types'

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = []
  const pkgData: PackageJSON = {
    types: 'dist/types/index.d.ts',
  }
  const rootDir = ''

  it('should use types from the component-library when it is provided to the config', () => {
    const outputTarget: OutputTargetAngular = {
      componentCorePackage: 'component-library',
      directivesProxyFile: '../component-library-angular/src/proxies.ts',
    }

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir)
    expect(
      finalText.includes(`import { Components } from '../../angular-output-target/dist/types/components';`),
    ).toBeFalsy()
    expect(finalText.includes(`import { Components } from 'component-library';`)).toBeTruthy()
  })
})

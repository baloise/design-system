import { angularOutputTarget } from '@stencil/angular-output-target'

export const AngularGenerator = (): any =>
  angularOutputTarget({
    componentCorePackage: '@baloise/ds-core',
    outputType: 'standalone',
    customElementsDir: 'components',
    directivesProxyFile: '../angular/src/generated/proxies.ts',
    directivesArrayFile: '../angular/src/generated/proxies-list.ts',
  })

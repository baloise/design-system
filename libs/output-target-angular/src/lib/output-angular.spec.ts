import { ComponentCompilerMeta } from '@stencil/core/internal'
import { generateProxies } from './output-angular'
import { PackageJSON, OutputTargetAngular } from './types'

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = []
  const pkgData: PackageJSON = {
    types: 'dist/types/index.d.ts',
  }
  const rootDir = ''

  it('should use types from the component-library when it is provided to the config', () => {
    const outputTarget: OutputTargetAngular = {
      componentCorePackage: 'component-library',
      directivesMetaFile: '../component-library-angular/src/meta.ts',
      directivesProxyFile: '../component-library-angular/src/proxies.ts',
      outputType: 'standalone',
    }

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir)
    expect(finalText).toEqual(
      `/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components, FileUploadRejectedFile } from 'component-library/components';

`,
    )
  })

  it('should use a relative path to types when a component-library is not provided', () => {
    const outputTarget: OutputTargetAngular = {
      componentCorePackage: 'component-library',
      directivesMetaFile: '../component-library-angular/src/meta.ts',
      directivesProxyFile: '../component-library-angular/src/proxies.ts',
      outputType: 'standalone',
    }

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir)
    expect(finalText).toEqual(
      `/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components, FileUploadRejectedFile } from 'component-library/components';

`,
    )
  })
})

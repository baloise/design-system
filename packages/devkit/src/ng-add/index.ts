import { Rule, SchematicContext, Tree, chain, mergeWith } from '@angular-devkit/schematics'
import { addDependency, addRootProvider } from '@schematics/angular/utility'

import { updateAppComponent } from './generators/app.get'
import { createI18nFile } from './generators/i18n.gen'
import { createPolyfillsFile } from './generators/polyfills.gen'
import { updateProjectConfig } from './generators/project.gen'
import { addStyles } from './generators/styles'
import { updateTsConfig } from './generators/ts-config.gen'
import { createZoneFlagsFile } from './generators/zone-flags.gen'
import { SchemaOptions } from './schema'

export default function (options: SchemaOptions): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule | void> => {
    const actions: Rule[] = []

    actions.push(mergeWith(createPolyfillsFile()))
    actions.push(mergeWith(createZoneFlagsFile()))

    updateProjectConfig(host)
    updateTsConfig(host)
    addStyles(host)

    actions.push(
      addRootProvider(options.project, ({ code, external }) => {
        return code`
    ${external('provideBaloiseDesignSystem', '@baloise/ds-angular')}({
      defaults: {
        region: '${options.region}',
      }
    })`
      }) as any,
    )

    if (options.i18n) {
      actions.push(mergeWith(createI18nFile()))
      actions.push(
        addRootProvider(options.project, ({ code, external }) => {
          return code`
    {
      provide: ${external('APP_INITIALIZER', '@angular/core')},
      useFactory: ${external('initializeI18n', './i18n.initialize')},
      multi: true,
      deps: [${external('TranslocoService', '@ngneat/transloco')}, ${external(
        'BalConfigService',
        '@baloise/ds-angular',
      )}],
    }`
        }) as any,
      )
    }

    const nxExample = 'src/app/nx-welcome.component.ts'
    if (host.exists(nxExample)) {
      host.delete(nxExample)
    }

    updateAppComponent(host)

    actions.push(addDependency('@baloise/ds-angular', 'latest') as any)

    return chain(actions)(host, context) as any
  }
}

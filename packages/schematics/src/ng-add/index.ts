import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  mergeWith,
} from '@angular-devkit/schematics';
import {
  addDependency,
  addRootProvider,
} from '@schematics/angular/utility/index';

import { SchemaOptions } from './schema';
import { createPolyfillsFile } from './generators/polyfills.gen';
import { createZoneFlagsFile } from './generators/zone-flags.gen';
import { updateProjectConfig } from './generators/project.gen';
import { updateTsConfig } from './generators/ts-config.gen';
import { addStyles } from './generators/styles';
import { createI18nFile } from './generators/i18n.gen';
import { updateAppComponent } from './generators/app.get';

export default function (options: SchemaOptions): Rule {
  return async (
    host: Tree,
    context: SchematicContext
  ): Promise<Rule | void> => {
    const actions: Rule[] = [];

    actions.push(mergeWith(createPolyfillsFile()));
    actions.push(mergeWith(createZoneFlagsFile()));

    updateProjectConfig(host);
    updateTsConfig(host);
    addStyles(host);

    actions.push(
      addRootProvider(options.project, ({ code, external }) => {
        return code`,
    ${external(
      'provideBaloiseDesignSystem',
      '@baloise/design-system-components-angular/standalone'
    )}({
      defaults: {
        region: '${options.region}',
      }
    })`;
      })
    );

    if (options.i18n) {
      actions.push(mergeWith(createI18nFile()));
      actions.push(
        addRootProvider(options.project, ({ code, external }) => {
          return code`,
    {
      provide: ${external('APP_INITIALIZER', '@angular/core')},
      useFactory: ${external('initializeI18n', './i18n.initialize')},
      multi: true,
      deps: [${external('TranslocoService', '@ngneat/transloco')}, ${external(
            'BalConfigService',
            '@baloise/design-system-components-angular/standalone'
          )}],
    }`;
        })
      );
    }

    const nxExample = 'src/app/nx-welcome.component.ts';
    if (host.exists(nxExample)) {
      host.delete(nxExample);
    }

    updateAppComponent(host, options);

    actions.push(
      addDependency('@baloise/design-system-components-angular', 'latest')
    );

    return chain(actions)(host, context) as any;
  };
}

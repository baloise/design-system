import { Source, apply, move, template, url } from '@angular-devkit/schematics';

export function createI18nFile(): Source {
  return apply(url(`./files/i18n.initialize`), [
    template({
      ts: 'ts',
    }),
    move('/', 'src/app'),
  ]);
}

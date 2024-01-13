import { Source, apply, move, template, url } from '@angular-devkit/schematics';

export function createZoneFlagsFile(): Source {
  return apply(url(`./files/zone-flags`), [
    template({
      ts: 'ts',
    }),
    move('/', 'src'),
  ]);
}

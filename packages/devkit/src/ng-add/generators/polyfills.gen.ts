import { Source, apply, move, template, url } from '@angular-devkit/schematics'

export function createPolyfillsFile(): Source {
  return apply(url(`./files/polyfills`), [
    template({
      ts: 'ts',
    }),
    move('/', 'src'),
  ])
}
